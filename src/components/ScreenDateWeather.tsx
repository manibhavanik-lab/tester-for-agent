import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ScreenDateWeatherProps {
  selectedDate: string;
  onChangeDate: (date: string) => void;
  selectedTimeSlot: string;
  onChangeTimeSlot: (slot: string) => void;
  partySize: number;
  onChangePartySize: (size: number) => void;
  occasion: string;
  onChangeOccasion: (occ: string) => void;
  onContinue: () => void;
}

export const ScreenDateWeather: React.FC<ScreenDateWeatherProps> = ({
  selectedDate,
  onChangeDate,
  selectedTimeSlot,
  onChangeTimeSlot,
  partySize,
  onChangePartySize,
  occasion,
  onChangeOccasion,
  onContinue,
}) => {
  const [rainGuardActive, setRainGuardActive] = useState(true);

  const datePresets = [
    { label: 'Today (Wed, Oct 1)', value: '2025-10-01', risk: '10%' },
    { label: 'Tomorrow (Thu, Oct 2)', value: '2025-10-02', risk: '15%' },
    { label: 'This Saturday (Oct 4)', value: '2025-10-04', risk: '15%', recommended: true },
    { label: 'This Sunday (Oct 5)', value: '2025-10-05', risk: '25%' },
  ];

  const timeSlots = [
    {
      id: 'morning',
      label: 'Morning Gentle Breeze',
      time: '08:30 – 11:30',
      temp: '26°C',
      rainRisk: '5%',
      uv: '4 (Moderate)',
      wind: '12 km/h East',
      desc: 'Cool morning grass, dewy air, serene bird song, ideal for quiet reading & brunch.',
    },
    {
      id: 'afternoon',
      label: 'Afternoon Canopy Shade',
      time: '14:30 – 18:00',
      temp: '29°C',
      rainRisk: '15%',
      uv: '7 (High - Seek Shade)',
      wind: '18 km/h River Gusts',
      desc: 'Optimal picnic window under heavy rain-tree canopies or sheltered pavilion.',
      recommended: true,
    },
    {
      id: 'sunset',
      label: 'Golden Hour Sunset',
      time: '17:00 – 20:30',
      temp: '28°C',
      rainRisk: '20%',
      uv: '2 (Low)',
      wind: '16 km/h Cooling Breeze',
      desc: 'Magical ambient golden lighting, skyline silhouettes, cooler ground.',
    },
  ];

  const occasions = [
    { id: 'casual', label: 'Casual Outing', icon: '🧺', desc: 'Chill friends gathering' },
    { id: 'birthday', label: 'Birthday Celebration', icon: '🎂', desc: 'Decorations & cake' },
    { id: 'romantic', label: 'Romantic Date', icon: '✨', desc: 'Duo intimate setup' },
    { id: 'family', label: 'Family & Kids', icon: '🎈', desc: 'Playgrounds & space' },
    { id: 'pets', label: 'Dog Meetup', icon: '🐾', desc: 'Open off-leash zones' },
  ];

  // 24hr hourly forecast bar data
  const hourlyData = [
    { hour: '09:00', temp: 26, rainProb: 5 },
    { hour: '11:00', temp: 28, rainProb: 10 },
    { hour: '13:00', temp: 31, rainProb: 20 },
    { hour: '15:00', temp: 30, rainProb: 15 },
    { hour: '17:00', temp: 28, rainProb: 15 },
    { hour: '19:00', temp: 27, rainProb: 10 },
    { hour: '21:00', temp: 26, rainProb: 5 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#bec9c2]/20 pb-4">
        <div className="flex items-center gap-1.5 text-[#005f45] text-[12px] font-bold uppercase tracking-wider mb-1">
          <CalendarIcon className="w-4 h-4" />
          <span>Stage 1 · Meteorological Timing & Group Configuration</span>
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131b2e] tracking-tight">
          Select Outing Date & Weather Window
        </h1>
        <p className="text-[15px] text-[#3e4943] mt-1 max-w-3xl">
          PicnicGo synchronizes live satellite rain risk radar, heat indexes, and park shade telemetry to recommend the safest time slots for your gathering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Date Picker Section */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#bec9c2]/20 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#005f45]" />
                <span>Choose Your Picnic Date</span>
              </label>
              <span className="text-[12px] font-semibold text-[#006042] bg-[#acffd5]/30 px-2.5 py-0.5 rounded-full">
                Live 7-Day Forecast Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {datePresets.map((preset) => {
                const isSelected = selectedDate === preset.value;
                return (
                  <button
                    key={preset.value}
                    onClick={() => onChangeDate(preset.value)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#005f45] bg-[#9af5ce]/15 ring-2 ring-[#005f45]'
                        : 'border-[#bec9c2]/30 hover:border-[#005f45]/50 bg-[#faf8ff]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#131b2e]">
                        {preset.label}
                      </span>
                      {preset.recommended && (
                        <span className="px-1.5 py-0.5 bg-[#fea619] text-[#684000] text-[10px] font-extrabold rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[12px]">
                      <span className="text-[#3e4943]">Rain Probability:</span>
                      <span className="font-bold text-[#006042]">{preset.risk}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#bec9c2]/20 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#005f45]" />
                <span>Select Picnic Time Window</span>
              </label>
              <span className="text-[12px] text-[#3e4943]">Automated shade calculations</span>
            </div>

            <div className="space-y-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot.id;
                return (
                  <div
                    key={slot.id}
                    onClick={() => onChangeTimeSlot(slot.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#005f45] bg-[#9af5ce]/10 ring-2 ring-[#005f45] shadow-xs'
                        : 'border-[#bec9c2]/30 hover:border-[#005f45]/50 bg-[#faf8ff]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#005f45] bg-[#005f45]'
                              : 'border-[#bec9c2]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                        <span className="text-[15px] font-bold text-[#131b2e]">
                          {slot.label}
                        </span>
                        <span className="text-[12px] font-mono font-semibold bg-[#eaedff] px-2 py-0.5 rounded text-[#131b2e]">
                          {slot.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[12px]">
                        <span className="flex items-center gap-1 text-[#3e4943]">
                          <Thermometer className="w-3.5 h-3.5 text-[#fea619]" />
                          <strong>{slot.temp}</strong>
                        </span>
                        <span className="flex items-center gap-1 text-[#006042] font-semibold">
                          <CloudRain className="w-3.5 h-3.5" />
                          {slot.rainRisk} Risk
                        </span>
                      </div>
                    </div>

                    <p className="text-[13px] text-[#3e4943] mt-2 pl-7 leading-relaxed">
                      {slot.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group Size & Occasion */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#bec9c2]/20 space-y-4">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Party Size */}
              <div>
                <label className="text-[14px] font-bold text-[#131b2e] flex items-center gap-1.5 mb-2">
                  <Users className="w-4 h-4 text-[#005f45]" />
                  <span>Number of Guests:</span>
                  <span className="text-[#005f45] font-extrabold text-[16px]">{partySize} pax</span>
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="range"
                    min={2}
                    max={35}
                    value={partySize}
                    onChange={(e) => onChangePartySize(Number(e.target.value))}
                    className="w-full accent-[#005f45] cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#3e4943] mt-1 font-mono">
                  <span>2 (Duo)</span>
                  <span>15 (Standard Pavilion)</span>
                  <span>35 (Large Group)</span>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="text-[14px] font-bold text-[#131b2e] flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-[#fea619]" />
                  <span>Occasion Type</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {occasions.map((occ) => (
                    <button
                      key={occ.id}
                      onClick={() => onChangeOccasion(occ.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                        occasion === occ.id
                          ? 'bg-[#005f45] text-white font-bold shadow-xs'
                          : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                      }`}
                    >
                      <span>{occ.icon}</span>
                      <span>{occ.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Live Microclimate Radar Widget */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-xl border border-[#bec9c2]/20 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#f2f3ff]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#9af5ce] text-[#005f45] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-[#005f45]" />
                </span>
                <div>
                  <span className="text-[11px] font-bold text-[#3e4943] uppercase tracking-wider block">
                    Meteorological Telemetry
                  </span>
                  <span className="text-[15px] font-bold text-[#131b2e]">
                    Singapore Island Microclimate
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#acffd5]/40 text-[#006042] text-[11px] font-bold">
                Optimal
              </span>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] block">Ambient Temp</span>
                <span className="text-[20px] font-extrabold text-[#131b2e]">29°C</span>
                <span className="text-[11px] text-[#006042] block">Feels like 31°C</span>
              </div>
              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] block">Rain Risk</span>
                <span className="text-[20px] font-extrabold text-[#006042]">15%</span>
                <span className="text-[11px] text-[#3e4943] block">Isolated passing cell</span>
              </div>
              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] block">UV Index</span>
                <span className="text-[20px] font-extrabold text-[#fea619]">7 High</span>
                <span className="text-[11px] text-[#3e4943] block">Tree canopy recommended</span>
              </div>
              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
                <span className="text-[11px] text-[#3e4943] block">Wind Velocity</span>
                <span className="text-[20px] font-extrabold text-[#131b2e]">18 km/h</span>
                <span className="text-[11px] text-[#006042] block">Fresh river gust</span>
              </div>
            </div>

            {/* 24h Hourly Rain Prob Bar Chart */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-lg border border-[#bec9c2]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#131b2e]">
                  Precipitation Probability (Next 12 Hours)
                </span>
                <span className="text-[11px] text-[#3e4943]">NEA Telemetry</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 items-end h-24 pt-2">
                {hourlyData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-[#006042]">
                      {item.rainProb}%
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        item.rainProb <= 10
                          ? 'bg-[#9af5ce]'
                          : item.rainProb <= 20
                          ? 'bg-[#137a5b]'
                          : 'bg-[#fea619]'
                      }`}
                      style={{ height: `${Math.max(item.rainProb * 2, 8)}px` }}
                    />
                    <span className="text-[9px] font-mono text-[#3e4943]">
                      {item.hour}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rain Guard Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#faf8ff] rounded-lg border border-[#bec9c2]/20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#005f45]" />
                <div>
                  <span className="text-[12px] font-bold text-[#131b2e] block">
                    Automatic Rain Guard Relocation
                  </span>
                  <span className="text-[11px] text-[#3e4943]">
                    Filters spots with immediate sheltered pavilions
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={rainGuardActive}
                onChange={(e) => setRainGuardActive(e.target.checked)}
                className="w-4 h-4 accent-[#005f45] cursor-pointer"
              />
            </div>

            {/* Advance to Step 2 */}
            <button
              onClick={onContinue}
              className="w-full py-3.5 px-4 bg-[#005f45] hover:bg-[#137a5b] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#005f45]/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Continue to Spot & Shelter Discovery</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
