import React from 'react';
import { Plus, Sparkles, Flame, Users, Heart, ArrowRight } from 'lucide-react';
import { Spot } from '../../data/mockData';

interface NewPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: {
    spotId: string;
    partySize: number;
    occasion: string;
    timeSlot: string;
  }) => void;
}

export const NewPlanModal: React.FC<NewPlanModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  const templates = [
    {
      title: 'River Breeze & Sourdough Grazing',
      spotId: '1', // Bishan
      occasion: 'casual',
      partySize: 6,
      timeSlot: 'afternoon',
      icon: '🧺',
      desc: 'Bishan-AMK River Lawn Zone B under lush rain trees with charcuterie platter.',
      badge: 'Popular',
    },
    {
      title: 'Botanic Gardens Romantic Duo',
      spotId: '2', // Botanic
      occasion: 'romantic',
      partySize: 2,
      timeSlot: 'afternoon',
      icon: '🌿',
      desc: 'Scenic royal palm amphitheater slope facing the lake symphony stage.',
      badge: 'Scenic',
    },
    {
      title: 'Coastal Sunset BBQ & Skewers',
      spotId: '3', // East Coast Park
      occasion: 'birthday',
      partySize: 12,
      timeSlot: 'sunset',
      icon: '🔥',
      desc: 'Covered Pavilion #14 with twin brick charcoal grills and sea breeze.',
      badge: 'BBQ Ready',
    },
    {
      title: 'Marina Barrage Skyline Kite Flying',
      spotId: '4', // Marina Barrage
      occasion: 'family',
      partySize: 8,
      timeSlot: 'sunset',
      icon: '🪁',
      desc: 'Elevated green roof turf amphitheater with panoramic city views.',
      badge: 'Open Sky',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-[#bec9c2]/30">
        <div className="p-5 border-b border-[#bec9c2]/20 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#fea619] text-[#684000] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#131b2e]">Create New Picnic Plan</h2>
              <span className="text-[12px] text-[#3e4943]">Choose a curated starter or build custom</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] flex items-center justify-center font-bold text-[14px]"
          >
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <p className="text-[13px] text-[#3e4943]">
            Select a verified outing template configured with optimal weather windows and spots:
          </p>

          <div className="grid gap-2.5">
            {templates.map((tpl, i) => (
              <div
                key={i}
                onClick={() => {
                  onSelectTemplate(tpl);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-[#bec9c2]/30 bg-[#faf8ff] hover:bg-white hover:border-[#005f45] transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{tpl.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-bold text-[#131b2e] group-hover:text-[#005f45] transition-colors">
                        {tpl.title}
                      </h4>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-[#9af5ce] text-[#002116]">
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#3e4943] mt-0.5">
                      {tpl.desc}
                    </p>
                    <span className="text-[11px] text-[#005f45] font-semibold mt-1 inline-block">
                      {tpl.partySize} Guests · {tpl.timeSlot === 'afternoon' ? '14:30 - 18:00' : '17:00 - 20:30'}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#eaedff] group-hover:bg-[#005f45] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[#bec9c2]/20 bg-[#faf8ff] flex items-center justify-between">
          <span className="text-[12px] text-[#3e4943]">Want to configure every detail from scratch?</span>
          <button
            onClick={() => {
              onSelectTemplate({
                spotId: '1',
                partySize: 6,
                occasion: 'casual',
                timeSlot: 'afternoon',
              });
              onClose();
            }}
            className="px-4 py-2 bg-[#005f45] text-white font-bold text-[12px] rounded-lg hover:bg-[#137a5b] transition-colors cursor-pointer"
          >
            Start Fresh Plan
          </button>
        </div>
      </div>
    </div>
  );
};
