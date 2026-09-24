import React from 'react';
import { ShieldCheck, Info, Check, AlertTriangle } from 'lucide-react';

interface RegulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegulationsModal: React.FC<RegulationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-[#bec9c2]/30">
        <div className="p-5 border-b border-[#bec9c2]/20 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#9af5ce] text-[#005f45] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#131b2e]">NParks Shelter & BBQ Regulations</h2>
              <span className="text-[12px] text-[#3e4943]">Singapore Public Parks Compliance</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] flex items-center justify-center font-bold text-[14px]"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-[13px] text-[#3e4943] leading-relaxed">
          <div className="p-3.5 bg-[#eaedff]/60 rounded-xl border border-[#bec9c2]/30 space-y-1">
            <h3 className="font-bold text-[#131b2e] text-[14px]">1. Open Lawns vs Sheltered Pavilions</h3>
            <p>
              Open lawns (such as Bishan-AMK Zone B and Botanic Gardens Palm Valley) are freely open to the public on a first-come, first-served basis for non-commercial gatherings of up to 30 guests without needing a written permit.
            </p>
          </div>

          <div className="p-3.5 bg-[#eaedff]/60 rounded-xl border border-[#bec9c2]/30 space-y-1">
            <h3 className="font-bold text-[#131b2e] text-[14px]">2. Barbecue Pits & Open Flames</h3>
            <p>
              Open ground campfires and portable gas burners on grass are strictly prohibited. BBQ pits (such as East Coast Park Pavilion #14) require a confirmed AXS booking reservation. Charcoal must be properly extinguished with water before departure.
            </p>
          </div>

          <div className="p-3.5 bg-[#eaedff]/60 rounded-xl border border-[#bec9c2]/30 space-y-1">
            <h3 className="font-bold text-[#131b2e] text-[14px]">3. Sound Amplification & Music</h3>
            <p>
              Low-volume personal Bluetooth speakers are permitted provided they do not disrupt wildlife or fellow park users. Heavy public address (PA) systems or live band amplifiers are not permitted without NParks special event clearance.
            </p>
          </div>

          <div className="p-3.5 bg-[#eaedff]/60 rounded-xl border border-[#bec9c2]/30 space-y-1">
            <h3 className="font-bold text-[#131b2e] text-[14px]">4. Leave No Trace Policy</h3>
            <p>
              Picnickers are required to double-bag all food waste and deposit them into the solar compactor bins or recycle stations provided at park entrances to keep our nature reserves pristine and wildlife-safe.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#bec9c2]/20 bg-[#faf8ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#005f45] text-white font-bold rounded-lg text-[13px] hover:bg-[#137a5b] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
