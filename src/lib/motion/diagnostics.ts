import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface MotionDiagnostics {
  instanceCount: number;
  hasActiveTicker: boolean;
  scrollTriggerCount: number;
}

let activeInstanceCount = 0;
let hasActiveTicker = false;

export const setDiagnosticsState = (instances: number, tickerActive: boolean) => {
  activeInstanceCount = instances;
  hasActiveTicker = tickerActive;
};

export const getLenisDiagnosticStats = (): MotionDiagnostics => ({
  instanceCount: activeInstanceCount,
  hasActiveTicker,
  scrollTriggerCount: typeof window !== 'undefined' ? ScrollTrigger.getAll().length : 0,
});

