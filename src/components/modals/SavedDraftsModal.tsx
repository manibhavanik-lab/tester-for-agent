import React from 'react';
import { Bookmark, Calendar, MapPin, Users, Trash2, ArrowRight } from 'lucide-react';

interface SavedDraft {
  id: string;
  title: string;
  spotName: string;
  date: string;
  timeSlot: string;
  guests: number;
  spotId: string;
  totalCost: number;
  weatherRisk: string;
  isWeatherGuaranteed: boolean;
}

interface SavedDraftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  drafts: SavedDraft[];
  onLoadDraft: (draft: SavedDraft) => void;
  onDeleteDraft: (id: string) => void;
}

export const SavedDraftsModal: React.FC<SavedDraftsModalProps> = ({
  isOpen,
  onClose,
  drafts,
  onLoadDraft,
  onDeleteDraft,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-[#bec9c2]/30">
        <div className="p-5 border-b border-[#bec9c2]/20 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#9af5ce] text-[#005f45] flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-[#131b2e]">Saved Picnic Outings</h2>
              <span className="text-[12px] text-[#3e4943]">{drafts.length} Saved Itineraries</span>
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
          {drafts.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Bookmark className="w-10 h-10 text-[#bec9c2] mx-auto" />
              <p className="text-[15px] font-bold text-[#131b2e]">No Saved Outings Yet</p>
              <p className="text-[13px] text-[#3e4943]">
                Click "Save to Outing Draft" on any spot or itinerary to store your plans here.
              </p>
            </div>
          ) : (
            drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-[#faf8ff] p-4 rounded-xl border border-[#bec9c2]/30 space-y-2.5 hover:border-[#005f45]/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#131b2e]">{draft.title}</h3>
                    <p className="text-[12px] text-[#005f45] font-semibold mt-0.5">
                      {draft.spotName}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteDraft(draft.id)}
                    className="text-[#3e4943] hover:text-[#ba1a1a] p-1 rounded hover:bg-[#ffdad6]/50 transition-colors"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#3e4943]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#005f45]" />
                    {draft.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#005f45]" />
                    {draft.guests} Guests
                  </span>
                  <span className="font-mono font-bold text-[#131b2e]">
                    Est. ${draft.totalCost}
                  </span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onLoadDraft(draft);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-[#005f45] hover:bg-[#137a5b] text-white text-[12px] font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Load Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
