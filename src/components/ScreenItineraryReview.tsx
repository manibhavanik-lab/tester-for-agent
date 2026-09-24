import React, { useState } from 'react';
import { Spot, MOCK_FOOD_ITEMS, MOCK_GEAR_ITEMS } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Umbrella, 
  Share2, 
  Copy, 
  Check, 
  Printer, 
  Bookmark, 
  AlertTriangle, 
  CloudRain, 
  ShieldCheck, 
  Plus, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface ScreenItineraryReviewProps {
  selectedSpot: Spot;
  selectedDate: string;
  selectedTimeSlot: string;
  partySize: number;
  occasion: string;
  selectedFoodQuantities: Record<string, number>;
  gearStatus: Record<string, 'bringing' | 'renting' | 'none'>;
  onEditSpot: () => void;
  onEditDate: () => void;
  onEditProvisions: () => void;
  onSaveDraft: () => void;
}

export const ScreenItineraryReview: React.FC<ScreenItineraryReviewProps> = ({
  selectedSpot,
  selectedDate,
  selectedTimeSlot,
  partySize,
  occasion,
  selectedFoodQuantities,
  gearStatus,
  onEditSpot,
  onEditDate,
  onEditProvisions,
  onSaveDraft,
}) => {
  const [copied, setCopied] = useState(false);
  const [rainAlertSimulated, setRainAlertSimulated] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [timelineItems, setTimelineItems] = useState([
    { time: '14:30', title: 'Arrival & Locker Pickup', desc: 'Meet at Carpark B; retrieve chilled hamper & groundsheet from Locker Bay A.' },
    { time: '14:50', title: 'Ground Setup at River Lawn', desc: `Lay out groundsheet 25m from riverbank. Immediate fallback available at ${selectedSpot.pavilionName}.` },
    { time: '15:15', title: 'Hamper Unveiling & Grazing', desc: 'Savour charcuterie platter and chilled botanical cold brew coolers.' },
    { time: '16:30', title: 'Lawn Games & Social Stroll', desc: 'Wooden Kubb throwing and breezy nature walk along the wild reeds.' },
    { time: '17:30', title: 'Golden Hour Photography', desc: 'Optimal lighting reflecting over the water channel.' },
    { time: '18:30', title: 'Leave-No-Trace Packdown', desc: 'Bag all trash for the recycle bins; return rented gear to the locker.' },
  ]);
  const [newTime, setNewTime] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddTimeline = () => {
    if (!newTime || !newTitle) return;
    setTimelineItems([...timelineItems, { time: newTime, title: newTitle, desc: 'Custom activity' }]);
    setNewTime('');
    setNewTitle('');
  };

  const shareText = `🧺 You're invited to an outdoor picnic!
📍 Location: ${selectedSpot.name} (${selectedSpot.zone})
📅 Date: ${selectedDate}
⏰ Time: ${selectedTimeSlot === 'afternoon' ? '14:30 - 18:00' : '15:00 - 18:30'}
👥 Party Size: ${partySize} guests
☂️ Weather Backup: Auto-relocation to ${selectedSpot.pavilionName} guaranteed!

RSVP & view full outing details on PicnicGo!`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bec9c2]/20 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#005f45] text-[12px] font-bold uppercase tracking-wider mb-1">
            <Share2 className="w-4 h-4" />
            <span>Stage 4 · Final Outing Itinerary & Shareable Brief</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131b2e] tracking-tight">
            Review Your Outing Master Plan
          </h1>
          <p className="text-[15px] text-[#3e4943] mt-1">
            Your weather-verified, provisioned outdoor gathering itinerary is ready to share with your guests.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onSaveDraft}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#bec9c2]/30 text-[#131b2e] hover:bg-[#eaedff] text-[13px] font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-[#005f45]" />
            <span>Save to Drafts</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="px-4 py-2 rounded-lg bg-[#005f45] text-white text-[13px] font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#137a5b] transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share with Guests</span>
          </button>
        </div>
      </div>

      {/* Simulated Rain Fallback Alert Banner (Interactive feature!) */}
      {rainAlertSimulated ? (
        <div className="bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#93000a] animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-[14px] block">
                Rain Alert Triggered! Auto-Relocation Active
              </span>
              <p className="text-[13px] mt-0.5">
                Afternoon rain probability jumped to 65%. Your spot reservation has shifted smoothly to{' '}
                <strong>{selectedSpot.pavilionName} ({selectedSpot.pavilionDimensions})</strong>. All guests have been notified with updated covered pavilion coordinates!
              </p>
            </div>
          </div>
          <button
            onClick={() => setRainAlertSimulated(false)}
            className="px-3 py-1 bg-white text-[#ba1a1a] text-[12px] font-bold rounded-lg border border-[#ba1a1a]/30 shrink-0 self-start sm:self-auto cursor-pointer hover:bg-[#ffdad6]"
          >
            Reset Weather Status
          </button>
        </div>
      ) : (
        <div className="bg-[#f2f3ff] border border-[#bec9c2]/20 rounded-xl p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-[13px] text-[#3e4943]">
            <ShieldCheck className="w-5 h-5 text-[#005f45]" />
            <span>
              <strong>Weather Watchdog Active:</strong> Guaranteed instant shelter at {selectedSpot.pavilionName}.
            </span>
          </div>
          <button
            onClick={() => setRainAlertSimulated(true)}
            className="px-3 py-1 bg-white hover:bg-[#eaedff] text-[#005f45] text-[11px] font-bold rounded-lg border border-[#bec9c2]/30 transition-colors cursor-pointer"
          >
            Test Rain Fallback Trigger
          </button>
        </div>
      )}

      {/* Master Overview Card */}
      <div className="bg-white rounded-xl shadow-md border border-[#bec9c2]/20 overflow-hidden">
        <div className="grid md:grid-cols-12">
          {/* Park Photo Banner */}
          <div className="md:col-span-4 relative min-h-[220px] bg-[#eaedff]">
            <img
              src={selectedSpot.imageUrl}
              alt={selectedSpot.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9af5ce]">
                Selected Spot
              </span>
              <h3 className="text-[17px] font-extrabold leading-tight">
                {selectedSpot.name}
              </h3>
              <span className="text-[12px] text-white/80 mt-0.5">
                {selectedSpot.zone}
              </span>
            </div>
          </div>

          {/* Key Parameters */}
          <div className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#005f45]" />
                  <span>Date</span>
                </span>
                <span className="text-[14px] font-bold text-[#131b2e] block mt-0.5">
                  {selectedDate}
                </span>
                <button
                  onClick={onEditDate}
                  className="text-[11px] text-[#005f45] font-semibold hover:underline mt-1 block"
                >
                  Edit date
                </button>
              </div>

              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#005f45]" />
                  <span>Time Slot</span>
                </span>
                <span className="text-[14px] font-bold text-[#131b2e] block mt-0.5">
                  {selectedTimeSlot === 'morning'
                    ? '08:30 – 11:30'
                    : selectedTimeSlot === 'afternoon'
                    ? '14:30 – 18:00'
                    : '17:00 – 20:30'}
                </span>
                <button
                  onClick={onEditDate}
                  className="text-[11px] text-[#005f45] font-semibold hover:underline mt-1 block"
                >
                  Edit time
                </button>
              </div>

              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#005f45]" />
                  <span>Party Size</span>
                </span>
                <span className="text-[14px] font-bold text-[#131b2e] block mt-0.5">
                  {partySize} Guests
                </span>
                <span className="text-[11px] text-[#3e4943] block mt-1 capitalize">
                  {occasion} Outing
                </span>
              </div>

              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] flex items-center gap-1">
                  <Umbrella className="w-3.5 h-3.5 text-[#006042]" />
                  <span>Rain Relocation</span>
                </span>
                <span className="text-[13px] font-bold text-[#005f45] block mt-0.5">
                  {selectedSpot.pavilionName}
                </span>
                <button
                  onClick={onEditSpot}
                  className="text-[11px] text-[#005f45] font-semibold hover:underline mt-1 block"
                >
                  Change spot
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#bec9c2]/20">
              <div className="flex items-center gap-2 text-[12px] text-[#3e4943]">
                <span className="font-bold text-[#131b2e]">Permit Status:</span>
                <span className="text-[#006042] font-semibold">{selectedSpot.bbqStatus}</span>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#3e4943]">
                <span className="font-bold text-[#131b2e]">Facilities:</span>
                <span>Potable water tap • Carpark within 120m • Accessible paved route</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split: Timeline & Provisions Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Hourly Run-of-Show */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-6 shadow-xs border border-[#bec9c2]/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f2f3ff]">
            <h2 className="text-[18px] font-bold text-[#131b2e]">
              Hourly Run-of-Show Timeline
            </h2>
            <span className="text-[12px] text-[#3e4943]">Automated sequencing</span>
          </div>

          <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#bec9c2]/40">
            {timelineItems.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#005f45] ring-4 ring-white shadow-xs" />
                <div className="flex items-baseline gap-3">
                  <span className="text-[13px] font-mono font-bold text-[#005f45] shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#131b2e]">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-[#3e4943] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add custom timeline event */}
          <div className="pt-3 border-t border-[#bec9c2]/20 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g. 17:00"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-24 px-3 py-1.5 text-[13px] bg-[#f2f3ff] rounded-lg border border-[#bec9c2]/30 text-[#131b2e]"
            />
            <input
              type="text"
              placeholder="Add activity (e.g. Birthday cake presentation)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 px-3 py-1.5 text-[13px] bg-[#f2f3ff] rounded-lg border border-[#bec9c2]/30 text-[#131b2e]"
            />
            <button
              onClick={handleAddTimeline}
              className="px-3.5 py-1.5 bg-[#eaedff] hover:bg-[#005f45] hover:text-white text-[#131b2e] text-[12px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Right 5 cols: Provisions & Gear Manifest */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#bec9c2]/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f2f3ff]">
              <h3 className="text-[17px] font-bold text-[#131b2e]">
                Provisions & Packing Manifest
              </h3>
              <button
                onClick={onEditProvisions}
                className="text-[12px] font-bold text-[#005f45] hover:underline cursor-pointer"
              >
                Modify
              </button>
            </div>

            {/* Food items summary */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#3e4943] uppercase tracking-wider block">
                Confirmed Refreshments
              </span>
              <div className="space-y-1.5">
                {Object.entries(selectedFoodQuantities).map(([id, qty]) => {
                  if (qty <= 0) return null;
                  const item = MOCK_FOOD_ITEMS.find((f) => f.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-[13px]">
                      <span className="text-[#131b2e] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#005f45]" />
                        <span>{item.name}</span>
                        <strong className="text-[#005f45]">×{qty}</strong>
                      </span>
                      <span className="font-mono text-[#3e4943] font-semibold">
                        ${item.price * qty}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gear summary */}
            <div className="pt-2 border-t border-[#bec9c2]/20 space-y-2">
              <span className="text-[11px] font-bold text-[#3e4943] uppercase tracking-wider block">
                Equipment Checklist
              </span>
              <div className="space-y-1.5">
                {Object.entries(gearStatus).map(([id, status]) => {
                  if (status === 'none') return null;
                  const gear = MOCK_GEAR_ITEMS.find((g) => g.id === id);
                  if (!gear) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-[13px]">
                      <span className="text-[#131b2e] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#005f45]" />
                        <span>{gear.name}</span>
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        status === 'renting' ? 'bg-[#fea619]/20 text-[#684000]' : 'bg-[#eaedff] text-[#131b2e]'
                      }`}>
                        {status === 'renting' ? `Locker ($${gear.rentalPrice})` : 'Bringing'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="pt-3 border-t border-[#bec9c2]/20 space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-[13px] font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#005f45]" /> : <Copy className="w-4 h-4 text-[#005f45]" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Plan URL'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full py-2 bg-white hover:bg-[#faf8ff] border border-[#bec9c2]/30 text-[#3e4943] text-[12px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Outing Brief</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#bec9c2]/30 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-[#bec9c2]/20 pb-3">
              <h3 className="text-[18px] font-bold text-[#131b2e] flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#005f45]" />
                <span>Share Picnic Invitation</span>
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-7 h-7 rounded-full bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold text-[14px] hover:bg-[#dae2fd]"
              >
                ✕
              </button>
            </div>

            <p className="text-[13px] text-[#3e4943]">
              Send this invitation message to your friends on WhatsApp, Telegram, or group chat:
            </p>

            <div className="bg-[#faf8ff] p-4 rounded-xl border border-[#bec9c2]/30 text-[13px] font-mono text-[#131b2e] whitespace-pre-line leading-relaxed">
              {shareText}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex-1 py-3 bg-[#005f45] text-white font-bold text-[14px] rounded-xl hover:bg-[#137a5b] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Message'}</span>
              </button>

              <button
                onClick={() => {
                  const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                  window.open(url, '_blank');
                }}
                className="px-4 py-3 bg-[#fea619] text-[#684000] font-bold text-[14px] rounded-xl hover:bg-[#855300] hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
