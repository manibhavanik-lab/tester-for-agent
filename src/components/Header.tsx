import React from 'react';
import { Bookmark, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  onOpenNewPlan: () => void;
  onOpenSavedDrafts: () => void;
  savedDraftsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onSelectStep,
  onOpenNewPlan,
  onOpenSavedDrafts,
  savedDraftsCount,
}) => {
  const navItems = [
    { step: 1, label: '1. Date & Weather' },
    { step: 2, label: '2. Spot & Shelter' },
    { step: 3, label: '3. Food & Gear' },
    { step: 4, label: '4. Shareable Plan' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-b border-[#bec9c2]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone: Logo and title */}
        <div 
          onClick={() => onSelectStep(1)}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
        >
          <img
            alt="PicnicGo Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VPlpxhgfR25bZrBpievBNkWYn0Xutf07CkNfqs2cohWIICqWF-kf8fLGIwbNClng-JXtdHViprf9JcqBMyFBSLpOwa02D0d7ckfnzNmfWacvcoQAdOHsrW1qtDrS4C2M7EDZF9PEcRM41qUHS_eIkM3C-Qx2igcFMZD9TfKWZrheObWFkkUo4-XPhgZmDH5fmCkHVtkT_z-wjeVGTiAiaJuBo_ItVXK5RL2qbRZLQDm80QmC67scO5g4c"
          />
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#005f45] leading-none tracking-tight">
              PicnicGo
            </span>
            <span className="text-[11px] font-bold text-[#3e4943] tracking-wider uppercase mt-0.5">
              Outdoor Day Planner
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#eaedff]/60 p-1.5 rounded-xl border border-[#bec9c2]/30">
          {navItems.map((item) => {
            const isActive = currentStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => onSelectStep(item.step)}
                className={`text-[13px] font-semibold px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#005f45] text-white shadow-sm'
                    : 'text-[#3e4943] hover:bg-[#dae2fd]/70 hover:text-[#131b2e]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right action area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Saved Drafts quick button */}
          <button
            onClick={onOpenSavedDrafts}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-[#005f45] bg-[#9af5ce]/30 hover:bg-[#9af5ce]/50 rounded-lg transition-colors cursor-pointer border border-[#7ed8b3]/50"
            title="View saved picnic itineraries"
          >
            <Bookmark className="w-4 h-4 text-[#005f45]" />
            <span>Drafts</span>
            {savedDraftsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#005f45] text-white text-[11px] flex items-center justify-center font-bold">
                {savedDraftsCount}
              </span>
            )}
          </button>

          {/* New Picnic Plan Button */}
          <button
            onClick={onOpenNewPlan}
            className="inline-flex items-center justify-center gap-1 bg-[#fea619] text-[#684000] font-bold text-[13px] px-3.5 py-2 rounded-lg shadow-sm hover:bg-[#855300] hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>New Picnic Plan</span>
          </button>

          <div className="h-7 w-px bg-[#bec9c2]/40 hidden md:block"></div>

          {/* User profile pill */}
          <div className="flex items-center gap-2">
            <img
              alt="Picnic Planner Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#005f45]/20 shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALbdJDZJdgIqFS1bmXnINE2L2e82nYytSIZ9G7t8QpkIsODRlGc-FS5e3imCFWodqVIptmxXrQkUBXIJbchULtckkEAuJZw0pss6BdT06olWRt_Pf6XcCR4kORf9gUi2sddq_Dzdc2DPOf9KrR6bf8WUL3gfJUpgDoWcNQq12KZtcPwW9E93rQYA0q1wmVZJlGtW1Tosa4rlAS6sHUZLm4N_-vZ038QMZFGBi8Rw4cBWsinsGgQhD9"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[13px] font-semibold text-[#131b2e] leading-tight">
                Picnic Planner
              </span>
              <span className="text-[11px] font-medium text-[#3e4943] leading-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006042]"></span>
                Verified Outing
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
