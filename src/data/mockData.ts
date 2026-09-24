export interface Spot {
  id: string;
  name: string;
  shortName: string;
  zone: string;
  region: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  altText: string;
  shortDesc: string;
  fullDesc: string;
  pavilionName: string;
  pavilionDimensions: string;
  shadePercentage: number;
  restroomDistance: string;
  capacityText: string;
  maxGuests: number;
  liveCrowdPercent: number;
  liveCrowdStatus: string;
  rainHazardText: string;
  rainHazardLevel: 'low' | 'moderate' | 'high';
  bbqStatus: string;
  isBbqAllowed: boolean;
  hasShelter: boolean;
  hasRestroomNear: boolean;
  isDogFriendly: boolean;
  hasWaterView: boolean;
  hasLawn: boolean;
  microBadges: Array<{ icon: string; label: string; colorClass?: string }>;
  amenities: Array<{ icon: string; text: string }>;
  mapMarker: string;
  mapCoords: { topPercent: number; leftPercent: number };
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'basket' | 'bites' | 'drinks' | 'dessert' | 'bbq';
  description: string;
  price: number;
  serves: string;
  dietary: string[];
  vendor: string;
  distance: string;
  imageUrl: string;
}

export interface GearItem {
  id: string;
  name: string;
  category: 'comfort' | 'shelter' | 'utility' | 'fun';
  description: string;
  essential: boolean;
  rentalPrice: number;
  icon: string;
}

export const INITIAL_SPOTS: Spot[] = [
  {
    id: "1",
    name: "Bishan-Ang Mo Kio River Lawn (Zone B)",
    shortName: "Zone B River Lawn",
    zone: "Central Region • Bishan-AMK",
    region: "Central",
    rating: 4.9,
    reviewsCount: 128,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHSpupmaoR10JnX9o3e_azahsBvFZnGUimnenIOwWuxfIU7VT1-8V0M0Q7ZoNi4uhIfX4fMJPZXBvjHDCpDUbR1Z75G2mRbsX0h2Joy2UM90GOns0FIekcZfx7A27HGu0y2W2nXdk1NjemErDdbLj8plDkrj0zN9bmNnaAR38GEbBOdO4wD0Zbpp-I7y4tokqSExgoRsuJyJyaXa6bokPzrE44RCeSxrUnqbcTevnY81Pvawa-XG9v",
    altText: "Vibrant Bishan Park green lawn beside an open meandering river channel with wild reeds, clear blue sky with gentle sun rays, and a timber rain pavilion canopy in the distance.",
    shortDesc: "Lush gently sloped riverside grassland flanked by rain garden bioswales and mature rain trees offering broad natural shade.",
    fullDesc: "Features open undulating banks along the Kallang River restoration with immediate shelter fallback at Pavilion 3. Excellent breeze, gentle slopes for picnic mats, and natural shade from grand rain trees.",
    pavilionName: "Sheltered Pavilion 3",
    pavilionDimensions: "14m × 8m (112 m²)",
    shadePercentage: 75,
    restroomDistance: "50m",
    capacityText: "Up to 15 pax",
    maxGuests: 15,
    liveCrowdPercent: 35,
    liveCrowdStatus: "Moderate (35%)",
    rainHazardText: "Low Rain Hazard",
    rainHazardLevel: "low",
    bbqStatus: "No Permit Required (Open Lawn)",
    isBbqAllowed: false,
    hasShelter: true,
    hasRestroomNear: true,
    isDogFriendly: true,
    hasWaterView: true,
    hasLawn: true,
    microBadges: [
      { icon: "roofing", label: "Sheltered Pavilion 3", colorClass: "text-[#005f45]" },
      { icon: "wb_shade", label: "Ample Shade 75%", colorClass: "text-[#006042]" },
      { icon: "wc", label: "Restroom 50m", colorClass: "text-[#855300]" }
    ],
    amenities: [
      { icon: "water_full", text: "Potable Water Tap" },
      { icon: "accessible", text: "Barrier-Free Paved" },
      { icon: "delete", text: "Recycle & Trash Bins" },
      { icon: "local_parking", text: "Carpark B (120m)" }
    ],
    mapMarker: "Bishan Zone B • Pavilion #3",
    mapCoords: { topPercent: 48, leftPercent: 46 }
  },
  {
    id: "2",
    name: "Botanic Gardens Palm Valley & Symphony Stage",
    shortName: "Palm Valley Lawn",
    zone: "Tanglin UNESCO Core",
    region: "Central",
    rating: 4.8,
    reviewsCount: 215,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkxvqdDCbzCc17zAlcYLbxYj60oHqI4-IRyCKnjw6XGn3r5T4ckisb7-S9N0rGwEvSdRJiuKO7JjXV2-cDpczZMzusegCMkw-05kXg-xx0D33CGJgPfp_CTg1a7cAjphuvun4UCecCzAm42cKpBnJpvRZ2HMJfT0Ga8jy99eXqUj40w-DNpH_YGG_cFM6dKLaMvg8TFeCLE7YCB3pew0tF_0dPJ24q6hEHuxkZ7V5aOgMawNwsxhzh",
    altText: "Singapore Botanic Gardens Palm Valley with sprawling hillside grass meadow facing the Shaw Foundation Symphony lake stage, majestic royal palms, tropical warm sunshine.",
    shortDesc: "Gentle natural amphitheater lawn surrounding a serene pond. Features gazebo shelter retreats and adjacent gourmet cafe supplies.",
    fullDesc: "Dramatic royal palm lined grassy slopes overlooking Symphony Lake. Close walking distance to visitor amenities, cold beverage kiosks, and high tree canopy shade throughout mid-day.",
    pavilionName: "Symphony Gazebo",
    pavilionDimensions: "18m × 10m (180 m²)",
    shadePercentage: 65,
    restroomDistance: "75m",
    capacityText: "Up to 25 pax",
    maxGuests: 25,
    liveCrowdPercent: 60,
    liveCrowdStatus: "Active (60%)",
    rainHazardText: "High Canopy Shield",
    rainHazardLevel: "low",
    bbqStatus: "Grills Prohibited (Picnic Mats Only)",
    isBbqAllowed: false,
    hasShelter: true,
    hasRestroomNear: true,
    isDogFriendly: true,
    hasWaterView: true,
    hasLawn: true,
    microBadges: [
      { icon: "roofing", label: "Symphony Gazebo", colorClass: "text-[#005f45]" },
      { icon: "wb_shade", label: "Slope Shading 65%", colorClass: "text-[#006042]" },
      { icon: "local_cafe", label: "Cafe 90m", colorClass: "text-[#855300]" }
    ],
    amenities: [
      { icon: "local_cafe", text: "Cafe Corner (90m)" },
      { icon: "park", text: "Lawn Amphitheater" },
      { icon: "wb_shade", text: "Dense Palm Canopy" },
      { icon: "subway", text: "Botanic MRT (400m)" }
    ],
    mapMarker: "Botanic Gardens • Symphony Slope",
    mapCoords: { topPercent: 60, leftPercent: 38 }
  },
  {
    id: "3",
    name: "East Coast Park Coastal Grove & BBQ Pavilion #14",
    shortName: "Coastal Grove Area C",
    zone: "Eastern Seaboard • Area C4",
    region: "East",
    rating: 4.7,
    reviewsCount: 340,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHN-lxphnjPIAm-AQNgLLtHYwm0anGXUohMTLo6ic-iZh_a9_fXZdalJ-a8KII8czppAFO2mTkH9V9jgPX5jkygAANBZEhTo86XdUykobn5fUBciWu78Qi6dfvlSL5-MoxrmR1TdKe299--a6db4hbhllH2feXzWVMyQ1-LtGImjOecGeAxK_2-ft47OfM1fXU5FWyw4_joKrPXK4cnUyM07mFaNCMflNvOLOVSKIauUKdzpG3Q2B7",
    altText: "East Coast Park coastline park with sea pines leaning in sea breeze, tiled BBQ pavilion structure with picnic benches, blue waters with ships on the horizon, sunny airy outdoor scene.",
    shortDesc: "Direct seafront access with heavy rain canopy shelter, built-in dual brick BBQ grills, wash sink, and bicycle track connectivity.",
    fullDesc: "Refreshing coastal onshore wind with a large brick pavilion shelter, wash sinks, twin barbecue pits, and dedicated sand-play clearing. Ideal for sizzling skewers with sea horizon vistas.",
    pavilionName: "BBQ Pavilion #14",
    pavilionDimensions: "22m × 12m Tiled Roof (264 m²)",
    shadePercentage: 85,
    restroomDistance: "40m",
    capacityText: "Up to 20 pax",
    maxGuests: 20,
    liveCrowdPercent: 20,
    liveCrowdStatus: "Sparse (20%)",
    rainHazardText: "Sea Breeze 18km/h",
    rainHazardLevel: "low",
    bbqStatus: "Pit #14 Permit Pre-Hold Available",
    isBbqAllowed: true,
    hasShelter: true,
    hasRestroomNear: true,
    isDogFriendly: true,
    hasWaterView: true,
    hasLawn: true,
    microBadges: [
      { icon: "outdoor_grill", label: "2x BBQ Pit", colorClass: "text-[#005f45]" },
      { icon: "water_drop", label: "Water Tap 5m", colorClass: "text-[#006042]" },
      { icon: "shelves", label: "Large Pavilion", colorClass: "text-[#005f45]" }
    ],
    amenities: [
      { icon: "outdoor_grill", text: "Dual Charcoal Pits" },
      { icon: "waves", text: "Sea View Frontage" },
      { icon: "wash", text: "Prep Sink on-site" },
      { icon: "pedal_bike", text: "Cycle Track Access" }
    ],
    mapMarker: "East Coast Park • Area C4 Grove",
    mapCoords: { topPercent: 68, leftPercent: 72 }
  },
  {
    id: "4",
    name: "Marina Barrage Rooftop Green & Kite Lawn",
    shortName: "Barrage Sky Meadow",
    zone: "Marina South • Downtown",
    region: "South",
    rating: 4.9,
    reviewsCount: 410,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-aFMo0NFnIYubKlqcirIe1JdFG68eJyZyDAyovHWFl2QnQt_j3UK7bK87eA8vdz-v1lo2mVy1I9f-xlhNyJYPXLYPdcxnmzc7VtfTT8rHDGrdWr7wfcKP29Kv1byr40Of6Zq_UQdmxRfxpW1xAmVK2BAt7Fb7EP5QjSDQoAFJhx38XnjHOxFUNPMCgGnIoBO2Pqf-2Erga6sI5m9OnI22ol-moH-jr8Ie7WeT8KEMXQhaV4ECZGz9",
    altText: "Marina Barrage sloping circular green rooftop overlooking Singapore skyline and Marina Bay waters with kite flyers under sunny open skies.",
    shortDesc: "Sweeping elevated meadow atop the sustainable barrage dam, featuring 360-degree Singapore skyline panoramas and steady coastal headwinds.",
    fullDesc: "An iconic green roof amphitheater ideal for kite flying and breezy sunset picnics. Includes covered visitor gallery shelter beneath the turf slope for instant heavy rainfall protection.",
    pavilionName: "Visitor Center Gallery Foyer",
    pavilionDimensions: "30m × 15m (450 m²)",
    shadePercentage: 40,
    restroomDistance: "30m",
    capacityText: "Up to 35 pax",
    maxGuests: 35,
    liveCrowdPercent: 55,
    liveCrowdStatus: "Vibrant (55%)",
    rainHazardText: "Coastal Gale 20km/h",
    rainHazardLevel: "low",
    bbqStatus: "Open Flame Prohibited",
    isBbqAllowed: false,
    hasShelter: true,
    hasRestroomNear: true,
    isDogFriendly: true,
    hasWaterView: true,
    hasLawn: true,
    microBadges: [
      { icon: "roofing", label: "Covered Foyer 40m", colorClass: "text-[#005f45]" },
      { icon: "waves", label: "Marina Reservoir View", colorClass: "text-[#006042]" },
      { icon: "air", label: "Steady Wind 20km/h", colorClass: "text-[#855300]" }
    ],
    amenities: [
      { icon: "water_full", text: "Filtered Chilled Water" },
      { icon: "accessible", text: "Full Ramp Access" },
      { icon: "storefront", text: "Barrage Gift & Snacks" },
      { icon: "local_parking", text: "Basement Carpark (40m)" }
    ],
    mapMarker: "Marina Barrage • Rooftop Meadow",
    mapCoords: { topPercent: 74, leftPercent: 52 }
  }
];

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: "f1",
    name: "Artisanal Charcuterie & Farmhouse Cheese Platter",
    category: "basket",
    description: "Truffle brie, aged Gouda, prosciutto di Parma, smoked fig jam, artisanal seeded sourdough crackers, green Sicilian olives.",
    price: 38,
    serves: "Serves 3-4 pax",
    dietary: ["Nut-Free Option", "Artisan"],
    vendor: "The Providore Bakery & Deli",
    distance: "650m from Park",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f2",
    name: "Gourmet Japanese Sando & Onigiri Picnic Bento",
    category: "basket",
    description: "Tamago egg-salad sando, chicken katsu sando with bulldog sauce, salmon furikake onigiri, sweet edamame & pickled radish.",
    price: 32,
    serves: "Serves 2-3 pax",
    dietary: ["Halal Certified Kitchen", "Chef Special"],
    vendor: "Kuroshio Sando Atelier",
    distance: "800m from Park",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f3",
    name: "Mediterranean Hummus & Warm Pita Grazing Box",
    category: "bites",
    description: "Smoked paprika hummus, tzatziki, stuffed vine leaves, charred falafel balls, za'atar flatbread chips, and Persian cucumber sticks.",
    price: 24,
    serves: "Serves 4 pax",
    dietary: ["Vegetarian", "Vegan Friendly"],
    vendor: "Cedar Levant Botanics",
    distance: "1.1km from Park",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f4",
    name: "Cold-Brew Botanical Iced Tea Growler (1.5L)",
    category: "drinks",
    description: "Slow-steeped chamomile citrus bloom with lychee pearls & kaffir lime leaves. Served in an insulated reusable jug with ice.",
    price: 18,
    serves: "6 Glasses",
    dietary: ["Caffeine-Free", "Zero Sugar Added"],
    vendor: "Tea & Herb Botanical Lab",
    distance: "450m from Park",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f5",
    name: "Basque Burnt Cheesecake with Fresh Berries",
    category: "dessert",
    description: "Creamy caramelized Spanish cheesecake with molten center, topped with fresh raspberries, blueberries, and mint.",
    price: 22,
    serves: "4-6 Slices",
    dietary: ["Vegetarian", "Gluten-Free Flour"],
    vendor: "Flour & Butter Confectionery",
    distance: "900m from Park",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f6",
    name: "Premium Marinated Satay Skewers & Peanut Dip (30 pcs)",
    category: "bbq",
    description: "15 chicken & 15 beef skewers marinated in lemongrass & turmeric, accompanied by pressed rice cakes (ketupat), cucumber, and spicy peanut gravy.",
    price: 36,
    serves: "Serves 4-6 pax",
    dietary: ["Halal Certified", "BBQ Ready"],
    vendor: "Old Satay Club Kitchen",
    distance: "1.4km from Park",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  }
];

export const MOCK_GEAR_ITEMS: GearItem[] = [
  {
    id: "g1",
    name: "Heavy-Duty Waterproof Oxford Picnic Groundsheet (2m × 2m)",
    category: "comfort",
    description: "3-layer thermal moisture barrier with soft canvas top. Fits 6 guests comfortably without damp grass seepage.",
    essential: true,
    rentalPrice: 6,
    icon: "layers"
  },
  {
    id: "g2",
    name: "Insulated 20L Chilled Cooler Box with 5kg Ice Pack",
    category: "utility",
    description: "Keeps drinks frosty for up to 10 hours in tropical heat with leakproof drainage plug.",
    essential: true,
    rentalPrice: 9,
    icon: "ac_unit"
  },
  {
    id: "g3",
    name: "Compact Pop-up Canopy Rain & UV Shelter (3m × 3m)",
    category: "shelter",
    description: "Instant 60-second setup, UPF 50+ silver coating, sand weight bags included for high wind stability.",
    essential: false,
    rentalPrice: 15,
    icon: "umbrella"
  },
  {
    id: "g4",
    name: "Ultralight Low-Slung Beach & Lawn Camping Chairs (Pair of 2)",
    category: "comfort",
    description: "Ergonomic mesh backing with armrest cup holders and wide feet that won't sink into damp soil.",
    essential: false,
    rentalPrice: 10,
    icon: "chair"
  },
  {
    id: "g5",
    name: "Citronella Ultrasonic Mosquito Shield & Natural Repellent Mist",
    category: "utility",
    description: "DEET-free plant based vapor repelling outdoor insects in an 8-meter circumference.",
    essential: true,
    rentalPrice: 5,
    icon: "pest_control"
  },
  {
    id: "g6",
    name: "Lawn Entertainment Set: Wooden Kubb & Glow Frisbee",
    category: "fun",
    description: "Nordic block throwing game plus aerodynamic high-visibility lawn flying disc for group games.",
    essential: false,
    rentalPrice: 7,
    icon: "sports_volleyball"
  }
];

export const DEFAULT_SAVED_PLANS = [
  {
    id: "plan-1",
    title: "Saturday Sunset River Picnic",
    spotName: "Bishan-Ang Mo Kio River Lawn (Zone B)",
    date: "Saturday, Oct 4, 2025",
    timeSlot: "15:00 - 18:30",
    guests: 6,
    spotId: "1",
    totalCost: 92,
    weatherRisk: "15% Rain Risk",
    isWeatherGuaranteed: true
  },
  {
    id: "plan-2",
    title: "East Coast Birthday Sunset BBQ",
    spotName: "East Coast Park Coastal Grove & BBQ Pavilion #14",
    date: "Sunday, Oct 12, 2025",
    timeSlot: "16:00 - 20:30",
    guests: 14,
    spotId: "3",
    totalCost: 148,
    weatherRisk: "10% Rain Risk",
    isWeatherGuaranteed: true
  }
];
