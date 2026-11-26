import React from 'react';
import {
  Users,
  ShieldCheck,
  Shield,
  Cloud,
  RefreshCw,
  Search,
  X,
  Clock,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Check,
  Pencil,
  Lock,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { ChildProfile, Grade, CurriculumMode } from '../../types';
import { getAvatarColorOption } from '../../utils/avatarUtils';
import { canEditProfile, canDeleteProfile, isProfileCreatedOnThisDevice } from '../../services/deviceService';
import { AvatarEditor } from '../AvatarEditor';

interface OriginalHomeProfilesSectionProps {
  curriculumMode?: CurriculumMode;
  isAdmin?: boolean;
  onOpenAdminAuth: (targetProfile?: ChildProfile | null) => void;
  onSyncProfiles?: () => Promise<void>;
  isSyncingCloud: boolean;
  onOpenTopPerformers?: () => void;
  isCreatingProfile: boolean;
  onStartCreateProfile: () => void;
  onCancelCreateProfile: () => void;
  onCreateSubmit: (e: React.FormEvent) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedGradeFilter: 'ALL' | Grade | 'PRIMARY';
  onGradeFilterChange: (f: 'ALL' | Grade | 'PRIMARY') => void;
  sortBy: 'latest' | 'score' | 'name';
  onSortByChange: (s: 'latest' | 'score' | 'name') => void;
  filteredProfiles: ChildProfile[];
  paginatedProfiles: ChildProfile[];
  activeProfile: ChildProfile;
  onSelectProfile: (p: ChildProfile) => void;
  onOpenStreakModal: (e: React.MouseEvent, p: ChildProfile) => void;
  onStartEditProfile: (p: ChildProfile, e?: React.MouseEvent) => void;
  deleteConfirmId: string | null;
  onTriggerDelete: (e: React.MouseEvent, id: string) => void;
  onConfirmDelete: (e: React.MouseEvent, id: string) => void;
  onCancelDelete: (e: React.MouseEvent) => void;
  startIndex: number;
  itemsPerPage: number;
  totalPages: number;
  validPage: number;
  onPageChange: (p: number) => void;
  newName: string;
  onNewNameChange: (n: string) => void;
  newGrade: Grade;
  onNewGradeChange: (g: Grade) => void;
  selectedAvatar: string;
  onSelectedAvatarChange: (a: string) => void;
  selectedAvatarBg: string;
  onSelectedAvatarBgChange: (bg: string) => void;
  feedbackMsg: string | null;
  formatLastActive: (p: ChildProfile) => string;
}

export const OriginalHomeProfilesSection: React.FC<OriginalHomeProfilesSectionProps> = ({
  curriculumMode = 'early_childhood',
  isAdmin,
  onOpenAdminAuth,
  onSyncProfiles,
  isSyncingCloud,
  onOpenTopPerformers,
  isCreatingProfile,
  onStartCreateProfile,
  onCancelCreateProfile,
  onCreateSubmit,
  searchQuery,
  onSearchChange,
  selectedGradeFilter,
  onGradeFilterChange,
  sortBy,
  onSortByChange,
  filteredProfiles,
  paginatedProfiles,
  activeProfile,
  onSelectProfile,
  onOpenStreakModal,
  onStartEditProfile,
  deleteConfirmId,
  onTriggerDelete,
  onConfirmDelete,
  onCancelDelete,
  startIndex,
  itemsPerPage,
  totalPages,
  validPage,
  onPageChange,
  newName,
  onNewNameChange,
  newGrade,
  onNewGradeChange,
  selectedAvatar,
  onSelectedAvatarChange,
  selectedAvatarBg,
  onSelectedAvatarBgChange,
  feedbackMsg,
  formatLastActive,
}) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl sm:text-2xl">{curriculumMode === 'cbe_primary' ? '🎓' : '🧸'}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800">
                {curriculumMode === 'cbe_primary'
                  ? '1. โปรไฟล์นักเรียน ป.1 - ป.6 (ฐานสมรรถนะ)'
                  : '1. โปรไฟล์เด็กปฐมวัย อ.1 - อ.3 (8 ทักษะหลัก)'}
              </h2>
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  curriculumMode === 'cbe_primary'
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    : 'bg-sky-100 text-sky-800 border border-sky-200'
                }`}
              >
                {curriculumMode === 'cbe_primary' ? 'ระบบจัดการ: ป.1 - ป.6' : 'ระบบจัดการ: อ.1 - อ.3'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>บันทึกและซิงค์ฐานข้อมูลคลาวด์อัตโนมัติ (Firestore)</span>
            </div>
          </div>
        </div>

        {!isCreatingProfile && (
          <div className="flex items-center gap-1.5">
            {isAdmin ? (
              <button
                type="button"
                id="btn-admin-status-badge"
                onClick={() => onOpenAdminAuth(null)}
                className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1.5 rounded-xl border border-amber-300 cursor-pointer transition-all shadow-xs"
                title="สิทธิ์ผู้ดูแลระบบ: สามารถแก้ไขโปรไฟล์ทุกเครื่องได้ (คลิกเพื่อดูรายละเอียด)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>ผู้ดูแลระบบ</span>
              </button>
            ) : (
              <button
                type="button"
                id="btn-admin-login-start"
                onClick={() => onOpenAdminAuth(null)}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-300 cursor-pointer transition-all"
                title="เข้าสู่ระบบผู้ดูแลระบบ (Google) เพื่อแก้ไขโปรไฟล์จากทุกอุปกรณ์"
              >
                <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="hidden sm:inline">โหมดผู้ดูแล</span>
              </button>
            )}
            {onSyncProfiles && (
              <button
                id="btn-start-sync-cloud"
                type="button"
                onClick={onSyncProfiles}
                disabled={isSyncingCloud}
                title="ซิงค์โปรไฟล์นักเรียนกับฐานข้อมูลคลาวด์ Firebase Firestore"
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                <RefreshCw className={`w-3 h-3 text-emerald-600 ${isSyncingCloud ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">ซิงค์คลาวด์</span>
              </button>
            )}
            {onOpenTopPerformers && (
              <button
                id="btn-start-open-top-performers"
                type="button"
                onClick={onOpenTopPerformers}
                className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 cursor-pointer transition-all active:scale-95 shadow-xs"
                title="ดูกระดานผู้นำยอดเยี่ยมแบบนิรนามสำหรับห้องเรียน (Top Performers)"
              >
                <span>👑</span>
                <span className="hidden sm:inline">กระดานผู้นำยอดเยี่ยม</span>
                <span className="sm:hidden">กระดานผู้นำ</span>
              </button>
            )}
            <button
              id="btn-start-add-profile"
              onClick={onStartCreateProfile}
              className="flex items-center gap-1.5 text-xs font-black text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-xl border border-blue-200 cursor-pointer transition-all active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ เพิ่มเด็กใหม่</span>
            </button>
          </div>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2 sm:p-2.5 mb-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="input-search-profile-start"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหาชื่อโปรไฟล์ เช่น ต้นหม่อน, ไหมมุก หรือ อ.1, อ.2..."
            className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
              title="ล้างคำค้นหา"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Grade Filter & Sort Options */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Grade Filter Pills */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 flex-wrap">
            {curriculumMode === 'thai_phonics' ? (
              (['ALL', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => onGradeFilterChange(g as any)}
                  className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedGradeFilter === g
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {g === 'ALL' ? 'ทั้งหมด' : `ป.${g.slice(1)}`}
                </button>
              ))
            ) : curriculumMode === 'cbe_primary' ? (
              (['ALL', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => onGradeFilterChange(g as any)}
                  className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedGradeFilter === g
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {g === 'ALL' ? 'ทั้งหมด' : `ป.${g.slice(1)}`}
                </button>
              ))
            ) : (
              (['ALL', 'K1', 'K2', 'K3'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => onGradeFilterChange(g as any)}
                  className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedGradeFilter === g
                      ? 'bg-amber-400 text-amber-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {g === 'ALL' ? 'ทั้งหมด' : g === 'K1' ? 'อ.1' : g === 'K2' ? 'อ.2' : 'อ.3'}
                </button>
              ))
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-slate-200 text-[11px]">
            <Clock className="w-3 h-3 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as 'latest' | 'score' | 'name')}
              className="bg-transparent text-slate-700 font-bold focus:outline-none cursor-pointer"
              title="เรียงลำดับโปรไฟล์"
            >
              <option value="latest">เรียง: ล่าสุด (อัปเดตล่าสุด)</option>
              <option value="score">เรียง: คะแนนสูงสุด</option>
              <option value="name">เรียง: ชื่อ ก-ฮ</option>
            </select>
          </div>

          {/* Results count badge */}
          <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-1 rounded-xl border border-slate-200 shrink-0">
            พบ {filteredProfiles.length} คน
          </span>
        </div>
      </div>

      {/* New Profile Form Modal/Inline Card */}
      {isCreatingProfile && (
        <form
          onSubmit={onCreateSubmit}
          className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 mb-4 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="text-sm font-black text-amber-900 mb-2 flex items-center justify-between">
            <span>✨ เพิ่มโปรไฟล์เด็กคนใหม่</span>
            <button
              type="button"
              onClick={onCancelCreateProfile}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold px-2 py-0.5 rounded cursor-pointer"
            >
              ปิด
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อหรือชื่อเล่นของเด็ก
              </label>
              <input
                type="text"
                required
                placeholder={
                  curriculumMode === 'cbe_primary'
                    ? 'เช่น พี่ต้นกล้า, พี่ฟ้าใส, น้องป.1/1...'
                    : 'เช่น น้องมินนี่, น้องกัปตัน, น้องพอใจ...'
                }
                value={newName}
                onChange={(e) => onNewNameChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ระดับชั้น
              </label>
              <div className={`grid ${(curriculumMode === 'thai_phonics' || curriculumMode === 'cbe_primary') ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'} gap-1.5`}>
                {curriculumMode === 'thai_phonics' ? (
                  (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onNewGradeChange(g)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        newGrade === g
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {`ป.${g.slice(1)}`}
                    </button>
                  ))
                ) : curriculumMode === 'cbe_primary' ? (
                  (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onNewGradeChange(g)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        newGrade === g
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {`ป.${g.slice(1)}`}
                    </button>
                  ))
                ) : (
                  (['K1', 'K2', 'K3'] as Grade[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onNewGradeChange(g)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        newGrade === g
                          ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {g === 'K1' ? 'อ.1' : g === 'K2' ? 'อ.2' : 'อ.3'}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <AvatarEditor
              selectedEmoji={selectedAvatar}
              selectedColorId={selectedAvatarBg}
              onChangeEmoji={onSelectedAvatarChange}
              onChangeColor={onSelectedAvatarBgChange}
              previewName={newName || 'นักเรียนคนใหม่'}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancelCreateProfile}
              className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-black bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md border-b-2 border-amber-700 cursor-pointer"
            >
              บันทึกโปรไฟล์
            </button>
          </div>
        </form>
      )}

      {/* Feedback message banner if any */}
      {feedbackMsg && (
        <div className="mb-3 p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Profiles Grid */}
      {paginatedProfiles.length === 0 ? (
        <div className="py-8 px-4 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <div className="text-3xl mb-1.5">🔍</div>
          <p className="text-sm font-black text-slate-700">ไม่พบโปรไฟล์ที่ค้นหา</p>
          <p className="text-xs text-slate-500 mt-0.5">
            {searchQuery
              ? `ไม่มีโปรไฟล์ที่ตรงกับคำว่า "${searchQuery}"`
              : 'ยังไม่มีโปรไฟล์ในหมวดหมู่นี้'}
          </p>
          {(searchQuery || selectedGradeFilter !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onGradeFilterChange('ALL');
                onPageChange(1);
              }}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 cursor-pointer transition-all"
            >
              <X className="w-3 h-3" />
              ล้างตัวกรองและคำค้นหา
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {paginatedProfiles.map((profile) => {
            const isSelected = profile.id === activeProfile.id;
            const isConfirming = deleteConfirmId === profile.id;
            const canEdit = canEditProfile(profile, isAdmin);
            const isOwnDevice = isProfileCreatedOnThisDevice(profile);
            const colorCfg = getAvatarColorOption(profile.avatarBg);
            return (
              <div
                key={profile.id}
                id={`start-profile-card-${profile.id}`}
                onClick={() => onSelectProfile(profile)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 group relative ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 ring-3 ring-amber-200 shadow-md translate-y-[-1px]'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                {/* Profile Header: Avatar + Full Name + Selected Badge */}
                <div className="flex items-start gap-3 w-full">
                  <div
                    className={`w-12 h-12 ${colorCfg.bgClass} rounded-2xl shadow-xs border-2 ${colorCfg.borderClass} flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shrink-0`}
                  >
                    <span>{profile.avatar}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <button
                        type="button"
                        id={`btn-profile-name-streak-${profile.id}`}
                        onClick={(e) => onOpenStreakModal(e, profile)}
                        className="font-black text-slate-900 group-hover:text-amber-800 text-sm sm:text-base leading-snug break-words flex items-center gap-1 group/name cursor-pointer text-left transition-colors"
                        title="คลิกที่ชื่อเพื่อดูปฏิทิน 30-Day Learning Streak Tracker"
                      >
                        <span className="font-black">{profile.name}</span>
                        {profile.streakDays > 0 && (
                          <span className="inline-flex items-center text-[10px] font-black bg-amber-100 text-amber-800 group-hover/name:bg-amber-200 px-1.5 py-0.2 rounded-md transition-all shrink-0">
                            🔥 {profile.streakDays}
                          </span>
                        )}
                      </button>

                      {isSelected && (
                        <div
                          className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-2xs shrink-0"
                          title="โปรไฟล์ที่เลือกใช้งานอยู่"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full shrink-0">
                        {profile.grade === 'K1'
                          ? 'อนุบาล 1'
                          : profile.grade === 'K2'
                          ? 'อนุบาล 2'
                          : profile.grade === 'K3'
                          ? 'อนุบาล 3'
                          : profile.grade === 'P1'
                          ? 'ประถม 1'
                          : profile.grade === 'P2'
                          ? 'ประถม 2'
                          : profile.grade === 'P3'
                          ? 'ประถม 3'
                          : profile.grade === 'P4'
                          ? 'ประถม 4'
                          : profile.grade === 'P5'
                          ? 'ประถม 5'
                          : profile.grade === 'P6'
                          ? 'ประถม 6'
                          : profile.grade}
                      </span>
                      <span className="text-xs text-amber-700 font-bold flex items-center gap-0.5 shrink-0">
                        🪙 {profile.totalScore}
                      </span>
                      {!isOwnDevice && (
                        <span
                          className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0"
                          title={`สร้างจาก: ${profile.createdDeviceName || 'อุปกรณ์อื่น'}`}
                        >
                          📱
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Last active timestamp + Action Buttons (Edit / Delete) */}
                <div
                  className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 w-full text-xs text-slate-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium truncate">
                    <Clock className="w-3 h-3 shrink-0 text-slate-400" />
                    <span className="truncate">{formatLastActive(profile)}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isConfirming ? (
                      <div className="flex items-center gap-1 bg-rose-50 border border-rose-300 p-0.5 rounded-lg">
                        <button
                          type="button"
                          id={`btn-confirm-delete-start-${profile.id}`}
                          onClick={(e) => onConfirmDelete(e, profile.id)}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black px-2 py-1 rounded-md cursor-pointer transition-colors"
                        >
                          ลบ
                        </button>
                        <button
                          type="button"
                          id={`btn-cancel-delete-start-${profile.id}`}
                          onClick={onCancelDelete}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-1.5 py-1 rounded-md cursor-pointer transition-colors"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    ) : (
                      <>
                        {canEdit ? (
                          <button
                            type="button"
                            id={`btn-edit-start-profile-${profile.id}`}
                            onClick={(e) => onStartEditProfile(profile, e)}
                            title={`แก้ไขโปรไฟล์ ${profile.name}`}
                            className="w-7 h-7 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg flex items-center justify-center border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            id={`btn-locked-edit-start-${profile.id}`}
                            onClick={() => onOpenAdminAuth(profile)}
                            title="สร้างจากอุปกรณ์อื่น: แก้ไขได้เฉพาะจากเครื่องต้นทาง หรือเข้าสู่ระบบผู้ดูแลระบบ (คลิกเพื่อเข้าสู่ระบบ)"
                            className="w-7 h-7 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200 transition-all cursor-pointer shadow-2xs"
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {canDeleteProfile(profile, isAdmin) ? (
                          <button
                            type="button"
                            id={`btn-delete-start-profile-${profile.id}`}
                            onClick={(e) => onTriggerDelete(e, profile.id)}
                            title="ลบโปรไฟล์"
                            className="w-7 h-7 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 rounded-lg flex items-center justify-center border border-slate-200 hover:border-rose-300 transition-all cursor-pointer shadow-2xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            id={`btn-locked-delete-start-${profile.id}`}
                            onClick={() => onOpenAdminAuth(profile)}
                            title="สร้างจากอุปกรณ์อื่น: ลบได้เฉพาะจากเครื่องต้นทาง หรือผู้ดูแลระบบ"
                            className="w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center border border-slate-200 transition-all cursor-pointer"
                          >
                            <Lock className="w-3 h-3" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls (9 items per page) */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-xs font-bold text-slate-600">
          {filteredProfiles.length > 0 ? (
            <span>
              แสดง <span className="text-amber-700 font-black">{startIndex + 1}</span> -{' '}
              <span className="text-amber-700 font-black">
                {Math.min(startIndex + itemsPerPage, filteredProfiles.length)}
              </span>{' '}
              จากทั้งหมด <span className="text-slate-800 font-black">{filteredProfiles.length}</span> คน
              (หน้าละ 9 คน)
            </span>
          ) : (
            <span>ไม่พบข้อมูล</span>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              id="btn-pagination-prev-start"
              onClick={() => onPageChange(Math.max(1, validPage - 1))}
              disabled={validPage <= 1}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>ก่อนหน้า</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  className={`w-7 h-7 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    validPage === pageNum
                      ? 'bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              id="btn-pagination-next-start"
              onClick={() => onPageChange(Math.min(totalPages, validPage + 1))}
              disabled={validPage >= totalPages}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
