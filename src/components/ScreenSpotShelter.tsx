import React, { useState } from 'react';
import { Spot } from '../data/mockData';
import { 
  Check, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Umbrella, 
  Waves, 
  Trees, 
  Compass, 
  Flame, 
  Dog, 
  Coffee, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Users, 
  Plus, 
  Search,
  Maximize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ScreenSpotShelterProps {
  spots: Spot[];
  selectedSpot: Spot;
  onSelectSpot: (spot: Spot) => void;
  onConfirmSpot: () => void;
  onOpenGeoClusterModal: () => void;
  onSaveToDrafts: (spot: Spot) => void;
  onShareSpot: (spot: Spot) => void;
}

export const ScreenSpotShelter: React.FC<ScreenSpotShelterProps> = ({
  spots,
  selectedSpot,
  onSelectSpot,
  onConfirmSpot,
  onOpenGeoClusterModal,
  onSaveToDrafts,
  onShareSpot,
}) => {
  // Filter states
  const [filterShelter, setFilterShelter] = useState(true);
  const [filterRestroom, setFilterRestroom] = useState(true);
  const [filterBbq, setFilterBbq] = useState(false);
  const [filterDog, setFilterDog] = useState(false);
  const [filterWater, setFilterWater] = useState(true);
  const [filterLawn, setFilterLawn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [mapZoom, setMapZoom] = useState(250);

  // Filter logic
  const filteredSpots = spots.filter((spot) => {
    if (filterShelter && !spot.hasShelter) return false;
    if (filterRestroom && !spot.hasRestroomNear) return false;
    if (filterBbq && !spot.isBbqAllowed) return false;
    if (filterDog && !spot.isDogFriendly) return false;
    if (filterWater && !spot.hasWaterView) return false;
    if (filterLawn && !spot.hasLawn) return false;
    if (selectedRegion !== 'All' && spot.region !== selectedRegion) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        spot.name.toLowerCase().includes(q) ||
        spot.zone.toLowerCase().includes(q) ||
        spot.shortDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getMaterialOrLucideIcon = (iconName: string) => {
    switch (iconName) {
      case 'umbrella':
        return <Umbrella className="w-4 h-4 text-[#005f45]" />;
      case 'water':
      case 'water_full':
      case 'water_drop':
      case 'waves':
        return <Waves className="w-4 h-4 text-[#006042]" />;
      case 'wc':
        return <span className="material-symbols-outlined text-[15px] text-[#855300]">wc</span>;
      case 'outdoor_grill':
        return <Flame className="w-4 h-4 text-[#fea619]" />;
      case 'pets':
        return <Dog className="w-4 h-4 text-[#005f45]" />;
      case 'park':
        return <Trees className="w-4 h-4 text-[#006042]" />;
      case 'local_cafe':
        return <Coffee className="w-4 h-4 text-[#855300]" />;
      case 'accessible':
        return <span className="material-symbols-outlined text-[15px] text-[#005f45]">accessible</span>;
      case 'delete':
        return <span className="material-symbols-outlined text-[15px] text-[#005f45]">delete</span>;
      case 'local_parking':
        return <span className="material-symbols-outlined text-[15px] text-[#005f45]">local_parking</span>;
      default:
        return <span className="material-symbols-outlined text-[15px]">{iconName}</span>;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Page Header */}
      <header className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#005f45] text-[12px] font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[18px]">nature_people</span>
              <span>Geotagged Park Spatial Engine</span>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131b2e] tracking-tight leading-tight">
              Explore & Select Your Picnic Spot
            </h1>
            <p className="text-[15px] text-[#3e4943] mt-1 max-w-3xl">
              Filter verified scenic grounds, reservable sheltered pavilions, and BBQ amenity spots based on your weather profile.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[13px] text-[#3e4943]">
              Showing: <strong className="text-[#131b2e] font-bold">{filteredSpots.length} Prime Candidates</strong>
            </span>
            <button
              onClick={onOpenGeoClusterModal}
              className="px-3.5 py-1.5 bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] text-[13px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#bec9c2]/30"
            >
              <Compass className="w-4 h-4 text-[#005f45]" />
              <span>View Geo Cluster</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter & Amenity Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto bg-white rounded-xl p-4 shadow-xs border border-[#bec9c2]/20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#3e4943] uppercase tracking-wider mr-1">
                Must-Haves:
              </span>

              {/* Filter Chip 1 */}
              <button
                onClick={() => setFilterShelter(!filterShelter)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  filterShelter
                    ? 'bg-[#005f45] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <Umbrella className="w-3.5 h-3.5" />
                <span>Sheltered Pavilion (Rain Safe)</span>
              </button>

              {/* Filter Chip 2 */}
              <button
                onClick={() => setFilterRestroom(!filterRestroom)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  filterRestroom
                    ? 'bg-[#005f45] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">wc</span>
                <span>Restroom nearby (&lt;100m)</span>
              </button>

              {/* Filter Chip 3 */}
              <button
                onClick={() => setFilterBbq(!filterBbq)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  filterBbq
                    ? 'bg-[#005f45] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>BBQ Pit On-site</span>
              </button>

              {/* Filter Chip 4 */}
              <button
                onClick={() => setFilterDog(!filterDog)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  filterDog
                    ? 'bg-[#005f45] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <Dog className="w-3.5 h-3.5" />
                <span>Dog-friendly Run</span>
              </button>

              {/* Filter Chip 5 */}
              <button
                onClick={() => setFilterWater(!filterWater)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  filterWater
                    ? 'bg-[#005f45] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <Waves className="w-3.5 h-3.5" />
                <span>Scenic Water View</span>
              </button>

              {/* Filter Chip 6 */}
              <button
                onClick={() => setFilterLawn(!filterLawn)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  filterLawn
                    ? 'bg-[#005f45] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <Trees className="w-3.5 h-3.5" />
                <span>Lawn Seating Area</span>
              </button>
            </div>

            {/* Rain Guard Indicator */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[12px] font-semibold text-[#006042] flex items-center gap-1 bg-[#f2f3ff] px-3 py-1.5 rounded-md border border-[#acffd5]/40">
                <ShieldCheck className="w-4 h-4 text-[#005f45]" />
                <span>24h Rain Guard Auto-Filtered</span>
              </span>
            </div>
          </div>

          {/* Search & Region secondary row */}
          <div className="pt-2 border-t border-[#bec9c2]/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-1 text-[12px] font-medium text-[#3e4943] overflow-x-auto w-full sm:w-auto">
              <span className="text-[#3e4943] shrink-0 mr-1 font-bold text-[11px] uppercase">Region:</span>
              {['All', 'Central', 'East', 'South'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-md text-[12px] font-medium cursor-pointer transition-colors ${
                    selectedRegion === reg
                      ? 'bg-[#005f45]/15 text-[#005f45] font-bold'
                      : 'text-[#3e4943] hover:text-[#131b2e]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3e4943]" />
              <input
                type="text"
                placeholder="Search park or pavilion name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-[13px] bg-[#f2f3ff] rounded-lg border border-[#bec9c2]/30 focus:outline-hidden focus:ring-1 focus:ring-[#005f45] text-[#131b2e] placeholder:text-[#3e4943]/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Content: Left Cards Grid / Right Live Spot Inspector */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Spot Discovery Grid (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            {filteredSpots.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-[#bec9c2]/30 space-y-3">
                <p className="text-[16px] font-bold text-[#131b2e]">No parks match all selected filters.</p>
                <p className="text-[13px] text-[#3e4943]">Try loosening your must-haves or switching to "All" regions.</p>
                <button
                  onClick={() => {
                    setFilterBbq(false);
                    setFilterDog(false);
                    setSelectedRegion('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#005f45] text-white text-[13px] font-semibold rounded-lg hover:bg-[#137a5b] transition-colors"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              filteredSpots.map((spot) => {
                const isSelected = selectedSpot.id === spot.id;

                return (
                  <article
                    key={spot.id}
                    onClick={() => onSelectSpot(spot)}
                    className={`relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                      isSelected
                        ? 'ring-2 ring-[#005f45] shadow-md border-transparent'
                        : 'shadow-xs hover:shadow-md border-[#bec9c2]/25'
                    }`}
                  >
                    {/* Top Left: Selected Spot Badge */}
                    {isSelected && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#005f45] text-white font-bold text-[11px] shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5 fill-white text-[#005f45]" />
                          <span>Selected Spot</span>
                        </span>
                      </div>
                    )}

                    {/* Top Right: Rating Pill */}
                    <div className="absolute top-3 right-3 z-10 flex gap-1">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[#005f45] text-[12px] font-bold flex items-center gap-1 shadow-xs border border-[#bec9c2]/20">
                        <Star className="w-3.5 h-3.5 fill-[#fea619] text-[#fea619]" />
                        <span>
                          {spot.rating} ({spot.reviewsCount})
                        </span>
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-12 h-full">
                      {/* Spot Image */}
                      <div className="sm:col-span-5 relative h-52 sm:h-auto min-h-[190px] bg-[#eaedff]">
                        <img
                          src={spot.imageUrl}
                          alt={spot.altText}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden"></div>
                        <span className="sm:hidden absolute bottom-2 left-3 text-white font-bold text-[13px] drop-shadow-sm">
                          {spot.shortName}
                        </span>
                      </div>

                      {/* Spot Body Details */}
                      <div className="sm:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[#3e4943] text-[12px] font-medium mb-1">
                            <span>{spot.zone}</span>
                            <span className="inline-flex items-center gap-1.5 text-[#006042] font-bold">
                              <span className="w-2 h-2 rounded-full bg-[#006042] animate-pulse"></span>
                              <span>{spot.rainHazardText}</span>
                            </span>
                          </div>

                          <h3 className="text-[18px] sm:text-[19px] font-bold text-[#131b2e] leading-snug">
                            {spot.name}
                          </h3>

                          <p className="text-[13px] text-[#3e4943] mt-1.5 line-clamp-2 leading-relaxed">
                            {spot.shortDesc}
                          </p>

                          {/* Tags / Micro Badges */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {spot.microBadges.map((badge, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] text-[11px] font-medium flex items-center gap-1 border border-[#bec9c2]/20"
                              >
                                {getMaterialOrLucideIcon(badge.icon)}
                                <span>{badge.label}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer Metrics */}
                        <div className="mt-4 pt-3 border-t border-[#bec9c2]/15 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[12px]">
                            <div className="flex flex-col">
                              <span className="text-[#3e4943] text-[11px]">Capacity</span>
                              <span className="text-[#131b2e] font-bold text-[13px]">
                                {spot.capacityText}
                              </span>
                            </div>
                            <div className="h-6 w-px bg-[#bec9c2]/30"></div>
                            <div className="flex flex-col">
                              <span className="text-[#3e4943] text-[11px]">Live Crowd</span>
                              <span className="text-[#005f45] font-bold text-[13px]">
                                {spot.liveCrowdStatus}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectSpot(spot);
                            }}
                            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isSelected
                                ? 'bg-[#005f45] text-white shadow-xs'
                                : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#005f45] hover:text-white'
                            }`}
                          >
                            <span>{isSelected ? 'Selected' : 'Choose Spot'}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}

            {/* Interactive Map Preview Box */}
            <div className="w-full bg-white rounded-xl p-4 shadow-xs border border-[#bec9c2]/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#005f45] text-[20px]">
                    share_location
                  </span>
                  <span className="text-[17px] font-bold text-[#131b2e]">
                    Spatial Radar: Microclimate & Proximity
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#3e4943] bg-[#eaedff] px-2.5 py-0.5 rounded-md">
                    Live NParks Geodata
                  </span>
                  <button
                    onClick={onOpenGeoClusterModal}
                    className="text-[#005f45] hover:text-[#137a5b] text-[12px] font-bold flex items-center gap-0.5"
                    title="Expand full screen interactive cluster"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div
                className="w-full h-64 bg-[#eaedff] rounded-lg overflow-hidden relative border border-[#bec9c2]/30 shadow-inner group"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-aFMo0NFnIYubKlqcirIe1JdFG68eJyZyDAyovHWFl2QnQt_j3UK7bK87eA8vdz-v1lo2mVy1I9f-xlhNyJYPXLYPdcxnmzc7VtfTT8rHDGrdWr7wfcKP29Kv1byr40Of6Zq_UQdmxRfxpW1xAmVK2BAt7Fb7EP5QjSDQoAFJhx38XnjHOxFUNPMCgGnIoBO2Pqf-2Erga6sI5m9OnI22ol-moH-jr8Ie7WeT8KEMXQhaV4ECZGz9')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-[#005f45]/10 pointer-events-none"></div>

                {/* Spot Markers placed dynamically on the radar */}
                {spots.map((s) => {
                  const isMarkerActive = s.id === selectedSpot.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => onSelectSpot(s)}
                      style={{
                        top: `${s.mapCoords.topPercent}%`,
                        left: `${s.mapCoords.leftPercent}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-md cursor-pointer ${
                        isMarkerActive
                          ? 'bg-white text-[#131b2e] ring-2 ring-[#005f45] scale-110'
                          : 'bg-white/85 backdrop-blur text-[#3e4943] hover:bg-white hover:scale-105'
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isMarkerActive ? 'bg-[#005f45] animate-ping' : 'bg-[#137a5b]'
                        }`}
                      />
                      <span>{s.shortName}</span>
                      {isMarkerActive && (
                        <span className="px-1 py-0.2 bg-[#9af5ce] text-[#002116] rounded text-[9px] font-extrabold uppercase">
                          Targeted
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Floating Map Controls */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 z-20">
                  <button
                    onClick={() => setMapZoom((prev) => Math.min(prev + 100, 600))}
                    className="w-7 h-7 bg-white rounded-md shadow-sm flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMapZoom((prev) => Math.max(prev - 100, 150))}
                    className="w-7 h-7 bg-white rounded-md shadow-sm flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] transition-colors"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#131b2e] shadow-xs border border-[#bec9c2]/20">
                  Radar Range: {mapZoom}m radius
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: Interactive Spot Inspector & Confirmation Tray (5 cols) */}
          <aside className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden border border-[#bec9c2]/20">
              {/* Subtle decorative sunburst accent */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#fea619]/15 rounded-full blur-2xl pointer-events-none"></div>

              {/* Inspector Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#f2f3ff]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-lg bg-[#9af5ce] text-[#005f45] flex items-center justify-center shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-[#3e4943] uppercase tracking-wider block">
                      Inspecting Selection
                    </span>
                    <span className="text-[15px] font-bold text-[#005f45]">
                      Spot #{selectedSpot.id} Verified
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#acffd5]/30 text-[#006042] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">thunderstorm</span>
                  <span>Zero Flood Risk</span>
                </span>
              </div>

              {/* Spot Title & Description */}
              <div className="pt-4">
                <h2 className="text-[22px] font-extrabold text-[#131b2e] tracking-tight leading-snug">
                  {selectedSpot.name}
                </h2>
                <p className="text-[13px] text-[#3e4943] mt-1.5 leading-relaxed">
                  {selectedSpot.fullDesc}
                </p>
              </div>

              {/* Shelter Dimensions & Specifications Card */}
              <div className="mt-4 bg-[#f2f3ff] p-4 rounded-lg space-y-2.5 border border-[#bec9c2]/20">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#3e4943] flex items-center gap-1.5">
                    <Umbrella className="w-4 h-4 text-[#005f45]" />
                    <span>Covered Pavilion Area</span>
                  </span>
                  <span className="text-[#131b2e] font-bold font-mono">
                    {selectedSpot.pavilionDimensions}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#3e4943] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#005f45]" />
                    <span>Recommended Party Size</span>
                  </span>
                  <span className="text-[#131b2e] font-bold">
                    Up to {selectedSpot.maxGuests} Guests
                  </span>
                </div>

                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#3e4943] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#855300]" />
                    <span>Permit / BBQ Status</span>
                  </span>
                  <span className="text-[#006042] font-bold">
                    {selectedSpot.bbqStatus}
                  </span>
                </div>
              </div>

              {/* Live Amenities Checklist Grid */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider block mb-2">
                  Facilities & Accessibility
                </span>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  {selectedSpot.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#faf8ff] border border-[#bec9c2]/20"
                    >
                      {getMaterialOrLucideIcon(amenity.icon)}
                      <span className="text-[#131b2e] font-medium">{amenity.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crowd Meter Visual */}
              <div className="mt-4 bg-[#faf8ff] p-3 rounded-lg border border-[#bec9c2]/20">
                <div className="flex items-center justify-between mb-1.5 text-[12px]">
                  <span className="text-[#3e4943]">Live Afternoon Occupancy Level</span>
                  <span className="text-[#005f45] font-bold">
                    {selectedSpot.liveCrowdPercent}% Full • Breezy
                  </span>
                </div>
                <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#005f45] h-full rounded-full transition-all duration-500"
                    style={{ width: `${selectedSpot.liveCrowdPercent}%` }}
                  />
                </div>
              </div>

              {/* Action / Flow Continuation */}
              <div className="mt-6 pt-2 space-y-2">
                <button
                  onClick={onConfirmSpot}
                  className="w-full py-3.5 px-4 bg-[#005f45] hover:bg-[#137a5b] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#005f45]/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Confirm Spot & Find Nearby Food/Gear</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-between px-1 pt-1">
                  <button
                    onClick={() => onSaveToDrafts(selectedSpot)}
                    className="text-[12px] font-semibold text-[#3e4943] hover:text-[#005f45] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save to Outing Draft</span>
                  </button>

                  <button
                    onClick={() => onShareSpot(selectedSpot)}
                    className="text-[12px] font-semibold text-[#3e4943] hover:text-[#005f45] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Spot Link</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Weather Assurance Callout */}
            <div className="bg-[#e2e7ff]/70 backdrop-blur rounded-xl p-4 flex items-start gap-3 border border-[#bec9c2]/30">
              <span className="material-symbols-outlined text-[#006042] text-[24px] shrink-0 mt-0.5">
                nest_eco_leaf
              </span>
              <div className="text-[13px] text-[#3e4943] leading-relaxed">
                <span className="font-bold text-[#131b2e] block text-[13px] mb-0.5">
                  Weather Backup Guaranteed
                </span>
                If afternoon rain exceeds 40%, the system automatically flags sheltered tables at{' '}
                <strong className="text-[#005f45]">{selectedSpot.pavilionName}</strong> for instant covered relocation without canceling your plan.
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
