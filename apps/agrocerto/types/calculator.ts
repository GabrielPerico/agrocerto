export type SprayerType =
  | 'Pulverizador de Barra'
  | 'Atomizador (canhão de ar)'
  | 'Turbo Atomizador'
  | 'Pulverizador Costal Manual'
  | 'Pulverizador Costal Motorizado';

export type CalculationMethod = 'desired_flow' | 'volume_collect';

export interface SavedTime {
  id: string;
  time: number; // in seconds
  distance: number; // in meters
}

export interface CalculationData {
  sprayerType: SprayerType | null;
  calculationMethod: CalculationMethod | null;
  averageSpeed: number | null; // km/h
  nozzleDistance: number | null; // cm
  measurementValue: number | null; // L/min or mL depending on method
  savedTimes: SavedTime[];
}

export interface SavedCalculation {
  id: string;
  sprayerType: SprayerType;
  calculationMethod: CalculationMethod;
  averageSpeed: number;
  nozzleDistance: number;
  measurementValue: number;
  finalResult: number;
  createdAt: string;
}
