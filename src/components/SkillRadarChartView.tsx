import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { SKILLS_LIST } from '../data/skills';
import { Subject } from '../types';

export interface SkillRadarDataPoint {
  id: Subject;
  name: string;
  shortName: string;
  icon: string;
  code: string;
  color: string;
  score: number; // 0 - 100 percentage
  totalQuestions: number;
  correctQuestions: number;
  benchmarkScore: number; // 0 - 100 benchmark
  classAverageScore?: number; // 0 - 100 class average
  description: string;
  skillsFocus: string[];
  recommendation: string;
}

interface SkillRadarChartViewProps {
  data: SkillRadarDataPoint[];
  childName?: string;
  showBenchmark?: boolean;
  showClassAverage?: boolean;
  onSelectSkill?: (skill: SkillRadarDataPoint) => void;
  selectedSkillId?: Subject | null;
  size?: number;
}

export const SkillRadarChartView: React.FC<SkillRadarChartViewProps> = ({
  data,
  childName = 'หนูน้อย',
  showBenchmark = true,
  showClassAverage = false,
  onSelectSkill,
  selectedSkillId = null,
  size = 520,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillRadarDataPoint | null>(null);

  // Active highlighted skill (either selected or hovered)
  const activeSkill = hoveredSkill || data.find((d) => d.id === selectedSkillId) || null;

  const margin = 70;
  const width = size;
  const height = size;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - margin;
  const numSkills = data.length;

  // D3 Scales
  const rScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 100]).range([0, radius]);
  }, [radius]);

  // Angles for 8 skills (-pi/2 starts from 12 o'clock / top)
  const angleSlice = (Math.PI * 2) / numSkills;

  // Concentric web level rings (20%, 40%, 60%, 80%, 100%)
  const levels = [20, 40, 60, 80, 100];

  // Helper to compute (x, y) given angle and value
  const getCoordinates = (index: number, value: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = rScale(value);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Generate SVG polygon points string for a dataset
  const generatePolygonPath = (values: number[]) => {
    const lineGenerator = d3
      .lineRadial<number>()
      .radius((d) => rScale(d))
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    return lineGenerator(values) || '';
  };

  // Child score polygon path
  const childPath = useMemo(() => {
    const values = data.map((d) => Math.max(8, d.score));
    return generatePolygonPath(values);
  }, [data, angleSlice, rScale]);

  // Benchmark polygon path
  const benchmarkPath = useMemo(() => {
    const values = data.map((d) => d.benchmarkScore);
    return generatePolygonPath(values);
  }, [data, angleSlice, rScale]);

  // Class average polygon path
  const classAvgPath = useMemo(() => {
    const values = data.map((d) => d.classAverageScore ?? 72);
    return generatePolygonPath(values);
  }, [data, angleSlice, rScale]);

  return (
    <div className="w-full flex flex-col items-center select-none relative">
      <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible drop-shadow-sm"
        >
          <defs>
            {/* Child radar area gradient fill */}
            <radialGradient id="childRadarGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#0d9488" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.18" />
            </radialGradient>

            {/* Benchmark area gradient fill */}
            <radialGradient id="benchmarkRadarGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
            </radialGradient>

            {/* Class average area gradient fill */}
            <radialGradient id="classAvgRadarGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
            </radialGradient>

            {/* Glowing filter for vertices */}
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Concentric circular/polygon grid web rings */}
          <g className="radar-grid-rings">
            {levels.map((level) => {
              const ringRadius = rScale(level);
              return (
                <g key={`ring-${level}`}>
                  {/* Subtle polygon guide */}
                  <polygon
                    points={data
                      .map((_, i) => {
                        const pt = getCoordinates(i, level);
                        return `${pt.x},${pt.y}`;
                      })
                      .join(' ')}
                    fill={level === 100 ? '#f8fafc' : level % 40 === 0 ? '#f1f5f9' : 'none'}
                    stroke={level === 80 ? '#cbd5e1' : level === 100 ? '#94a3b8' : '#e2e8f0'}
                    strokeWidth={level === 100 ? 1.8 : 1}
                    strokeDasharray={level === 80 ? '3 3' : undefined}
                    opacity="0.9"
                  />
                  {/* Percentage label along top vertical spoke */}
                  <text
                    x={cx + 6}
                    y={cy - ringRadius + 4}
                    fontSize="10"
                    fontWeight="700"
                    fill="#94a3b8"
                    className="select-none pointer-events-none"
                  >
                    {level}%
                  </text>
                </g>
              );
            })}
          </g>

          {/* 2. 8 Radial Spoke Axis Lines */}
          <g className="radar-axes">
            {data.map((skill, i) => {
              const pt = getCoordinates(i, 100);
              const isSelected = selectedSkillId === skill.id;
              const isHovered = hoveredSkill?.id === skill.id;

              return (
                <line
                  key={`spoke-${skill.id}`}
                  x1={cx}
                  y1={cy}
                  x2={pt.x}
                  y2={pt.y}
                  stroke={isSelected || isHovered ? '#0d9488' : '#cbd5e1'}
                  strokeWidth={isSelected || isHovered ? 2.2 : 1.2}
                  strokeDasharray="2 3"
                />
              );
            })}
          </g>

          {/* 3. Class Average Polygon Area (Optional) */}
          {showClassAverage && (
            <g transform={`translate(${cx}, ${cy})`} className="radar-class-average">
              <path
                d={classAvgPath}
                fill="url(#classAvgRadarGrad)"
                stroke="#8b5cf6"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                opacity="0.85"
              />
            </g>
          )}

          {/* 4. Developmental Benchmark / Standard Line (75-80%) */}
          {showBenchmark && (
            <g transform={`translate(${cx}, ${cy})`} className="radar-benchmark">
              <path
                d={benchmarkPath}
                fill="url(#benchmarkRadarGrad)"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="5 4"
                opacity="0.95"
              />
            </g>
          )}

          {/* 5. Main Child Performance Radar Polygon Area */}
          <g transform={`translate(${cx}, ${cy})`} className="radar-child-performance">
            <path
              d={childPath}
              fill="url(#childRadarGrad)"
              stroke="#059669"
              strokeWidth="3.2"
              strokeLinejoin="round"
              className="transition-all duration-300 drop-shadow-md"
            />
          </g>

          {/* 6. Child Data Points / Vertices & Percentage Badges */}
          <g className="radar-vertices">
            {data.map((skill, i) => {
              const pt = getCoordinates(i, Math.max(8, skill.score));
              const isSelected = selectedSkillId === skill.id;
              const isHovered = hoveredSkill?.id === skill.id;
              const isHigh = skill.score >= 80;

              return (
                <g
                  key={`vertex-${skill.id}`}
                  className="cursor-pointer transition-transform duration-150"
                  onClick={() => onSelectSkill?.(skill)}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Outer Pulsing Halo when active */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="14"
                      fill="#10b981"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected || isHovered ? 8 : 6}
                    fill={isHigh ? '#059669' : '#0284c7'}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    filter="url(#glow)"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="2.5"
                    fill="#ffffff"
                  />

                  {/* Floating Score Badge next to vertex */}
                  <g
                    transform={`translate(${pt.x}, ${pt.y - 12})`}
                    className="pointer-events-none"
                  >
                    <rect
                      x="-16"
                      y="-12"
                      width="32"
                      height="16"
                      rx="8"
                      fill={isHigh ? '#047857' : '#0369a1'}
                      className="shadow-md"
                    />
                    <text
                      x="0"
                      y="-1"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      {skill.score}%
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* 7. Axis Label Nodes at Perimeter (Icon + Title with click) */}
          <g className="radar-labels">
            {data.map((skill, i) => {
              const labelRadius = radius + 32;
              const angle = angleSlice * i - Math.PI / 2;
              const lx = cx + labelRadius * Math.cos(angle);
              const ly = cy + labelRadius * Math.sin(angle);
              const isSelected = selectedSkillId === skill.id;
              const isHovered = hoveredSkill?.id === skill.id;

              return (
                <g
                  key={`label-${skill.id}`}
                  transform={`translate(${lx}, ${ly})`}
                  className="cursor-pointer group"
                  onClick={() => onSelectSkill?.(skill)}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Skill Icon Circle */}
                  <circle
                    cx="0"
                    cy="-6"
                    r="15"
                    fill={isSelected || isHovered ? '#ecfdf5' : '#ffffff'}
                    stroke={isSelected || isHovered ? '#059669' : '#cbd5e1'}
                    strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                    className="shadow-xs group-hover:scale-110 transition-transform"
                  />
                  <text
                    x="0"
                    y="-1"
                    textAnchor="middle"
                    fontSize="13"
                    className="pointer-events-none"
                  >
                    {skill.icon}
                  </text>

                  {/* Skill Short Name */}
                  <text
                    x="0"
                    y="18"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={isSelected || isHovered ? '900' : '700'}
                    fill={isSelected || isHovered ? '#047857' : '#334155'}
                    className="transition-colors pointer-events-none"
                  >
                    {skill.shortName}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Center Trophy / Bullseye Anchor */}
          <circle cx={cx} cy={cy} r="4" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
        </svg>

        {/* Center/Floating Info Tooltip on Hover */}
        {activeSkill && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-30 w-11/12 max-w-[340px] bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-700/80 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black">
              <span>{activeSkill.icon}</span>
              <span className="text-amber-300 font-bold">{activeSkill.name}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-300 mt-1">
              <span>
                ความแม่นยำ: <strong className="text-emerald-400">{activeSkill.score}%</strong>
              </span>
              <span>•</span>
              <span>
                ทำข้อสอบ: <strong>{activeSkill.correctQuestions}/{activeSkill.totalQuestions} ข้อ</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend Bar Under Radar Chart */}
      <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
          <span>คะแนนของ {childName}</span>
        </div>

        {showBenchmark && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0 border-t-2 border-dashed border-amber-500" />
            <span className="text-amber-700">เกณฑ์มาตรฐานปฐมวัย (75%)</span>
          </div>
        )}

        {showClassAverage && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0 border-t-2 border-dashed border-purple-500" />
            <span className="text-purple-700">ค่าเฉลี่ยห้องเรียน</span>
          </div>
        )}
      </div>
    </div>
  );
};
