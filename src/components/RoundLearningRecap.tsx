import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BarChart3,
  Trophy,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Zap,
  BookOpen,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';
import { Language, Subject, Question, GameSettings } from '../types';
import { getSkillBySubject } from '../data/skills';
import { speakText, stopSpeaking, isAudioMuted, soundEffects } from '../services/audioService';

export interface RoundSkillStat {
  skillId: Subject;
  skillName: string;
  fullName: string;
  icon: string;
  total: number;
  correct: number;
  accuracy: number; // 0 - 100
  gradient: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  colorClass: string;
  masteryLabel: { th: string; en: string; zh: string };
  stars: number;
  gradeBreakdown: Record<string, { total: number; correct: number }>;
}

export interface RoundLearningRecapProps {
  roundResults: { question: Question; isCorrect: boolean }[];
  settings: GameSettings;
  onTriggerConfetti?: () => void;
}

export const RoundLearningRecap: React.FC<RoundLearningRecapProps> = ({
  roundResults,
  settings,
  onTriggerConfetti,
}) => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'bars' | 'review'>('bars');
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);
  const [isSpeakingRecap, setIsSpeakingRecap] = useState<boolean>(false);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Aggregate round results by developmental skill
  const skillStats: RoundSkillStat[] = useMemo(() => {
    if (!roundResults || roundResults.length === 0) return [];

    const map = new Map<Subject, {
      total: number;
      correct: number;
      grades: Record<string, { total: number; correct: number }>;
    }>();

    roundResults.forEach((r) => {
      const subj = r.question.subject;
      const existing = map.get(subj) || {
        total: 0,
        correct: 0,
        grades: { K1: { total: 0, correct: 0 }, K2: { total: 0, correct: 0 }, K3: { total: 0, correct: 0 } },
      };

      existing.total++;
      if (r.isCorrect) existing.correct++;

      const gr = r.question.grade || 'K1';
      if (!existing.grades[gr]) {
        existing.grades[gr] = { total: 0, correct: 0 };
      }
      existing.grades[gr].total++;
      if (r.isCorrect) existing.grades[gr].correct++;

      map.set(subj, existing);
    });

    const list: RoundSkillStat[] = [];
    map.forEach((data, subj) => {
      const def = getSkillBySubject(subj);
      const acc = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

      let stars = 0;
      let label = { th: 'กำลังฝึกฝน 🌱', en: 'Practicing 🌱', zh: '继续加油 🌱' };

      if (acc === 100) {
        stars = 3;
        label = { th: 'เชี่ยวชาญยอดเยี่ยม ⭐⭐⭐', en: 'Mastered 100% ⭐⭐⭐', zh: '完全掌握 ⭐⭐⭐' };
      } else if (acc >= 75) {
        stars = 2;
        label = { th: 'ยอดเยี่ยมมาก ⭐⭐', en: 'High Mastery ⭐⭐', zh: '优秀掌握 ⭐⭐' };
      } else if (acc >= 50) {
        stars = 1;
        label = { th: 'ทำได้ดีมาก 👍', en: 'Good Progress 👍', zh: '良好进步 👍' };
      }

      const lang = settings.language || 'th';
      const skillName = def.shortName[lang] || def.shortName.th;
      const fullName = def.name[lang] || def.name.th;

      list.push({
        skillId: subj,
        skillName,
        fullName,
        icon: def.icon,
        total: data.total,
        correct: data.correct,
        accuracy: acc,
        gradient: def.gradient,
        badgeBg: def.badgeBg,
        badgeBorder: def.badgeBorder,
        badgeText: def.badgeText,
        colorClass: def.colorClass,
        masteryLabel: label,
        stars,
        gradeBreakdown: data.grades,
      });
    });

    // Sort by accuracy descending (highest mastered skills on top)
    return list.sort((a, b) => b.accuracy - a.accuracy || b.total - a.total);
  }, [roundResults, settings.language]);

  // Top Mastered Skill
  const topSkill = useMemo(() => {
    if (skillStats.length === 0) return null;
    return skillStats[0];
  }, [skillStats]);

  // Overall round stats
  const totalQuestions = roundResults.length;
  const totalCorrect = roundResults.filter((r) => r.isCorrect).length;
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Trigger smooth progressive bar chart animation on mount
  const runAnimation = () => {
    setIsAnimated(false);
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

    animationTimerRef.current = setTimeout(() => {
      setIsAnimated(true);

      // Audio feedback when bars expand
      if (!isAudioMuted() && settings.soundVolume > 0.05) {
        if (overallAccuracy >= 80) {
          soundEffects.playVictory(Math.min(0.6, settings.soundVolume));
        } else {
          soundEffects.playSuccess(Math.min(0.5, settings.soundVolume));
        }
      }

      if (overallAccuracy >= 80 && onTriggerConfetti) {
        setTimeout(() => onTriggerConfetti(), 400);
      }
    }, 180);
  };

  useEffect(() => {
    runAnimation();
    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      stopSpeaking();
    };
  }, [roundResults]);

  // Spoken recap narration by Learning Buddy
  const handleSpeakRecap = () => {
    if (isSpeakingRecap) {
      stopSpeaking();
      setIsSpeakingRecap(false);
      return;
    }

    const lang = settings.language || 'th';
    let text = '';

    if (lang === 'th') {
      if (skillStats.length === 1 && topSkill) {
        text = `สรุปทักษะรอบนี้ คนเก่งได้ฝึกทักษะ${topSkill.skillName} ตอบถูก ${topSkill.correct} จาก ${topSkill.total} ข้อ ความแม่นยำ ${topSkill.accuracy} เปอร์เซ็นต์ ${
          topSkill.accuracy >= 80 ? 'ยอดเยี่ยมมากๆ เลยจ้า!' : 'สู้ต่อไปนะคนเก่ง!'
        }`;
      } else if (topSkill) {
        text = `สรุปทักษะรอบนี้ คนเก่งเชี่ยวชาญทักษะ${topSkill.skillName}มากที่สุด ตอบถูก ${topSkill.accuracy} เปอร์เซ็นต์ จากทั้งหมด ${skillStats.length} ทักษะที่ได้ฝึกฝน ยอดเยี่ยมมากๆ เลยจ้า!`;
      } else {
        text = `สรุปผลการเล่นรอบนี้ ตอบถูก ${totalCorrect} จาก ${totalQuestions} ข้อ เก่งมากๆ เลยครับ!`;
      }
    } else if (lang === 'en') {
      if (topSkill) {
        text = `Round recap! You mastered ${topSkill.skillName} with ${topSkill.accuracy}% accuracy! Excellent work!`;
      } else {
        text = `Round recap! You answered ${totalCorrect} out of ${totalQuestions} questions correctly! Great job!`;
      }
    } else {
      if (topSkill) {
        text = `本轮技能总结！你在${topSkill.skillName}技能中表现最棒，正确率达到百分之${topSkill.accuracy}！太棒了！`;
      } else {
        text = `本轮技能总结！共答对 ${totalCorrect} 道题，正确率百分之 ${overallAccuracy}，继续加油！`;
      }
    }

    setIsSpeakingRecap(true);
    speakText(text, lang, settings.voicePersona, settings.soundVolume);

    // Auto reset speaking state after estimate
    const estimatedDuration = Math.max(2500, text.length * 110);
    setTimeout(() => {
      setIsSpeakingRecap(false);
    }, estimatedDuration);
  };

  if (skillStats.length === 0) return null;

  return (
    <section
      id="round-learning-recap-section"
      aria-label="สรุปผลทักษะการเรียนรู้ประจำรอบ"
      className="bg-gradient-to-b from-blue-50/90 via-indigo-50/70 to-purple-50/80 rounded-[32px] p-4 sm:p-6 border-3 border-indigo-200/90 shadow-xl text-left relative overflow-hidden transition-all duration-300"
    >
      {/* Background soft ambient glows */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-300/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-300/25 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-indigo-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                {settings.language === 'en'
                  ? 'Learning Recap & Skill Mastery'
                  : settings.language === 'zh'
                  ? '本轮技能掌握总结 (Learning Recap)'
                  : 'สรุปทักษะการเรียนรู้รอบนี้ (Learning Recap)'}
              </h3>
              <span className="text-xs font-black text-indigo-700 bg-indigo-100/90 px-2 py-0.5 rounded-lg border border-indigo-200">
                {skillStats.length} {settings.language === 'en' ? 'Skills' : settings.language === 'zh' ? '项技能' : 'ทักษะ'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {settings.language === 'en'
                ? 'Visual bar charts showing accuracy and skills mastered during this round'
                : settings.language === 'zh'
                ? '直观柱状图展示本轮练习中各项早教核心能力掌握水平'
                : 'กราฟแท่งแอนิเมชันสรุปความเชี่ยวชาญในแต่ละทักษะที่ทำในรอบนี้'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* TTS Speech Recap Button */}
          <button
            type="button"
            onClick={handleSpeakRecap}
            className={`flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl border-2 shadow-xs cursor-pointer transition-all duration-200 active:scale-95 ${
              isSpeakingRecap
                ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300'
            }`}
            title="ฟังเสียงสรุปทักษะจากน้องคิดดี้"
            aria-label="ฟังเสียงสรุปทักษะ"
          >
            {isSpeakingRecap ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-600" />}
            <span className="hidden sm:inline">
              {isSpeakingRecap ? 'กำลังอ่านสรุป...' : 'ฟังเสียงสรุป'}
            </span>
          </button>

          {/* Replay Animation Button */}
          <button
            type="button"
            onClick={runAnimation}
            className="flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-xl bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs cursor-pointer transition-all duration-200 active:scale-95"
            title="เล่นแอนิเมชันกราฟแท่งอีกครั้ง"
            aria-label="เล่นแอนิเมชันกราฟแท่งอีกครั้ง"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">เล่นแอนิเมชันใหม่</span>
          </button>

          {/* View Mode Toggle: Bars vs Question Review */}
          <div className="flex items-center bg-indigo-100/90 p-0.5 rounded-xl border border-indigo-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('bars')}
              className={`px-2.5 py-1 rounded-lg font-black transition-all cursor-pointer ${
                activeTab === 'bars'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-indigo-700 hover:text-indigo-950'
              }`}
            >
              กราฟแท่ง
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('review')}
              className={`px-2.5 py-1 rounded-lg font-black transition-all cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-indigo-700 hover:text-indigo-950'
              }`}
            >
              ทบทวนรายข้อ
            </button>
          </div>
        </div>
      </div>

      {/* Star Mastery Spotlight Card */}
      {topSkill && topSkill.accuracy >= 60 && (
        <div className="mt-3.5 bg-gradient-to-r from-amber-400/90 via-yellow-400/90 to-orange-400/90 rounded-2xl p-3 sm:p-3.5 border-2 border-yellow-200 text-amber-950 shadow-md flex items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/90 border-2 border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              {topSkill.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300">
                  ทักษะเด่นรอบนี้ (Top Mastered Skill) ⭐
                </span>
                <span className="text-xs font-black text-amber-950">
                  {topSkill.accuracy}% ความแม่นยำ
                </span>
              </div>
              <div className="text-xs sm:text-sm font-black font-display text-amber-950 mt-0.5">
                {settings.language === 'en'
                  ? `Outstanding mastery in ${topSkill.skillName}!`
                  : settings.language === 'zh'
                  ? `在 ${topSkill.skillName} 领域展现卓越掌握水平！`
                  : `เชี่ยวชาญทักษะ "${topSkill.skillName}" ยอดเยี่ยมที่สุดในรอบนี้!`}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-2xl">
            {Array.from({ length: topSkill.stars || 1 }).map((_, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 120}ms` }}>
                ⭐
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Content: Tab 1 (Animated Skill Bar Charts) */}
      {activeTab === 'bars' && (
        <div className="mt-4 space-y-3.5">
          {skillStats.map((stat, index) => {
            const lang = settings.language || 'th';
            const statusLabel = stat.masteryLabel[lang] || stat.masteryLabel.th;
            const delayMs = index * 120;

            return (
              <div
                key={stat.skillId}
                className="bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4 border-2 border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Skill Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-2xs">
                      {stat.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-slate-900 font-display">
                          {stat.skillName}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          ({stat.correct}/{stat.total} ข้อ)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium line-clamp-1">
                        {stat.fullName}
                      </div>
                    </div>
                  </div>

                  {/* Accuracy & Stars Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${
                        stat.accuracy === 100
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : stat.accuracy >= 75
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : stat.accuracy >= 50
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : 'bg-orange-100 text-orange-900 border-orange-300'
                      }`}
                    >
                      {statusLabel}
                    </span>
                    <span className="text-base sm:text-lg font-black font-display text-slate-800">
                      {isAnimated ? `${stat.accuracy}%` : '0%'}
                    </span>
                  </div>
                </div>

                {/* Animated Horizontal Bar Track */}
                <div className="relative w-full h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 shadow-inner">
                  {/* Guideline Milestones (25%, 50%, 75%) */}
                  <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-slate-300/70 z-10 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-slate-300/70 z-10 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-slate-300/70 z-10 pointer-events-none" />

                  {/* Animated Bar Fill */}
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out relative`}
                    style={{
                      width: isAnimated ? `${stat.accuracy}%` : '0%',
                      transitionDelay: `${delayMs}ms`,
                    }}
                  >
                    {/* Shimmer gloss effect */}
                    <div className="absolute inset-0 bg-white/25 rounded-full opacity-60 pointer-events-none" />

                    {/* Leading glowing edge dot when filled */}
                    {stat.accuracy > 8 && (
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-xs animate-ping opacity-75" />
                    )}
                  </div>
                </div>

                {/* Metric Footer Sub-Ticks */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold px-0.5 mt-1.5">
                  <span>0%</span>
                  <span className="hidden sm:inline">25%</span>
                  <span>50%</span>
                  <span className="hidden sm:inline">75%</span>
                  <span>100%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Content: Tab 2 (Detailed Question-by-Question Review) */}
      {activeTab === 'review' && (
        <div className="mt-4 space-y-2.5">
          <div className="text-xs text-slate-600 font-medium mb-1">
            คลิกที่คำถามเพื่อดูเฉลยและคำอธิบายสำหรับพัฒนาตนเอง:
          </div>
          {roundResults.map((result, idx) => {
            const isExpanded = expandedQuestionIdx === idx;
            const q = result.question;
            const skillDef = getSkillBySubject(q.subject);
            const lang = settings.language || 'th';
            const qText = q.question[lang] || q.question.th;
            const expText = q.explanation[lang] || q.explanation.th;

            return (
              <div
                key={q.id || idx}
                className={`bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  result.isCorrect
                    ? 'border-emerald-200 hover:border-emerald-300'
                    : 'border-rose-200 hover:border-rose-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                  className="w-full p-3 sm:p-3.5 flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${
                        result.isCorrect
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {result.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                        <span>ข้อ {idx + 1}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span>{skillDef.icon}</span>
                          <span>{skillDef.shortName[lang] || skillDef.shortName.th}</span>
                        </span>
                        <span>•</span>
                        <span>{q.grade}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-800 line-clamp-1 mt-0.5">
                        {qText}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-slate-400">
                    <span className="text-xs font-bold text-slate-600 hidden sm:inline">
                      {result.isCorrect ? 'ตอบถูก ✅' : 'ตอบผิด ❌'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Explanation Box */}
                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 bg-slate-50/60 text-xs text-slate-700 space-y-2">
                    <div className="flex items-start gap-2 text-indigo-900 bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200">
                      <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">คำอธิบายเฉลย: </span>
                        <span>{expText}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Growth Mindset Footer Note */}
      <div className="mt-4 pt-3 border-t-2 border-indigo-200/60 flex items-center justify-between text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            {overallAccuracy >= 80
              ? 'สุดยอดมาก! ผลการฝึกฝนรอบนี้ได้รับการบันทึกและสะสมพัฒนาการเรียบร้อยแล้ว'
              : 'เก่งมากครับ! ยิ่งเล่น ยิ่งฝึกฝน ทักษะจะยิ่งเก่งและแม่นยำขึ้นเรื่อยๆ นะคนดี'}
          </span>
        </div>
      </div>
    </section>
  );
};
