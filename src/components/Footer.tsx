import React from 'react';

interface FooterProps {
  onOpenSavedDrafts: () => void;
  onOpenRegulations: () => void;
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSavedDrafts,
  onOpenRegulations,
  onOpenChecklist,
}) => {
  return (
    <footer className="w-full bg-[#f2f3ff] py-10 border-t border-[#bec9c2]/20 shadow-[0_-1px_6px_rgba(0,0,0,0.02)] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#bec9c2]/20">
          {/* Col 1: Brand */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <img
                alt="PicnicGo Logo"
                className="h-6 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VPlpxhgfR25bZrBpievBNkWYn0Xutf07CkNfqs2cohWIICqWF-kf8fLGIwbNClng-JXtdHViprf9JcqBMyFBSLpOwa02D0d7ckfnzNmfWacvcoQAdOHsrW1qtDrS4C2M7EDZF9PEcRM41qUHS_eIkM3C-Qx2igcFMZD9TfKWZrheObWFkkUo4-XPhgZmDH5fmCkHVtkT_z-wjeVGTiAiaJuBo_ItVXK5RL2qbRZLQDm80QmC67scO5g4c"
              />
              <span className="text-[20px] font-bold text-[#005f45]">PicnicGo</span>
            </div>
            <p className="text-[13px] text-[#3e4943] leading-relaxed">
              Intelligent outing coordinator optimizing park shelter bookings, live rainfall forecasts, shade coverage, and nearby provision pickups.
            </p>
          </div>

          {/* Col 2: Safety Advice */}
          <div className="space-y-2.5">
            <span className="text-[15px] font-bold text-[#131b2e] block">
              Safety & Parks Advice
            </span>
            <ul className="space-y-1.5 text-[13px] text-[#3e4943]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005f45]"></span>
                Always monitor 2-hour nowcast warnings
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005f45]"></span>
                Secure booked shelter permits in advance
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005f45]"></span>
                Carry shaded ground sheets & sunblock
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005f45]"></span>
                Leave no trace: bag and pack all refuse
              </li>
            </ul>
          </div>

          {/* Col 3: Data Sources */}
          <div className="space-y-2.5">
            <span className="text-[15px] font-bold text-[#131b2e] block">
              Data Sources & APIs
            </span>
            <p className="text-[13px] text-[#3e4943] leading-relaxed">
              Live meteorological telemetry courtesy of the National Environment Agency (NEA) Weather & 24hr Rain Risk API. Park spatial geometry via Open Data Parks.
            </p>
          </div>

          {/* Col 4: Planning Tools */}
          <div className="space-y-2.5">
            <span className="text-[15px] font-bold text-[#131b2e] block">
              Planning Tools
            </span>
            <div className="flex flex-col space-y-1.5 text-[13px]">
              <button
                onClick={onOpenSavedDrafts}
                className="text-left text-[#3e4943] hover:text-[#005f45] transition-colors cursor-pointer"
              >
                Saved Picnic Drafts
              </button>
              <button
                onClick={onOpenRegulations}
                className="text-left text-[#3e4943] hover:text-[#005f45] transition-colors cursor-pointer"
              >
                Shelter Permit Regulations
              </button>
              <button
                onClick={onOpenChecklist}
                className="text-left text-[#3e4943] hover:text-[#005f45] transition-colors cursor-pointer"
              >
                Picnic Preparation Checklist
              </button>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#3e4943]">
          <p>© 2025 PicnicGo. All rights reserved. Built for stress-free open-air celebrations.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#005f45] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#005f45] animate-ping"></span>
              Live Weather Sync Active
            </span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
