/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProgressStepper } from './components/ProgressStepper';
import { ScreenDateWeather } from './components/ScreenDateWeather';
import { ScreenSpotShelter } from './components/ScreenSpotShelter';
import { ScreenFoodGear } from './components/ScreenFoodGear';
import { ScreenItineraryReview } from './components/ScreenItineraryReview';
import { Footer } from './components/Footer';
import { GeoClusterModal } from './components/modals/GeoClusterModal';
import { SavedDraftsModal } from './components/modals/SavedDraftsModal';
import { RegulationsModal } from './components/modals/RegulationsModal';
import { ChecklistModal } from './components/modals/ChecklistModal';
import { NewPlanModal } from './components/modals/NewPlanModal';
import { INITIAL_SPOTS, Spot, DEFAULT_SAVED_PLANS } from './data/mockData';
import { CheckCircle, Info } from 'lucide-react';

export default function App() {
  // Navigation step: 1 = Date & Weather, 2 = Spot & Shelter, 3 = Food & Gear, 4 = Shareable Plan
  // Default to 2 so it initially opens on the exact screen shown in user's design image!
  const [currentStep, setCurrentStep] = useState<number>(2);

  // Spot selection state
  const [spots] = useState<Spot[]>(INITIAL_SPOTS);
  const [selectedSpot, setSelectedSpot] = useState<Spot>(INITIAL_SPOTS[0]);

  // Outing parameters
  const [selectedDate, setSelectedDate] = useState<string>('2025-10-04');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('afternoon');
  const [partySize, setPartySize] = useState<number>(6);
  const [occasion, setOccasion] = useState<string>('casual');

  // Food quantities: map of itemId -> quantity
  const [selectedFoodQuantities, setSelectedFoodQuantities] = useState<Record<string, number>>({
    'f1': 1, // Charcuterie board
    'f4': 1, // Botanical cold brew
  });

  // Gear status: map of itemId -> 'bringing' | 'renting' | 'none'
  const [gearStatus, setGearStatus] = useState<Record<string, 'bringing' | 'renting' | 'none'>>({
    'g1': 'bringing', // Groundsheet
    'g2': 'renting',  // Cooler with ice
    'g5': 'bringing', // Citronella repellent
  });

  // Saved outing drafts
  const [savedDrafts, setSavedDrafts] = useState(DEFAULT_SAVED_PLANS);

  // Modals state
  const [isGeoClusterOpen, setIsGeoClusterOpen] = useState(false);
  const [isSavedDraftsOpen, setIsSavedDraftsOpen] = useState(false);
  const [isRegulationsOpen, setIsRegulationsOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateFoodQuantity = (id: string, delta: number) => {
    setSelectedFoodQuantities((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const handleUpdateGearStatus = (id: string, status: 'bringing' | 'renting' | 'none') => {
    setGearStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleSaveToDrafts = (spotToSave: Spot) => {
    const newDraft = {
      id: `draft-${Date.now()}`,
      title: `${spotToSave.shortName} Gathering`,
      spotName: spotToSave.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot === 'afternoon' ? '14:30 - 18:00' : '17:00 - 20:30',
      guests: partySize,
      spotId: spotToSave.id,
      totalCost: 68,
      weatherRisk: '15% Rain Risk',
      isWeatherGuaranteed: true,
    };
    setSavedDrafts([newDraft, ...savedDrafts]);
    showToast(`Saved "${newDraft.title}" to Outing Drafts!`);
  };

  const handleShareSpot = (spot: Spot) => {
    navigator.clipboard.writeText(
      `Check out this picnic spot: ${spot.name} (${spot.zone}) - verified on PicnicGo!`
    );
    showToast(`Spot link copied: ${spot.name}`);
  };

  const handleLoadDraft = (draft: any) => {
    const foundSpot = spots.find((s) => s.id === draft.spotId) || spots[0];
    setSelectedSpot(foundSpot);
    setSelectedDate(draft.date);
    setPartySize(draft.guests);
    setCurrentStep(4);
    showToast(`Loaded draft: ${draft.title}`);
  };

  const handleDeleteDraft = (id: string) => {
    setSavedDrafts((prev) => prev.filter((d) => d.id !== id));
    showToast('Draft deleted.');
  };

  const handleApplyTemplate = (tpl: {
    spotId: string;
    partySize: number;
    occasion: string;
    timeSlot: string;
  }) => {
    const foundSpot = spots.find((s) => s.id === tpl.spotId) || spots[0];
    setSelectedSpot(foundSpot);
    setPartySize(tpl.partySize);
    setOccasion(tpl.occasion);
    setSelectedTimeSlot(tpl.timeSlot);
    setCurrentStep(2);
    showToast(`Started new plan: ${foundSpot.shortName}`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-[13px] font-medium animate-bounce border border-white/10">
          <CheckCircle className="w-4 h-4 text-[#9af5ce]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <Header
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        onOpenNewPlan={() => setIsNewPlanOpen(true)}
        onOpenSavedDrafts={() => setIsSavedDraftsOpen(true)}
        savedDraftsCount={savedDrafts.length}
      />

      {/* Main Content Area (offset by header height) */}
      <main className="w-full pt-20 flex-1">
        {/* Progress Stepper Ribbon */}
        <ProgressStepper
          currentStep={currentStep}
          onSelectStep={(step) => setCurrentStep(step)}
          temperature={29}
          rainRiskPercent={15}
          weatherCondition="Optimal Conditions"
          onOpenWeatherModal={() => setCurrentStep(1)}
        />

        {/* Step Views */}
        {currentStep === 1 && (
          <ScreenDateWeather
            selectedDate={selectedDate}
            onChangeDate={setSelectedDate}
            selectedTimeSlot={selectedTimeSlot}
            onChangeTimeSlot={setSelectedTimeSlot}
            partySize={partySize}
            onChangePartySize={setPartySize}
            occasion={occasion}
            onChangeOccasion={setOccasion}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <ScreenSpotShelter
            spots={spots}
            selectedSpot={selectedSpot}
            onSelectSpot={(spot) => setSelectedSpot(spot)}
            onConfirmSpot={() => setCurrentStep(3)}
            onOpenGeoClusterModal={() => setIsGeoClusterOpen(true)}
            onSaveToDrafts={handleSaveToDrafts}
            onShareSpot={handleShareSpot}
          />
        )}

        {currentStep === 3 && (
          <ScreenFoodGear
            selectedSpot={selectedSpot}
            selectedFoodQuantities={selectedFoodQuantities}
            onUpdateFoodQuantity={handleUpdateFoodQuantity}
            gearStatus={gearStatus}
            onUpdateGearStatus={handleUpdateGearStatus}
            onBackToSpot={() => setCurrentStep(2)}
            onProceedToReview={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <ScreenItineraryReview
            selectedSpot={selectedSpot}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            partySize={partySize}
            occasion={occasion}
            selectedFoodQuantities={selectedFoodQuantities}
            gearStatus={gearStatus}
            onEditSpot={() => setCurrentStep(2)}
            onEditDate={() => setCurrentStep(1)}
            onEditProvisions={() => setCurrentStep(3)}
            onSaveDraft={() => handleSaveToDrafts(selectedSpot)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenSavedDrafts={() => setIsSavedDraftsOpen(true)}
        onOpenRegulations={() => setIsRegulationsOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Modals */}
      <GeoClusterModal
        isOpen={isGeoClusterOpen}
        onClose={() => setIsGeoClusterOpen(false)}
        spots={spots}
        selectedSpot={selectedSpot}
        onSelectSpot={(s) => setSelectedSpot(s)}
      />

      <SavedDraftsModal
        isOpen={isSavedDraftsOpen}
        onClose={() => setIsSavedDraftsOpen(false)}
        drafts={savedDrafts}
        onLoadDraft={handleLoadDraft}
        onDeleteDraft={handleDeleteDraft}
      />

      <RegulationsModal
        isOpen={isRegulationsOpen}
        onClose={() => setIsRegulationsOpen(false)}
      />

      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      <NewPlanModal
        isOpen={isNewPlanOpen}
        onClose={() => setIsNewPlanOpen(false)}
        onSelectTemplate={handleApplyTemplate}
      />
    </div>
  );
}
