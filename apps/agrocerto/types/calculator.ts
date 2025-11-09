export type SprayerType =
  | 'Pulverizador de Barra'
  | 'Drone'
  | 'Atomizador (canhão de ar)'
  | 'Turbo Atomizador'
  | 'Pulverizador Costal Manual'
  | 'Pulverizador Costal Motorizado';

export type CalculationMethod = 'vazao_desejada' | 'volume_por_bico';

export interface SavedTime {
  id: string;
  time: number; // em segundos
  distance: number; // em metros
}

export interface CalculationData {
  sprayerType: SprayerType | null;
  calculationMethod: CalculationMethod | null;
  averageSpeed: number | null; // km/h
  nozzleDistance: number | null; // cm
  measurementValue: number | null; // L/min ou L/ha, dependendo do método
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
