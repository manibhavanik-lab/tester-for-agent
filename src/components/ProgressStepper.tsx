import React from 'react';
import { Check, Sun, CloudRain } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  temperature?: number;
  rainRiskPercent?: number;
  weatherCondition?: string;
  onOpenWeatherModal?: () => void;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStep,
  onSelectStep,
  temperature = 29,
  rainRiskPercent = 15,
  weatherCondition = 'Optimal Conditions',
  onOpenWeatherModal,
}) => {
  const steps = [
    { number: 1, title: '1. Date & Weather' },
    { number: 2, title: '2. Spot & Shelter Discovery' },
    { number: 3, title: '3. Provisions & Gear' },
    { number: 4, title: '4. Itinerary Review' },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-3 bg-[#f2f3ff]/80 border-b border-[#bec9c2]/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Stepper Steps */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {steps.map((step, idx) => {
            const isPassed = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <React.Fragment key={step.number}>
                <button
                  onClick={() => onSelectStep(step.number)}
                  className={`flex items-center gap-1.5 font-semibold text-[13px] shrink-0 transition-colors cursor-pointer py-1 px-1.5 rounded-md ${
                    isPassed
                      ? 'text-[#005f45] hover:bg-[#9af5ce]/20'
                      : isCurrent
                      ? 'text-[#005f45]'
                      : 'text-[#3e4943]/70 hover:text-[#131b2e]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shadow-sm transition-all ${
                      isPassed
                        ? 'bg-[#9af5ce] text-[#002116]'
                        : isCurrent
                        ? 'bg-[#005f45] text-white'
                        : 'bg-[#dae2fd] text-[#3e4943]'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
                  </span>
                  <span className={isCurrent ? 'font-bold text-[#005f45]' : 'font-medium'}>
                    {step.title}
                  </span>
                </button>

                {idx < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-8 h-0.5 shrink-0 transition-colors ${
                      currentStep > step.number ? 'bg-[#005f45]/40' : 'bg-[#bec9c2]/40'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Weather Forecast Badge */}
        <div
          onClick={onOpenWeatherModal}
          className="flex items-center gap-2 self-start md:self-auto bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-[#bec9c2]/20 cursor-pointer hover:border-[#005f45]/40 transition-colors"
          title="Click to view full 24h meteorological telemetry"
        >
          <span className="flex items-center text-[#fea619]">
            <Sun className="w-4 h-4 fill-[#fea619] stroke-[#855300]" />
          </span>
          <span className="text-[12px] font-medium text-[#131b2e]">
            Forecast: <strong>{temperature}°C Fair ({rainRiskPercent}% Rain Risk)</strong>
          </span>
          <span className="text-[#006042] text-[11px] font-bold bg-[#acffd5]/30 px-2.5 py-0.5 rounded-full">
            {weatherCondition}
          </span>
        </div>
      </div>
    </section>
  );
};
