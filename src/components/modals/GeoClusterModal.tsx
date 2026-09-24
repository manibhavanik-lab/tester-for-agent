import React, { useState } from 'react';
import { Spot } from '../../data/mockData';
import { MapPin, X, Compass, Check, ShieldCheck, Sun, Wind, Umbrella } from 'lucide-react';

interface GeoClusterModalProps {
  isOpen: boolean;
  onClose: () => void;
  spots: Spot[];
  selectedSpot: Spot;
  onSelectSpot: (spot: Spot) => void;
}

export const GeoClusterModal: React.FC<GeoClusterModalProps> = ({
  isOpen,
  onClose,
  spots,
  selectedSpot,
  onSelectSpot,
}) => {
  if (!isOpen) return null;

  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[#bec9c2]/30">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#bec9c2]/20 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#005f45] text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-[18px] font-bold text-[#131b2e]">
                Singapore Geotagged Park Radar & Microclimates
              </h2>
              <p className="text-[12px] text-[#3e4943]">
                Live overlay of shelter capacities, rainfall radar fronts, and active park clusters.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] flex items-center justify-center font-bold text-[14px] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Map + Spot Cards */}
        <div className="grid lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Map Area (8 cols) */}
          <div className="lg:col-span-8 relative min-h-[350px] lg:min-h-[500px] bg-[#eaedff]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-aFMo0NFnIYubKlqcirIe1JdFG68eJyZyDAyovHWFl2QnQt_j3UK7bK87eA8vdz-v1lo2mVy1I9f-xlhNyJYPXLYPdcxnmzc7VtfTT8rHDGrdWr7wfcKP29Kv1byr40Of6Zq_UQdmxRfxpW1xAmVK2BAt7Fb7EP5QjSDQoAFJhx38XnjHOxFUNPMCgGnIoBO2Pqf-2Erga6sI5m9OnI22ol-moH-jr8Ie7WeT8KEMXQhaV4ECZGz9')",
              }}
            >
              <div className="absolute inset-0 bg-[#005f45]/10 pointer-events-none"></div>

              {/* Dynamic Map Pins */}
              {spots.map((spot) => {
                const isSelected = spot.id === selectedSpot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => onSelectSpot(spot)}
                    style={{
                      top: `${spot.mapCoords.topPercent}%`,
                      left: `${spot.mapCoords.leftPercent}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all shadow-lg cursor-pointer ${
                      isSelected
                        ? 'bg-[#005f45] text-white scale-110 ring-4 ring-white'
                        : 'bg-white text-[#131b2e] hover:scale-105'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelected ? 'bg-white animate-ping' : 'bg-[#005f45]'
                      }`}
                    />
                    <span>{spot.shortName}</span>
                  </button>
                );
              })}

              {/* Rain Front Simulation Pill */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-[#bec9c2]/20 text-[11px] font-medium text-[#131b2e] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006042]"></span>
                <span>Island Cloud Dissipation Window: <strong>Clear 14:00 - 19:30</strong></span>
              </div>
            </div>
          </div>

          {/* Side Spot Selection List (4 cols) */}
          <div className="lg:col-span-4 p-4 overflow-y-auto space-y-3 bg-[#faf8ff] border-l border-[#bec9c2]/20">
            <h3 className="text-[14px] font-bold text-[#131b2e]">Available Park Hubs</h3>

            {spots.map((spot) => {
              const isSelected = spot.id === selectedSpot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => onSelectSpot(spot)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#005f45] ring-2 ring-[#005f45] shadow-xs'
                      : 'bg-white/80 border-[#bec9c2]/30 hover:border-[#005f45]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-[#3e4943] mb-1">
                    <span>{spot.zone}</span>
                    <span className="text-[#006042] font-bold">{spot.rainHazardText}</span>
                  </div>

                  <h4 className="text-[14px] font-bold text-[#131b2e]">
                    {spot.name}
                  </h4>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#bec9c2]/20 text-[11px]">
                    <span className="text-[#3e4943]">{spot.capacityText}</span>
                    <span className="text-[#005f45] font-bold">
                      {isSelected ? 'Targeted' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}

            <button
              onClick={onClose}
              className="w-full mt-4 py-2.5 bg-[#005f45] text-white text-[13px] font-bold rounded-lg hover:bg-[#137a5b] transition-colors cursor-pointer"
            >
              Apply & Close Radar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
