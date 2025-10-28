export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number | string;
  category: string;
  row: number;
  col: number;
  discovered_by?: string;
  summary: string;
  year_discovered?: number | string;
  image_url?: string;
  electron_configuration: string;
  protons: number;
  neutrons: number;
  electrons: number;
}
