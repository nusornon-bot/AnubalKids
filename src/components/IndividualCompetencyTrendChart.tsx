import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Filter,
  Eye,
  EyeOff,
  BarChart2,
  ArrowUpRight,
} from 'lucide-react';
import { ChildProfile, HistoryEntry } from '../types';

export interface CompetencyMeta {
  key: string;
  code: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

export const CBE_COMPETENCIES_META: CompetencyMeta[] = [
  {
    key: 'self_management',
    code: 'CBE1',
    title: 'การจัดการตนเอง (Self-Management)',
    shortTitle: 'การจัดการตนเอง',
    icon: '🎯',
    color: '#2563EB', // Blue 600
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-700',
  },
  {
    key: 'higher_order_thinking',
    code: 'CBE2',
    title: 'การคิดขั้นสูง (Higher-Order Thinking)',
    shortTitle: 'การคิดขั้นสูง',
    icon: '🧠',
    color: '#7C3AED', // Violet 600
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-700',
  },
  {
    key: 'communication',
    code: 'CBE3',
    title: 'การสื่อสาร (Communication)',
    shortTitle: 'การสื่อสาร',
    icon: '💬',
    color: '#059669', // Emerald 600
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
  },
  {
    key: 'teamwork_collaboration',
    code: 'CBE4',
    title: 'การรวมพลังทำงานเป็นทีม (Teamwork)',
    shortTitle: 'การทำงานเป็นทีม',
    icon: '🤝',
    color: '#D97706', // Amber 600
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
  },
  {
    key: 'active_citizenship',
    code: 'CBE5',
    title: 'การเป็นพลเมืองที่เข้มแข็ง (Active Citizenship)',
    shortTitle: 'พลเมืองที่เข้มแข็ง',
    icon: '🏛️',
    color: '#E11D48', // Rose 600
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700',
  },
  {
    key: 'sustainable_living',
    code: 'CBE6',
    title: 'การอยู่ร่วมกับธรรมชาติและวิทยาการฯ (Sustainable Living)',
    shortTitle: 'อยู่ร่วมธรรมชาติฯ',
    icon: '🌿',
    color: '#0D9488', // Teal 600
    badgeBg: 'bg-teal-50',
    badgeBorder: 'border-teal-200',
    badgeText: 'text-teal-700',
  },
];

interface IndividualCompetencyTrendChartProps {
  profile: ChildProfile;
  days?: number;
  isPrintMode?: boolean;
  title?: string;
  className?: string;
}

export const IndividualCompetencyTrendChart: React.FC<IndividualCompetencyTrendChartProps> = ({
  profile,
  days = 30,
  isPrintMode = false,
  title,
  className = '',
}) => {
  const [timeRange, setTimeRange] = useState<number>(days);
  const [viewMode, setViewMode] = useState<'cumulative' | 'daily'>('cumulative');
  const [activeCompetencies, setActiveCompetencies] = useState<Record<string, boolean>>({
    self_management: true,
    higher_order_thinking: true,
    communication: true,
    teamwork_collaboration: true,
    active_citizenship: true,
    sustainable_living: true,
  });
  const [showBenchmarkLines, setShowBenchmarkLines] = useState<boolean>(true);

  // Toggle single competency visibility
  const toggleCompetency = (key: string) => {
    setActiveCompetencies((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Keep at least one active
      const anyActive = Object.values(next).some(Boolean);
      return anyActive ? next : prev;
    });
  };

  const selectAllCompetencies = () => {
    const all: Record<string, boolean> = {};
    CBE_COMPETENCIES_META.forEach((c) => {
      all[c.key] = true;
    });
    setActiveCompetencies(all);
  };

  // Build 30-day data points from profile.history
  const chartData = useMemo(() => {
    const history = profile.history || [];
    if (history.length === 0) return [];

    // Sort history chronologically (earliest to latest)
    const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Extract entries for the requested time range
    const sliceDays = timeRange > 0 ? timeRange : 30;
    const recentEntries = sorted.slice(-sliceDays);

    let cumSelfMgmtS = 0, cumSelfMgmtQ = 0;
    let cumHotS = 0, cumHotQ = 0;
    let cumCommS = 0, cumCommQ = 0;
    let cumTeamS = 0, cumTeamQ = 0;
    let cumActiveCitS = 0, cumActiveCitQ = 0;
    let cumSustS = 0, cumSustQ = 0;

    return recentEntries.map((entry, index) => {
      // 1. Self Management (CBE1)
      const selfMgmtS = entry.selfManagementScore !== undefined ? entry.selfManagementScore : entry.citizenshipScore || 0;
      const selfMgmtQ = entry.selfManagementTotal !== undefined ? entry.selfManagementTotal : entry.citizenshipTotal || 0;

      // 2. Higher Order Thinking (CBE2)
      const hotS = entry.higherOrderThinkingScore !== undefined ? entry.higherOrderThinkingScore : entry.problemSolvingScore || 0;
      const hotQ = entry.higherOrderThinkingTotal !== undefined ? entry.higherOrderThinkingTotal : entry.problemSolvingTotal || 0;

      // 3. Communication (CBE3)
      const commS = entry.communicationScore !== undefined ? entry.communicationScore : (entry.literacyScore ?? entry.thaiScore ?? 0);
      const commQ = entry.communicationTotal !== undefined ? entry.communicationTotal : (entry.literacyTotal ?? entry.thaiTotal ?? 0);

      // 4. Teamwork (CBE4)
      const teamS = entry.teamworkScore !== undefined ? entry.teamworkScore : entry.socioEmotionalScore || 0;
      const teamQ = entry.teamworkTotal !== undefined ? entry.teamworkTotal : entry.socioEmotionalTotal || 0;

      // 5. Active Citizenship (CBE5)
      const activeCitS = entry.activeCitizenshipScore !== undefined ? entry.activeCitizenshipScore : entry.citizenshipScore || 0;
      const activeCitQ = entry.activeCitizenshipTotal !== undefined ? entry.activeCitizenshipTotal : entry.citizenshipTotal || 0;

      // 6. Sustainable Living (CBE6)
      const sustS = entry.sustainableLivingScore !== undefined ? entry.sustainableLivingScore : (entry.inquiryScore ?? entry.scienceScore ?? 0);
      const sustQ = entry.sustainableLivingTotal !== undefined ? entry.sustainableLivingTotal : (entry.inquiryTotal ?? entry.scienceTotal ?? 0);

      // Accumulate
      cumSelfMgmtS += selfMgmtS; cumSelfMgmtQ += selfMgmtQ;
      cumHotS += hotS; cumHotQ += hotQ;
      cumCommS += commS; cumCommQ += commQ;
      cumTeamS += teamS; cumTeamQ += teamQ;
      cumActiveCitS += activeCitS; cumActiveCitQ += activeCitQ;
      cumSustS += sustS; cumSustQ += sustQ;

      // Format date label (e.g. "12 ต.ค." or "D1")
      const dateObj = new Date(entry.date);
      const shortDate = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
        : `วันที่ ${index + 1}`;

      const fullDate = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })
        : entry.date;

      if (viewMode === 'cumulative') {
        const smRate = cumSelfMgmtQ > 0 ? Math.round((cumSelfMgmtS / cumSelfMgmtQ) * 100) : 0;
        const hotRate = cumHotQ > 0 ? Math.round((cumHotS / cumHotQ) * 100) : 0;
        const commRate = cumCommQ > 0 ? Math.round((cumCommS / cumCommQ) * 100) : 0;
        const teamRate = cumTeamQ > 0 ? Math.round((cumTeamS / cumTeamQ) * 100) : 0;
        const citRate = cumActiveCitQ > 0 ? Math.round((cumActiveCitS / cumActiveCitQ) * 100) : 0;
        const sustRate = cumSustQ > 0 ? Math.round((cumSustS / cumSustQ) * 100) : 0;

        const totalQ = cumSelfMgmtQ + cumHotQ + cumCommQ + cumTeamQ + cumActiveCitQ + cumSustQ;
        const totalS = cumSelfMgmtS + cumHotS + cumCommS + cumTeamS + cumActiveCitS + cumSustS;
        const overallRate = totalQ > 0 ? Math.round((totalS / totalQ) * 100) : 0;

        return {
          rawDate: entry.date,
          displayDate: shortDate,
          fullDate,
          self_management: smRate,
          higher_order_thinking: hotRate,
          communication: commRate,
          teamwork_collaboration: teamRate,
          active_citizenship: citRate,
          sustainable_living: sustRate,
          overallAverage: overallRate,
          // Raw numbers for tooltip
          details: {
            self_management: { score: cumSelfMgmtS, total: cumSelfMgmtQ },
            higher_order_thinking: { score: cumHotS, total: cumHotQ },
            communication: { score: cumCommS, total: cumCommQ },
            teamwork_collaboration: { score: cumTeamS, total: cumTeamQ },
            active_citizenship: { score: cumActiveCitS, total: cumActiveCitQ },
            sustainable_living: { score: cumSustS, total: cumSustQ },
          },
        };
      } else {
        // Daily rate
        const smRate = selfMgmtQ > 0 ? Math.round((selfMgmtS / selfMgmtQ) * 100) : null;
        const hotRate = hotQ > 0 ? Math.round((hotS / hotQ) * 100) : null;
        const commRate = commQ > 0 ? Math.round((commS / commQ) * 100) : null;
        const teamRate = teamQ > 0 ? Math.round((teamS / teamQ) * 100) : null;
        const citRate = activeCitQ > 0 ? Math.round((activeCitS / activeCitQ) * 100) : null;
        const sustRate = sustQ > 0 ? Math.round((sustS / sustQ) * 100) : null;

        const dayQ = selfMgmtQ + hotQ + commQ + teamQ + activeCitQ + sustQ;
        const dayS = selfMgmtS + hotS + commS + teamS + activeCitS + sustS;
        const overallRate = dayQ > 0 ? Math.round((dayS / dayQ) * 100) : null;

        return {
          rawDate: entry.date,
          displayDate: shortDate,
          fullDate,
          self_management: smRate ?? 0,
          higher_order_thinking: hotRate ?? 0,
          communication: commRate ?? 0,
          teamwork_collaboration: teamRate ?? 0,
          active_citizenship: citRate ?? 0,
          sustainable_living: sustRate ?? 0,
          overallAverage: overallRate ?? 0,
          details: {
            self_management: { score: selfMgmtS, total: selfMgmtQ },
            higher_order_thinking: { score: hotS, total: hotQ },
            communication: { score: commS, total: commQ },
            teamwork_collaboration: { score: teamS, total: teamQ },
            active_citizenship: { score: activeCitS, total: activeCitQ },
            sustainable_living: { score: sustS, total: sustQ },
          },
        };
      }
    });
  }, [profile.history, timeRange, viewMode]);

  // Compute Growth Insights (First point vs Last point)
  const growthInsights = useMemo(() => {
    if (chartData.length < 2) return null;
    const first = chartData[0];
    const last = chartData[chartData.length - 1];

    const deltas: { key: string; meta: CompetencyMeta; delta: number; start: number; end: number }[] = [];

    CBE_COMPETENCIES_META.forEach((meta) => {
      const startVal = Number(first[meta.key as keyof typeof first] || 0);
      const endVal = Number(last[meta.key as keyof typeof last] || 0);
      const delta = endVal - startVal;
      deltas.push({ key: meta.key, meta, delta, start: startVal, end: endVal });
    });

    deltas.sort((a, b) => b.delta - a.delta);

    const topGrowth = deltas[0];
    const highestCompetency = [...deltas].sort((a, b) => b.end - a.end)[0];
    const overallDelta = Number(last.overallAverage || 0) - Number(first.overallAverage || 0);

    return {
      topGrowth,
      highestCompetency,
      overallDelta,
      daysCount: chartData.length,
      startAccuracy: first.overallAverage,
      endAccuracy: last.overallAverage,
    };
  }, [chartData]);

  // Custom Recharts Tooltip
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const currentItem = chartData.find((d) => d.displayDate === label) || chartData[0];

    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 max-w-xs text-xs animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 gap-2">
          <div className="flex items-center gap-1.5 font-black text-amber-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentItem?.fullDate || label}</span>
          </div>
          <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-500/40 font-bold">
            {viewMode === 'cumulative' ? 'คะแนนสะสม' : 'รายวัน'}
          </span>
        </div>

        <div className="space-y-1.5">
          {payload.map((item: any) => {
            const meta = CBE_COMPETENCIES_META.find((c) => c.key === item.dataKey);
            if (!meta) return null;
            const det = currentItem?.details?.[meta.key as keyof typeof currentItem.details];

            return (
              <div key={item.dataKey} className="flex items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{meta.shortTitle}</span>
                </div>
                <div className="text-right shrink-0 flex items-center gap-1">
                  <span className="font-black text-white">{item.value}%</span>
                  {det && (
                    <span className="text-[10px] text-slate-400">
                      ({det.score}/{det.total})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {currentItem && (
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-bold">ภาพรวม 6 สมรรถนะ</span>
            <span className="font-black text-amber-400 text-xs">{currentItem.overallAverage}%</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="individual-competency-trend-chart-card"
      className={`bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col gap-4 ${className}`}
    >
      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                {title || 'แนวโน้มการพัฒนาสมรรถนะรายบุคคล (Individual Competency Trend)'}
              </h3>
              <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full border border-indigo-200">
                Recharts
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              กราฟเส้นเปรียบเทียบพัฒนาการ 6 สมรรถนะหลักย้อนหลัง {timeRange} วันของ {profile.name} (เกณฑ์ สพฐ.)
            </p>
          </div>
        </div>

        {/* View Controls (Interactive Toolbar) */}
        {!isPrintMode && (
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {/* Time Range Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => setTimeRange(7)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  timeRange === 7 ? 'bg-white text-indigo-900 shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                7 วัน
              </button>
              <button
                type="button"
                onClick={() => setTimeRange(14)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  timeRange === 14 ? 'bg-white text-indigo-900 shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                14 วัน
              </button>
              <button
                type="button"
                onClick={() => setTimeRange(30)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  timeRange === 30 ? 'bg-white text-indigo-900 shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                30 วัน
              </button>
            </div>

            {/* Metric Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('cumulative')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'cumulative' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-950'
                }`}
                title="แสดงผลแบบคะแนนสะสม พัฒนาการต่อเนื่อง"
              >
                สะสม (%)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('daily')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'daily' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-950'
                }`}
                title="แสดงผลความแม่นยำรายวัน"
              >
                รายวัน (%)
              </button>
            </div>

            {/* Benchmark Lines Toggle */}
            <button
              type="button"
              onClick={() => setShowBenchmarkLines((prev) => !prev)}
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                showBenchmarkLines
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
              title="เปิด/ปิดเส้นเกณฑ์มาตรฐาน สพฐ. 80% (เชี่ยวชาญ) และ 70% (คล่องแคล่ว)"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">เกณฑ์ สพฐ.</span>
            </button>
          </div>
        )}
      </div>

      {/* KPI Insight Highlights */}
      {growthInsights && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 p-3 rounded-2xl border border-indigo-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-black shrink-0 shadow-2xs">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-indigo-700 block uppercase">
                สมรรถนะพัฒนาการก้าวกระโดด
              </span>
              <div className="text-xs font-black text-indigo-950 truncate flex items-center gap-1">
                <span>{growthInsights.topGrowth.meta.icon}</span>
                <span>{growthInsights.topGrowth.meta.shortTitle}</span>
                <span className="text-emerald-600 ml-1">
                  +{growthInsights.topGrowth.delta}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-3 rounded-2xl border border-purple-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm font-black shrink-0 shadow-2xs">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-purple-700 block uppercase">
                สมรรถนะสูงสุดในปัจจุบัน
              </span>
              <div className="text-xs font-black text-purple-950 truncate flex items-center gap-1">
                <span>{growthInsights.highestCompetency.meta.icon}</span>
                <span>{growthInsights.highestCompetency.meta.shortTitle}</span>
                <span className="text-purple-700 font-bold ml-1">
                  ({growthInsights.highestCompetency.end}%)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-black shrink-0 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-emerald-700 block uppercase">
                พัฒนาการภาพรวม 30 วัน
              </span>
              <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                <span>{growthInsights.startAccuracy}%</span>
                <span className="text-slate-400">➔</span>
                <span className="text-emerald-700 font-black">{growthInsights.endAccuracy}%</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full border border-emerald-200 ml-1">
                  {growthInsights.overallDelta >= 0 ? `+${growthInsights.overallDelta}%` : `${growthInsights.overallDelta}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competency Filter Chips (Interactive Legend) */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-black text-slate-700 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>แสดงกราฟเส้น:</span>
        </span>

        {CBE_COMPETENCIES_META.map((meta) => {
          const isActive = activeCompetencies[meta.key];
          return (
            <button
              key={meta.key}
              type="button"
              onClick={() => toggleCompetency(meta.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                isActive
                  ? `${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText} shadow-2xs`
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 hover:opacity-100'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: isActive ? meta.color : '#94A3B8' }}
              />
              <span>{meta.icon}</span>
              <span>{meta.code}: {meta.shortTitle}</span>
              {isActive ? (
                <Eye className="w-3 h-3 ml-0.5 text-current opacity-70" />
              ) : (
                <EyeOff className="w-3 h-3 ml-0.5 text-slate-400" />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={selectAllCompetencies}
          className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold ml-auto px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          เลือกทั้งหมด
        </button>
      </div>

      {/* Main Recharts Line Chart Container */}
      <div className="w-full h-72 sm:h-80 md:h-96 relative bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
            <BarChart2 className="w-10 h-10 text-slate-300 animate-pulse" />
            <p className="text-xs font-medium">ยังไม่มีข้อมูลประวัติย้อนหลังเพียงพอสำหรับสร้างกราฟ</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 12, right: 16, left: -10, bottom: 6 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />

              <XAxis
                dataKey="displayDate"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                dy={6}
              />

              <YAxis
                stroke="#64748B"
                fontSize={11}
                domain={[0, 100]}
                tickCount={6}
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                tickFormatter={(val) => `${val}%`}
              />

              <Tooltip content={renderCustomTooltip} />

              {/* Reference Benchmark Lines (สพฐ.) */}
              {showBenchmarkLines && (
                <>
                  <ReferenceLine
                    y={80}
                    stroke="#10B981"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'ระดับ 4: เชี่ยวชาญ (80%)',
                      fill: '#059669',
                      fontSize: 10,
                      position: 'insideTopRight',
                    }}
                  />
                  <ReferenceLine
                    y={70}
                    stroke="#3B82F6"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    label={{
                      value: 'ระดับ 3: คล่องแคล่ว (70%)',
                      fill: '#2563EB',
                      fontSize: 9,
                      position: 'insideTopRight',
                    }}
                  />
                  <ReferenceLine
                    y={60}
                    stroke="#F59E0B"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    label={{
                      value: 'ระดับ 2: ตามเกณฑ์ (60%)',
                      fill: '#D97706',
                      fontSize: 9,
                      position: 'insideTopRight',
                    }}
                  />
                </>
              )}

              {/* Competency 1: Self-Management */}
              {activeCompetencies.self_management && (
                <Line
                  type="monotone"
                  dataKey="self_management"
                  name="1. การจัดการตนเอง"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#2563EB', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, stroke: '#1D4ED8', strokeWidth: 2, fill: '#FFFFFF' }}
                  isAnimationActive={!isPrintMode}
                />
              )}

              {/* Competency 2: Higher-Order Thinking */}
              {activeCompetencies.higher_order_thinking && (
                <Line
                  type="monotone"
                  dataKey="higher_order_thinking"
                  name="2. การคิดขั้นสูง"
                  stroke="#7C3AED"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#7C3AED', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, stroke: '#6D28D9', strokeWidth: 2, fill: '#FFFFFF' }}
                  isAnimationActive={!isPrintMode}
                />
              )}

              {/* Competency 3: Communication */}
              {activeCompetencies.communication && (
                <Line
                  type="monotone"
                  dataKey="communication"
                  name="3. การสื่อสาร"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#059669', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, stroke: '#047857', strokeWidth: 2, fill: '#FFFFFF' }}
                  isAnimationActive={!isPrintMode}
                />
              )}

              {/* Competency 4: Teamwork & Collaboration */}
              {activeCompetencies.teamwork_collaboration && (
                <Line
                  type="monotone"
                  dataKey="teamwork_collaboration"
                  name="4. การรวมพลังทำงานเป็นทีม"
                  stroke="#D97706"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#D97706', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, stroke: '#B45309', strokeWidth: 2, fill: '#FFFFFF' }}
                  isAnimationActive={!isPrintMode}
                />
              )}

              {/* Competency 5: Active Citizenship */}
              {activeCompetencies.active_citizenship && (
                <Line
                  type="monotone"
                  dataKey="active_citizenship"
                  name="5. การเป็นพลเมืองที่เข้มแข็ง"
                  stroke="#E11D48"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#E11D48', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, stroke: '#BE123C', strokeWidth: 2, fill: '#FFFFFF' }}
                  isAnimationActive={!isPrintMode}
                />
              )}

              {/* Competency 6: Sustainable Living */}
              {activeCompetencies.sustainable_living && (
                <Line
                  type="monotone"
                  dataKey="sustainable_living"
                  name="6. การอยู่ร่วมกับธรรมชาติฯ"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0D9488', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, stroke: '#0F766E', strokeWidth: 2, fill: '#FFFFFF' }}
                  isAnimationActive={!isPrintMode}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Notes & Legend Description */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">เกณฑ์มาตรฐาน สพฐ.:</span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" /> 80%+ เชี่ยวชาญ
          </span>
          <span className="flex items-center gap-1 text-blue-700 font-medium">
            <span className="w-2.5 h-0.5 bg-blue-500 inline-block" /> 70-79% คล่องแคล่ว
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-medium">
            <span className="w-2.5 h-0.5 bg-amber-500 inline-block" /> 60-69% กำลังพัฒนา
          </span>
        </div>

        <div className="text-slate-400">
          คำนวณจากแบบฝึกหัดกิจกรรมการเรียนรู้ฐานสมรรถนะ (CBE Primary Assessment)
        </div>
      </div>
    </div>
  );
};
