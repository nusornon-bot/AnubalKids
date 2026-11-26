import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  TrendingUp,
  Cloud,
  RefreshCw,
  Printer,
  Download,
  User,
  GraduationCap,
  Calendar,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ChildProfile, Grade, Subject } from '../types';
import {
  fetchWeeklyDevelopmentTrendAnalysis,
  seedDemoWeeklySessionsToFirestore,
  WeeklyDataBucket,
  WeeklyTrendAnalysisResult,
  SKILL_COLORS,
} from '../services/weeklyTrendService';
import { generateMultiPagePdf } from '../utils/pdfExport';
import { dbId } from '../services/firebaseDb';

interface WeeklyTrendChartViewProps {
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  currentGrade: Grade;
  initialProfileId?: string;
  onSelectProfile?: (profileId: string) => void;
  isEmbeddedInModal?: boolean;
}

export const WeeklyTrendChartView: React.FC<WeeklyTrendChartViewProps> = ({
  profiles,
  activeProfile,
  currentGrade,
  initialProfileId,
  onSelectProfile,
  isEmbeddedInModal = false,
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    initialProfileId || activeProfile.id
  );
  const [gradeFilter, setGradeFilter] = useState<'ALL' | Grade>(currentGrade);
  const [timeRangeWeeks, setTimeRangeWeeks] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<WeeklyTrendAnalysisResult | null>(null);
  const [activeSkills, setActiveSkills] = useState<Record<Subject, boolean>>({
    literacy: true,
    math: true,
    problem_solving: true,
    inquiry: true,
    creativity: true,
    physical_health: true,
    socio_emotional: true,
    citizenship: true,
    thai: false,
    english: false,
    science: false,
  });
  const [showOverallLine, setShowOverallLine] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<{
    weekIndex: number;
    skillId: Subject | 'overall';
    x: number;
    y: number;
    weekLabel: string;
    dateLabel: string;
    skillName: string;
    icon: string;
    accuracy: number;
    correct: number;
    total: number;
    delta: number | null;
  } | null>(null);

  const [isSeedingDemo, setIsSeedingDemo] = useState<boolean>(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync initialProfileId only when external prop actually changes to avoid feedback loops
  const prevInitialIdRef = useRef(initialProfileId);
  useEffect(() => {
    if (initialProfileId && initialProfileId !== prevInitialIdRef.current) {
      prevInitialIdRef.current = initialProfileId;
      setSelectedProfileId(initialProfileId);
    }
  }, [initialProfileId]);

  // Load trend data from Firestore or local fallback with cancellation protection
  const loadTrendData = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const res = await fetchWeeklyDevelopmentTrendAnalysis({
        profileId: selectedProfileId,
        grade: gradeFilter,
        maxWeeks: timeRangeWeeks,
        forceRefresh,
      });
      setAnalysisResult(res);
    } catch (e) {
      console.error('Error fetching weekly trend data:', e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProfileId, gradeFilter, timeRangeWeeks]);

  useEffect(() => {
    let isCancelled = false;

    const executeFetch = async () => {
      setIsLoading(true);
      try {
        const res = await fetchWeeklyDevelopmentTrendAnalysis({
          profileId: selectedProfileId,
          grade: gradeFilter,
          maxWeeks: timeRangeWeeks,
          forceRefresh: false,
        });
        if (!isCancelled) {
          setAnalysisResult(res);
        }
      } catch (e) {
        if (!isCancelled) {
          console.error('Error fetching weekly trend data:', e);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    executeFetch();

    return () => {
      isCancelled = true;
    };
  }, [selectedProfileId, gradeFilter, timeRangeWeeks]);

  const toggleSkill = (skill: Subject) => {
    setActiveSkills((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const selectAllSkills = () => {
    setActiveSkills({
      literacy: true,
      math: true,
      problem_solving: true,
      inquiry: true,
      creativity: true,
      physical_health: true,
      socio_emotional: true,
      citizenship: true,
      thai: false,
      english: false,
      science: false,
    });
  };

  const selectCoreAcademicSkills = () => {
    setActiveSkills({
      literacy: true,
      math: true,
      problem_solving: true,
      inquiry: true,
      creativity: false,
      physical_health: false,
      socio_emotional: false,
      citizenship: false,
      thai: false,
      english: false,
      science: false,
    });
  };

  const clearAllSkills = () => {
    setActiveSkills({
      literacy: false,
      math: false,
      problem_solving: false,
      inquiry: false,
      creativity: false,
      physical_health: false,
      socio_emotional: false,
      citizenship: false,
      thai: false,
      english: false,
      science: false,
    });
  };

  // Seed sample data to Firestore
  const handleSeedDemoData = async () => {
    const target = profiles.find((p) => p.id === selectedProfileId) || activeProfile;
    if (!target) return;
    setIsSeedingDemo(true);
    setSeedMessage('กำลังส่งข้อมูลตัวอย่าง 6 สัปดาห์ขึ้น Firebase Firestore...');
    try {
      const res = await seedDemoWeeklySessionsToFirestore(target);
      setSeedMessage(res.message);
      await loadTrendData();
      setTimeout(() => setSeedMessage(null), 5000);
    } catch (e) {
      setSeedMessage('เกิดข้อผิดพลาดในการสร้างข้อมูลตัวอย่าง');
    } finally {
      setIsSeedingDemo(false);
    }
  };

  // Export to PDF
  const handleExportPdf = async () => {
    if (!containerRef.current) return;
    setIsExportingPdf(true);
    try {
      const currentProfileName =
        selectedProfileId === 'ALL'
          ? 'รายงานทั้งห้องเรียน'
          : profiles.find((p) => p.id === selectedProfileId)?.name || 'นักเรียน';

      await generateMultiPagePdf(containerRef.current, {
        filename: `รายงานแนวโน้มพัฒนาการรายสัปดาห์_${currentProfileName}.pdf`,
        footerTitle: 'ระบบวิเคราะห์พัฒนาการเด็กปฐมวัยตามหลักสูตรการศึกษาปฐมวัย 2560 (Firestore Cloud)',
      });
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // SVG Chart Geometry
  const chartWidth = 760;
  const chartHeight = 320;
  const padding = { top: 30, right: 30, bottom: 50, left: 55 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const buckets = analysisResult?.buckets || [];
  const weekCount = buckets.length;

  const getX = (index: number) => {
    if (weekCount <= 1) return padding.left + graphWidth / 2;
    return padding.left + (index / (weekCount - 1)) * graphWidth;
  };

  const getY = (accuracy: number) => {
    const clamped = Math.max(0, Math.min(100, accuracy));
    return padding.top + graphHeight - (clamped / 100) * graphHeight;
  };

  const coreSkills: Subject[] = [
    'literacy',
    'math',
    'problem_solving',
    'inquiry',
    'creativity',
    'physical_health',
    'socio_emotional',
    'citizenship',
  ];

  const selectableProfiles = useMemo(() => {
    if (gradeFilter === 'ALL') return profiles;
    return profiles.filter((p) => p.grade === gradeFilter);
  }, [profiles, gradeFilter]);

  const handleProfileChange = (newId: string) => {
    setSelectedProfileId(newId);
    if (newId !== 'ALL') {
      const selected = profiles.find((p) => p.id === newId);
      if (selected && gradeFilter !== 'ALL' && selected.grade !== gradeFilter) {
        setGradeFilter(selected.grade);
      }
      if (onSelectProfile) {
        onSelectProfile(newId);
      }
    }
  };

  const handleGradeFilterChange = (newGrade: 'ALL' | Grade) => {
    setGradeFilter(newGrade);
    if (newGrade !== 'ALL' && selectedProfileId !== 'ALL') {
      const current = profiles.find((p) => p.id === selectedProfileId);
      if (current && current.grade !== newGrade) {
        setSelectedProfileId('ALL');
      }
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Filter & Control Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold">
          {/* Profile Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <User className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">ผู้เรียน:</span>
            <select
              value={selectedProfileId}
              onChange={(e) => handleProfileChange(e.target.value)}
              className="bg-transparent font-black text-slate-900 outline-none cursor-pointer"
            >
              <option value="ALL">👥 ภาพรวมทุกคนในห้องเรียน ({selectableProfiles.length} คน)</option>
              {selectableProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.grade})
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter (อ.1 - ป.6) */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <GraduationCap className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">ระดับชั้น:</span>
            <select
              value={gradeFilter}
              onChange={(e) => handleGradeFilterChange(e.target.value as any)}
              className="bg-transparent font-black text-slate-900 outline-none cursor-pointer"
            >
              <option value="ALL">ทุกระดับชั้น (อ.1 - ป.6)</option>
              <option value="K1">อนุบาล 1 (อ.1)</option>
              <option value="K2">อนุบาล 2 (อ.2)</option>
              <option value="K3">อนุบาล 3 (อ.3)</option>
              <option value="P1">ประถมศึกษาปีที่ 1 (ป.1)</option>
              <option value="P2">ประถมศึกษาปีที่ 2 (ป.2)</option>
              <option value="P3">ประถมศึกษาปีที่ 3 (ป.3)</option>
              <option value="P4">ประถมศึกษาปีที่ 4 (ป.4)</option>
              <option value="P5">ประถมศึกษาปีที่ 5 (ป.5)</option>
              <option value="P6">ประถมศึกษาปีที่ 6 (ป.6)</option>
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">ช่วงเวลา:</span>
            <select
              value={timeRangeWeeks}
              onChange={(e) => setTimeRangeWeeks(Number(e.target.value))}
              className="bg-transparent font-black text-slate-900 outline-none cursor-pointer"
            >
              <option value={4}>4 สัปดาห์ล่าสุด</option>
              <option value={8}>8 สัปดาห์ล่าสุด</option>
              <option value={12}>12 สัปดาห์ล่าสุด</option>
              <option value={24}>ทั้งหมด (24 สัปดาห์)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadTrendData(true)}
            disabled={isLoading}
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black px-3 py-1.5 rounded-xl border border-slate-300 transition-colors cursor-pointer"
            title="รีเฟรชข้อมูลจาก Firebase Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>รีเฟรช</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black px-3 py-1.5 rounded-xl border border-slate-300 transition-colors cursor-pointer"
            title="พิมพ์หน้านี้"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์</span>
          </button>
          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            title="บันทึกเอกสาร PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPdf ? 'กำลังบันทึก...' : 'บันทึก PDF'}</span>
          </button>
        </div>
      </div>

      {/* Cloud Status Badge */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span className="flex items-center gap-1 text-teal-700">
          <Cloud className="w-4 h-4 text-teal-600" />
          <span>แหล่งข้อมูล: Firebase Firestore คอลเลกชัน <code className="bg-teal-50 px-1 py-0.5 rounded text-teal-800 font-mono">/game_sessions</code></span>
          {analysisResult?.cloudSessionCount ? (
            <span className="bg-teal-100 text-teal-800 text-[10px] px-1.5 py-0.5 rounded-full font-black">
              {analysisResult.cloudSessionCount} บันทึกคลาวด์
            </span>
          ) : null}
        </span>
        <span>
          พบข้อมูล {buckets.length} สัปดาห์ ({analysisResult?.totalSessions || 0} รอบ)
        </span>
      </div>

      {/* Seed Demo Banner */}
      {seedMessage && (
        <div className="bg-teal-100 border border-teal-300 text-teal-900 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            {seedMessage}
          </span>
          <button onClick={() => setSeedMessage(null)} className="text-teal-700 hover:text-teal-900 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Empty State */}
      {buckets.length === 0 && !isLoading && (
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-3xl p-8 text-center space-y-3">
          <div className="text-4xl">📊</div>
          <h3 className="text-base sm:text-lg font-black text-amber-900">
            ยังไม่มีข้อมูลผลการเล่นที่บันทึกใน Firebase Firestore สำหรับเงื่อนไขนี้
          </h3>
          <p className="text-xs sm:text-sm text-amber-700 max-w-md mx-auto">
            ท่านสามารถกดปุ่มด้านล่างเพื่อจำลองข้อมูลตัวอย่าง 6 สัปดาห์ขึ้น Firestore
            เพื่อทดสอบการแสดงผลกราฟเส้นและการวิเคราะห์แนวโน้มได้ทันที
          </p>
          <div className="pt-2">
            <button
              onClick={handleSeedDemoData}
              disabled={isSeedingDemo}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md cursor-pointer transition-all disabled:opacity-50 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isSeedingDemo
                  ? 'กำลังจำลองข้อมูล 6 สัปดาห์...'
                  : '✨ จำลองข้อมูลตัวอย่าง 6 สัปดาห์เพื่อทดสอบดูกราฟ'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive SVG Line Chart */}
      {buckets.length > 0 && (
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
              <h3 className="text-sm sm:text-base font-black text-slate-800">
                กราฟเส้นแสดงแนวโน้มพัฒนาการคะแนน (%) ในแต่ละสัปดาห์
              </h3>
              <span className="text-xs font-bold text-slate-500">
                ({buckets.length} สัปดาห์)
              </span>
            </div>

            <button
              onClick={() => setShowOverallLine(!showOverallLine)}
              className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                showOverallLine
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>เส้นเฉลี่ยรวมทุกทักษะ</span>
              {showOverallLine ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full bg-slate-50/70 rounded-2xl p-2 border border-slate-100 overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto min-w-[550px] overflow-visible select-none"
            >
              <defs>
                <filter id="glow-embedded" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Horizontal Grid Lines */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray={val === 0 || val === 100 ? 'none' : '4 4'}
                      strokeWidth={val === 0 || val === 100 ? '1.5' : '1'}
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="700"
                      fill="#64748b"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Benchmark 70% threshold */}
              <line
                x1={padding.left}
                y1={getY(70)}
                x2={chartWidth - padding.right}
                y2={getY(70)}
                stroke="#10b981"
                strokeDasharray="2 2"
                strokeWidth="1.2"
                opacity="0.4"
              />
              <text
                x={chartWidth - padding.right - 4}
                y={getY(70) - 4}
                textAnchor="end"
                fontSize="9"
                fontWeight="800"
                fill="#10b981"
              >
                เกณฑ์มาตรฐาน (70%)
              </text>

              {/* X-Axis Labels */}
              {buckets.map((b, idx) => {
                const x = getX(idx);
                return (
                  <g key={b.weekKey}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + graphHeight}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={padding.top + graphHeight + 18}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="800"
                      fill="#334155"
                    >
                      {b.weekLabel}
                    </text>
                    <text
                      x={x}
                      y={padding.top + graphHeight + 32}
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="600"
                      fill="#94a3b8"
                    >
                      {b.dateRangeLabel}
                    </text>
                  </g>
                );
              })}

              {/* Skill Lines */}
              {coreSkills.map((skillId) => {
                if (!activeSkills[skillId]) return null;
                const color = SKILL_COLORS[skillId].color;

                const points = buckets
                  .map((b, idx) => {
                    const sk = b.skills[skillId];
                    if (!sk || !sk.isTested) return null;
                    return { x: getX(idx), y: getY(sk.accuracy), accuracy: sk.accuracy, bucket: b };
                  })
                  .filter(Boolean) as { x: number; y: number; accuracy: number; bucket: WeeklyDataBucket }[];

                if (points.length === 0) return null;

                const pathData = points.reduce((acc, pt, i) => {
                  return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
                }, '');

                return (
                  <g key={skillId} className="transition-all">
                    <path
                      d={pathData}
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#glow-embedded)"
                      opacity="0.9"
                    />
                    {points.map((pt, pIdx) => {
                      const isHovered =
                        hoveredPoint?.skillId === skillId &&
                        hoveredPoint?.weekIndex === pt.bucket.weekNumber - 1;
                      const skStat = pt.bucket.skills[skillId];

                      return (
                        <g
                          key={pIdx}
                          className="cursor-pointer"
                          onMouseEnter={() =>
                            setHoveredPoint({
                              weekIndex: pt.bucket.weekNumber - 1,
                              skillId,
                              x: pt.x,
                              y: pt.y,
                              weekLabel: pt.bucket.weekLabel,
                              dateLabel: pt.bucket.fullDateLabel,
                              skillName: SKILL_COLORS[skillId].name,
                              icon: SKILL_COLORS[skillId].icon,
                              accuracy: skStat.accuracy,
                              correct: skStat.correctCount,
                              total: skStat.totalQuestions,
                              delta: skStat.deltaFromPreviousWeek,
                            })
                          }
                          onClick={() =>
                            setHoveredPoint({
                              weekIndex: pt.bucket.weekNumber - 1,
                              skillId,
                              x: pt.x,
                              y: pt.y,
                              weekLabel: pt.bucket.weekLabel,
                              dateLabel: pt.bucket.fullDateLabel,
                              skillName: SKILL_COLORS[skillId].name,
                              icon: SKILL_COLORS[skillId].icon,
                              accuracy: skStat.accuracy,
                              correct: skStat.correctCount,
                              total: skStat.totalQuestions,
                              delta: skStat.deltaFromPreviousWeek,
                            })
                          }
                        >
                          {pIdx === points.length - 1 && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="9"
                              fill={color}
                              opacity="0.2"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? '7' : '5'}
                            fill="#ffffff"
                            stroke={color}
                            strokeWidth={isHovered ? '3.5' : '2.5'}
                            className="transition-all"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* Overall Accuracy Line */}
              {showOverallLine && buckets.length > 0 && (
                <g className="transition-all">
                  {(() => {
                    const pathData = buckets.reduce((acc, b, idx) => {
                      const x = getX(idx);
                      const y = getY(b.overallAccuracy);
                      return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
                    }, '');

                    return (
                      <>
                        <path
                          d={pathData}
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="3.5"
                          strokeDasharray="6 4"
                          strokeLinecap="round"
                          opacity="0.85"
                        />
                        {buckets.map((b, idx) => {
                          const x = getX(idx);
                          const y = getY(b.overallAccuracy);
                          const isHovered =
                            hoveredPoint?.skillId === 'overall' &&
                            hoveredPoint?.weekIndex === idx;

                          return (
                            <g
                              key={`overall-${idx}`}
                              className="cursor-pointer"
                              onMouseEnter={() =>
                                setHoveredPoint({
                                  weekIndex: idx,
                                  skillId: 'overall',
                                  x,
                                  y,
                                  weekLabel: b.weekLabel,
                                  dateLabel: b.fullDateLabel,
                                  skillName: 'คะแนนภาพรวมทุกทักษะ',
                                  icon: '🌟',
                                  accuracy: b.overallAccuracy,
                                  correct: b.totalCorrect,
                                  total: b.totalQuestions,
                                  delta:
                                    idx > 0
                                      ? b.overallAccuracy - buckets[idx - 1].overallAccuracy
                                      : null,
                                })
                              }
                            >
                              <circle
                                cx={x}
                                cy={y}
                                r={isHovered ? '7' : '5'}
                                fill="#f59e0b"
                                stroke="#0f172a"
                                strokeWidth="2.5"
                              />
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </g>
              )}
            </svg>

            {/* Hover Tooltip Card */}
            {hoveredPoint && (
              <div
                className="absolute z-20 bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl border border-slate-700 pointer-events-none text-xs space-y-1 transform -translate-x-1/2 -translate-y-full mb-3 min-w-[200px]"
                style={{
                  left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                  top: `${(hoveredPoint.y / chartHeight) * 100}%`,
                }}
              >
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5 font-bold">
                  <span className="text-teal-300">{hoveredPoint.weekLabel}</span>
                  <span className="text-slate-400 text-[10px]">{hoveredPoint.dateLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-0.5 font-black text-sm">
                  <span>{hoveredPoint.icon}</span>
                  <span>{hoveredPoint.skillName}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-300">ความถูกต้อง:</span>
                  <span className="text-base font-black text-emerald-400">
                    {hoveredPoint.accuracy}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>ตอบถูก:</span>
                  <span className="font-bold text-white">
                    {hoveredPoint.correct} / {hoveredPoint.total} ข้อ
                  </span>
                </div>
                {hoveredPoint.delta !== null && (
                  <div className="text-[11px] font-black pt-0.5 border-t border-slate-800">
                    {hoveredPoint.delta > 0 ? (
                      <span className="text-emerald-400">
                        ▲ เพิ่มขึ้น +{hoveredPoint.delta}% จากสัปดาห์ก่อน
                      </span>
                    ) : hoveredPoint.delta < 0 ? (
                      <span className="text-rose-400">
                        ▼ ลดลง {hoveredPoint.delta}% จากสัปดาห์ก่อน
                      </span>
                    ) : (
                      <span className="text-slate-400">— คงที่เท่ากับสัปดาห์ก่อน</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Skill Toggles */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-between text-xs font-bold text-slate-500 gap-2">
              <span>เลือกเปิด/ปิดเส้นทักษะในกราฟ:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={selectAllSkills}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg cursor-pointer"
                >
                  เลือกทั้งหมด (8 ด้าน)
                </button>
                <button
                  onClick={selectCoreAcademicSkills}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg cursor-pointer"
                >
                  เฉพาะทักษะหลัก
                </button>
                <button
                  onClick={clearAllSkills}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg cursor-pointer"
                >
                  ล้างการเลือก
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {coreSkills.map((skillId) => {
                const cfg = SKILL_COLORS[skillId];
                const isActive = activeSkills[skillId];

                return (
                  <button
                    key={skillId}
                    onClick={() => toggleSkill(skillId)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-slate-300 shadow-xs'
                        : 'bg-slate-100 border-slate-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span className="truncate">
                        {cfg.icon} {cfg.name}
                      </span>
                    </div>
                    {isActive ? (
                      <Eye className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Analytical Insights Cards */}
      {analysisResult && buckets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Top Improved */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  พัฒนาการก้าวกระโดดสูงสุด
                </span>
                <span className="text-lg">🌟</span>
              </div>
              {analysisResult.topImprovedSkill ? (
                <>
                  <h4 className="text-sm font-black text-emerald-950">
                    {analysisResult.topImprovedSkill.icon}{' '}
                    {analysisResult.topImprovedSkill.name}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    คะแนนความแม่นยำพัฒนาเพิ่มขึ้นอย่างต่อเนื่อง{' '}
                    <span className="font-black text-emerald-900">
                      +{analysisResult.topImprovedSkill.improvement}%
                    </span>{' '}
                    จากสัปดาห์เริ่มต้น
                  </p>
                </>
              ) : (
                <p className="text-xs text-emerald-700 font-medium">
                  เด็กมีพัฒนาการที่สม่ำเสมอและรักษามาตรฐานการเรียนรู้ได้ดี
                </p>
              )}
            </div>
          </div>

          {/* Highest Performing */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  ทักษะจุดเด่นยอดเยี่ยม
                </span>
                <span className="text-lg">🏆</span>
              </div>
              {analysisResult.highestSkill ? (
                <>
                  <h4 className="text-sm font-black text-indigo-950">
                    {analysisResult.highestSkill.icon} {analysisResult.highestSkill.name}
                  </h4>
                  <p className="text-xs text-indigo-700 font-medium mt-1">
                    รักษาคะแนนความแม่นยำเฉลี่ยได้สูงถึง{' '}
                    <span className="font-black text-indigo-900">
                      {analysisResult.highestSkill.averageAccuracy}%
                    </span>{' '}
                    เป็นทักษะที่เด็กมีความมั่นใจสูง
                  </p>
                </>
              ) : (
                <p className="text-xs text-indigo-700 font-medium">
                  กำลังประมวลผลทักษะเด่น
                </p>
              )}
            </div>
          </div>

          {/* Needs Reinforcement */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  ทักษะที่ควรส่งเสริมเพิ่มเติม
                </span>
                <span className="text-lg">💡</span>
              </div>
              {analysisResult.needsSupportSkill ? (
                <>
                  <h4 className="text-sm font-black text-amber-950">
                    {analysisResult.needsSupportSkill.icon}{' '}
                    {analysisResult.needsSupportSkill.name}
                  </h4>
                  <p className="text-xs text-amber-800 font-medium mt-1 line-clamp-3">
                    {analysisResult.needsSupportSkill.recommendation}
                  </p>
                </>
              ) : (
                <p className="text-xs text-amber-700 font-medium">
                  ทุกทักษะอยู่ในเกณฑ์มาตรฐานดีเยี่ยม
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pedagogical Insights Text List */}
      {analysisResult && analysisResult.pedagogicalInsights.length > 0 && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            ข้อค้นพบและคำแนะนำสำหรับครูผู้สอนและผู้ปกครอง
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
            {analysisResult.pedagogicalInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl">
                <span className="text-teal-600 font-bold">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weekly Data Breakdown Table */}
      {buckets.length > 0 && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              ตารางสรุปคะแนนพัฒนาการรายสัปดาห์ (จำแนกตาม 8 ทักษะ)
            </h4>
            <span className="text-[11px] text-slate-400 font-bold">
              (หน่วย: % ความแม่นยำ)
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-black border-b border-slate-200">
                <tr>
                  <th className="p-2.5">สัปดาห์</th>
                  <th className="p-2.5">ช่วงวันที่</th>
                  <th className="p-2.5 text-center">รอบที่เล่น</th>
                  <th className="p-2.5 text-center bg-slate-200/70">เฉลี่ยรวม</th>
                  <th className="p-2.5 text-center text-rose-700">1.ภาษา</th>
                  <th className="p-2.5 text-center text-indigo-700">2.คำนวณ</th>
                  <th className="p-2.5 text-center text-amber-700">3.แก้ปัญหา</th>
                  <th className="p-2.5 text-center text-sky-700">4.สืบเสาะ</th>
                  <th className="p-2.5 text-center text-fuchsia-700">5.สร้างสรรค์</th>
                  <th className="p-2.5 text-center text-emerald-700">6.สุขภาวะ</th>
                  <th className="p-2.5 text-center text-purple-700">7.อารมณ์</th>
                  <th className="p-2.5 text-center text-orange-700">8.พลเมือง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buckets.map((b) => (
                  <tr key={b.weekKey} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 font-black text-slate-900">{b.weekLabel}</td>
                    <td className="p-2.5 text-slate-500">{b.dateRangeLabel}</td>
                    <td className="p-2.5 text-center font-bold text-slate-700">
                      {b.sessionCount} รอบ
                    </td>
                    <td className="p-2.5 text-center font-black bg-slate-100/60 text-slate-900">
                      {b.overallAccuracy}%
                    </td>
                    {coreSkills.map((sk) => {
                      const sData = b.skills[sk];
                      if (!sData || !sData.isTested) {
                        return (
                          <td key={sk} className="p-2.5 text-center text-slate-300">
                            -
                          </td>
                        );
                      }
                      return (
                        <td
                          key={sk}
                          className={`p-2.5 text-center font-black ${
                            sData.accuracy >= 80
                              ? 'text-emerald-600'
                              : sData.accuracy >= 60
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {sData.accuracy}%
                          {sData.deltaFromPreviousWeek !== null && (
                            <span className="text-[9px] block font-semibold text-slate-400">
                              {sData.deltaFromPreviousWeek > 0
                                ? `+${sData.deltaFromPreviousWeek}%`
                                : `${sData.deltaFromPreviousWeek}%`}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cloud Footnote */}
      <div className="text-[11px] text-slate-400 font-medium text-center pt-2">
        ข้อมูลจัดเก็บบน Firebase Firestore (Database ID: <span className="font-mono">{dbId}</span>)
        • ซิงค์อัตโนมัติแบบเรียลไทม์ทุกครั้งที่มีการประเมิน
      </div>
    </div>
  );
};
