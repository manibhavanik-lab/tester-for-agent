import React, { useState } from 'react';
import { CheckSquare, Square, Printer, Check } from 'lucide-react';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true,
    'c3': false,
    'c4': true,
    'c5': false,
    'c6': true,
  });

  const checklistCategories = [
    {
      title: 'Essential Comfort & Shelter',
      items: [
        { id: 'c1', text: 'Waterproof picnic mat or canvas groundsheet' },
        { id: 'c2', text: 'Extra compact picnic cushions or low camping chairs' },
        { id: 'c3', text: 'Pop-up shade umbrella or sun tent' },
      ],
    },
    {
      title: 'Food & Refreshment Handling',
      items: [
        { id: 'c4', text: 'Insulated cooler bag with ice packs' },
        { id: 'c5', text: 'Reusable bamboo plates, cups, and cutlery' },
        { id: 'c6', text: 'Wet wipes, hand sanitizer & paper towels' },
        { id: 'c7', text: 'Heavy-duty garbage bags for Leave-No-Trace cleanup' },
      ],
    },
    {
      title: 'Tropical Sun & Bug Protection',
      items: [
        { id: 'c8', text: 'Broad-spectrum SPF 50+ sunblock' },
        { id: 'c9', text: 'DEET-free citronella mosquito repellent spray' },
        { id: 'c10', text: 'Sunglasses & wide-brim hat' },
      ],
    },
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-[#bec9c2]/30">
        <div className="p-5 border-b border-[#bec9c2]/20 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#9af5ce] text-[#005f45] flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3]" />
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#131b2e]">Picnic Preparation Checklist</h2>
              <span className="text-[12px] text-[#3e4943]">Pack Smart for the Outdoors</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] flex items-center justify-center font-bold text-[14px]"
          >
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {checklistCategories.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-[13px] font-bold text-[#005f45] uppercase tracking-wider">
                {cat.title}
              </h3>
              <div className="space-y-1.5">
                {cat.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-2.5 rounded-lg border flex items-center gap-2.5 cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#9af5ce]/15 border-[#005f45]/30 text-[#131b2e]'
                          : 'bg-[#faf8ff] border-[#bec9c2]/25 text-[#3e4943]'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#005f45]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#bec9c2]" />
                      )}
                      <span className={`text-[13px] ${isChecked ? 'font-medium' : ''}`}>
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#bec9c2]/20 bg-[#faf8ff] flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-lg border border-[#bec9c2]/30 text-[12px] font-bold text-[#3e4943] hover:bg-white flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Checklist</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#005f45] text-white font-bold rounded-lg text-[13px] hover:bg-[#137a5b] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
