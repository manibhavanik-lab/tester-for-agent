import React, { useState } from 'react';
import { Spot, FoodItem, GearItem, MOCK_FOOD_ITEMS, MOCK_GEAR_ITEMS } from '../data/mockData';
import { 
  ShoppingBag, 
  Utensils, 
  Layers, 
  Plus, 
  Minus, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Store,
  Flame,
  Info,
  Package
} from 'lucide-react';

interface ScreenFoodGearProps {
  selectedSpot: Spot;
  selectedFoodQuantities: Record<string, number>;
  onUpdateFoodQuantity: (id: string, delta: number) => void;
  gearStatus: Record<string, 'bringing' | 'renting' | 'none'>;
  onUpdateGearStatus: (id: string, status: 'bringing' | 'renting' | 'none') => void;
  onBackToSpot: () => void;
  onProceedToReview: () => void;
}

export const ScreenFoodGear: React.FC<ScreenFoodGearProps> = ({
  selectedSpot,
  selectedFoodQuantities,
  onUpdateFoodQuantity,
  gearStatus,
  onUpdateGearStatus,
  onBackToSpot,
  onProceedToReview,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'basket' | 'bites' | 'drinks' | 'bbq'>('all');
  const [activeTab, setActiveTab] = useState<'food' | 'gear'>('food');

  const filteredFood = MOCK_FOOD_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Calculate totals
  const totalFoodCost = MOCK_FOOD_ITEMS.reduce((sum, item) => {
    const qty = selectedFoodQuantities[item.id] || 0;
    return sum + item.price * qty;
  }, 0);

  const totalGearCost = MOCK_GEAR_ITEMS.reduce((sum, item) => {
    const status = gearStatus[item.id];
    if (status === 'renting') {
      return sum + item.rentalPrice;
    }
    return sum;
  }, 0);

  const totalCost = totalFoodCost + totalGearCost;
  const foodItemsCount = Object.values(selectedFoodQuantities).reduce((a, b) => a + b, 0);
  const gearRentalCount = Object.values(gearStatus).filter((s) => s === 'renting').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bec9c2]/20 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#005f45] text-[12px] font-bold uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Stage 3 · Curated Provisions & Gear Logistics</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#131b2e] tracking-tight">
            Picnic Provisions & Gear Checklist
          </h1>
          <p className="text-[14px] text-[#3e4943] mt-1">
            Optimized for pickup near <strong className="text-[#005f45]">{selectedSpot.name}</strong> · 2 Verified Hubs within 1km.
          </p>
        </div>

        {/* Tab switcher: Food vs Gear */}
        <div className="flex items-center gap-1 bg-[#eaedff] p-1 rounded-xl shrink-0 self-start md:self-auto border border-[#bec9c2]/30">
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'food'
                ? 'bg-[#005f45] text-white shadow-xs'
                : 'text-[#3e4943] hover:text-[#131b2e]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Food & Refreshments</span>
            {foodItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#fea619] text-[#684000] text-[10px] flex items-center justify-center font-extrabold">
                {foodItemsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('gear')}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gear'
                ? 'bg-[#005f45] text-white shadow-xs'
                : 'text-[#3e4943] hover:text-[#131b2e]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Outing Gear & Mats</span>
            {gearRentalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#9af5ce] text-[#002116] text-[10px] flex items-center justify-center font-extrabold">
                {gearRentalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Interactive catalog */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'food' ? (
            <>
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 pb-1">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'basket', label: 'Picnic Platters' },
                  { id: 'bites', label: 'Grazing Bites' },
                  { id: 'drinks', label: 'Cold Drinks' },
                  { id: 'bbq', label: 'BBQ Packs' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#005f45] text-white shadow-xs'
                        : 'bg-white text-[#3e4943] border border-[#bec9c2]/30 hover:bg-[#eaedff]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Food List */}
              <div className="space-y-3">
                {filteredFood.map((food) => {
                  const qty = selectedFoodQuantities[food.id] || 0;
                  return (
                    <div
                      key={food.id}
                      className="bg-white rounded-xl p-4 border border-[#bec9c2]/20 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 justify-between"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[16px] font-bold text-[#131b2e]">
                            {food.name}
                          </h3>
                        </div>
                        <p className="text-[13px] text-[#3e4943] leading-relaxed">
                          {food.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#3e4943]">
                          <span className="font-semibold text-[#005f45] bg-[#eaedff] px-2 py-0.5 rounded">
                            {food.serves}
                          </span>
                          <span className="flex items-center gap-1">
                            <Store className="w-3 h-3 text-[#3e4943]" />
                            {food.vendor} ({food.distance})
                          </span>
                          {food.dietary.map((d, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-[#f2f3ff] text-[#006042] font-semibold border border-[#bec9c2]/20"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#bec9c2]/15">
                        <span className="text-[18px] font-extrabold text-[#131b2e] font-mono">
                          ${food.price}
                        </span>

                        {qty === 0 ? (
                          <button
                            onClick={() => onUpdateFoodQuantity(food.id, 1)}
                            className="px-3.5 py-1.5 bg-[#005f45] text-white text-[12px] font-bold rounded-lg hover:bg-[#137a5b] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Picnic</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-[#f2f3ff] rounded-lg p-1 border border-[#bec9c2]/30">
                            <button
                              onClick={() => onUpdateFoodQuantity(food.id, -1)}
                              className="w-7 h-7 rounded bg-white text-[#131b2e] hover:bg-[#eaedff] flex items-center justify-center font-bold text-[14px] cursor-pointer shadow-xs"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-bold text-[14px] text-[#131b2e] font-mono">
                              {qty}
                            </span>
                            <button
                              onClick={() => onUpdateFoodQuantity(food.id, 1)}
                              className="w-7 h-7 rounded bg-[#005f45] text-white hover:bg-[#137a5b] flex items-center justify-center font-bold text-[14px] cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Gear Tab */
            <div className="space-y-3">
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#bec9c2]/20 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#005f45] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#3e4943] leading-relaxed">
                  Mark items you plan to bring from home, or rent hassle-free from our automated pickup locker stationed at the park entrance.
                </p>
              </div>

              {MOCK_GEAR_ITEMS.map((gear) => {
                const currentStatus = gearStatus[gear.id] || 'none';

                return (
                  <div
                    key={gear.id}
                    className="bg-white rounded-xl p-4 border border-[#bec9c2]/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#005f45] text-[20px]">
                          {gear.icon}
                        </span>
                        <h4 className="text-[15px] font-bold text-[#131b2e]">
                          {gear.name}
                        </h4>
                        {gear.essential && (
                          <span className="text-[10px] font-extrabold bg-[#fea619]/30 text-[#684000] px-1.5 py-0.5 rounded">
                            Essential
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#3e4943]">
                        {gear.description}
                      </p>
                    </div>

                    {/* Status segmented buttons */}
                    <div className="flex items-center gap-1 bg-[#eaedff] p-1 rounded-lg shrink-0">
                      <button
                        onClick={() => onUpdateGearStatus(gear.id, 'bringing')}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                          currentStatus === 'bringing'
                            ? 'bg-[#005f45] text-white shadow-xs'
                            : 'text-[#3e4943] hover:text-[#131b2e]'
                        }`}
                      >
                        I'll Bring
                      </button>
                      <button
                        onClick={() => onUpdateGearStatus(gear.id, 'renting')}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                          currentStatus === 'renting'
                            ? 'bg-[#fea619] text-[#684000] font-bold shadow-xs'
                            : 'text-[#3e4943] hover:text-[#131b2e]'
                        }`}
                      >
                        Rent (${gear.rentalPrice})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 5 cols: Outing Cart & Summary */}
        <aside className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-xl border border-[#bec9c2]/20 space-y-4">
            <h2 className="text-[17px] font-bold text-[#131b2e] flex items-center justify-between pb-3 border-b border-[#f2f3ff]">
              <span>Outing Manifest Summary</span>
              <span className="text-[12px] font-semibold text-[#005f45]">
                {foodItemsCount + gearRentalCount} Items Configured
              </span>
            </h2>

            {/* Selected food list */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {foodItemsCount === 0 && gearRentalCount === 0 ? (
                <p className="text-[13px] text-[#3e4943] italic py-4 text-center">
                  No provisions or gear rentals selected yet. Select items from the list to build your hamper.
                </p>
              ) : (
                <>
                  {MOCK_FOOD_ITEMS.map((item) => {
                    const qty = selectedFoodQuantities[item.id] || 0;
                    if (qty === 0) return null;
                    return (
                      <div key={item.id} className="flex items-center justify-between text-[13px]">
                        <span className="text-[#131b2e] truncate max-w-[200px]">
                          {item.name} <strong className="text-[#005f45]">×{qty}</strong>
                        </span>
                        <span className="font-mono font-bold text-[#131b2e]">
                          ${item.price * qty}
                        </span>
                      </div>
                    );
                  })}

                  {MOCK_GEAR_ITEMS.map((gear) => {
                    if (gearStatus[gear.id] !== 'renting') return null;
                    return (
                      <div key={gear.id} className="flex items-center justify-between text-[13px]">
                        <span className="text-[#131b2e] truncate max-w-[200px]">
                          Rental: {gear.name}
                        </span>
                        <span className="font-mono font-bold text-[#131b2e]">
                          ${gear.rentalPrice}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Subtotals */}
            <div className="pt-3 border-t border-[#bec9c2]/20 space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#3e4943]">
                <span>Food Provisions:</span>
                <span className="font-mono font-bold">${totalFoodCost}</span>
              </div>
              <div className="flex justify-between text-[#3e4943]">
                <span>Gear Locker Rentals:</span>
                <span className="font-mono font-bold">${totalGearCost}</span>
              </div>
              <div className="flex justify-between text-[16px] font-extrabold text-[#131b2e] pt-2 border-t border-[#bec9c2]/20">
                <span>Total Estimated Cost:</span>
                <span className="text-[#005f45] font-mono">${totalCost}</span>
              </div>
            </div>

            {/* Pickup Spot Details */}
            <div className="p-3 bg-[#f2f3ff] rounded-lg text-[12px] space-y-1 border border-[#bec9c2]/20">
              <span className="font-bold text-[#131b2e] block">Locker Pickup Station:</span>
              <span className="text-[#3e4943] block">
                {selectedSpot.name} • Visitor Centre Locker Bay A
              </span>
              <span className="text-[#006042] font-semibold block">
                Ready 30 mins before scheduled picnic time
              </span>
            </div>

            {/* Navigation buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={onProceedToReview}
                className="w-full py-3.5 px-4 bg-[#005f45] hover:bg-[#137a5b] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#005f45]/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Proceed to Itinerary Review</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onBackToSpot}
                className="w-full py-2 text-[13px] font-semibold text-[#3e4943] hover:text-[#131b2e] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Spot Selection</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
