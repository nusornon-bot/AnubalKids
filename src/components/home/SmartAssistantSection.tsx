import React from 'react';
import { Target, CheckCircle2, TrendingDown, RefreshCw } from 'lucide-react';
import { ChildProfile, Subject, CurriculumMode } from '../../types';
import { RecommendationResult } from '../../services/recommendationService';
import { DailyMissionWidget } from '../DailyMissionWidget';

interface SmartAssistantSectionProps {
  activeProfile: ChildProfile;
  selectedSubjects: Subject[];
  onSelectSubject: (s: Subject) => void;
  onStartMissionDirectly: (s: Subject) => void;
  soundVolume: number;
  recommendation?: RecommendationResult | null;
  isLoadingRec: boolean;
  recFeedback: string | null;
  onSelectBothRecommended: () => void;
  isBothRecommendedSelected: boolean;
  onRefreshRecommendations: () => void;
  curriculumMode?: CurriculumMode;
}

export const SmartAssistantSection: React.FC<SmartAssistantSectionProps> = ({
  activeProfile,
  selectedSubjects,
  onSelectSubject,
  onStartMissionDirectly,
  soundVolume,
  recommendation,
  isLoadingRec,
  recFeedback,
  onSelectBothRecommended,
  isBothRecommendedSelected,
  onRefreshRecommendations,
  curriculumMode,
}) => {
  const hasRecs = recommendation && recommendation.recommendations.length >= 2;
  const isPhonics = curriculumMode === 'thai_phonics';
  const isCbe = curriculumMode === 'cbe_primary';

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Daily mission widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2.5 shadow-2xs">
        <DailyMissionWidget
          activeProfile={activeProfile}
          selectedSubjects={selectedSubjects}
          onSelectSubject={onSelectSubject}
          onStartMissionDirectly={onStartMissionDirectly}
          soundVolume={soundVolume}
          curriculumMode={curriculumMode}
        />
      </div>

      {/* Smart recommendation banner (Clean & Compact) */}
      {hasRecs && (
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-sm font-black shrink-0">
              💡
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-slate-800">
                  {isPhonics ? 'หน่วยแนะนำสำหรับ' : isCbe ? 'สมรรถนะแนะนำสำหรับ' : 'ทักษะแนะนำสำหรับ'} {activeProfile.name}:
                </span>
                <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-1.5 py-0.2 rounded">
                  {recommendation.recommendations[0].shortName}
                </span>
                <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-1.5 py-0.2 rounded">
                  {recommendation.recommendations[1].shortName}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                    isPhonics
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                      : isCbe
                      ? 'bg-purple-100 text-purple-900 border-purple-200'
                      : 'bg-sky-100 text-sky-900 border-sky-200'
                  }`}
                >
                  {isPhonics ? 'หลักสูตรแจกลูกสะกดคำ สพฐ.' : isCbe ? 'หลักสูตร CBE' : 'หลักสูตร 8 ทักษะ'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {recommendation.recommendations[0].pedagogicalTip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            {recFeedback && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>เลือกแล้ว</span>
              </span>
            )}
            <button
              type="button"
              id="btn-quick-focus-recommendations"
              onClick={onSelectBothRecommended}
              className={`text-xs font-black px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                isBothRecommendedSelected
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-2xs'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>
                {isBothRecommendedSelected
                  ? '✓ เลือกแล้ว'
                  : isPhonics
                  ? '🎯 ฝึก 2 หน่วยนี้'
                  : isCbe
                  ? '🎯 ฝึก 2 สมรรถนะนี้'
                  : '🎯 ฝึก 2 ทักษะนี้'}
              </span>
            </button>
            <button
              type="button"
              onClick={onRefreshRecommendations}
              disabled={isLoadingRec}
              title="รีเฟรชการวิเคราะห์"
              className="p-1.5 bg-white text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingRec ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
