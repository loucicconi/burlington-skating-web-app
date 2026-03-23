export interface FilterOption {
  name: string;
  value: string;
  valueKind: number;
}

export interface FilterGroup {
  groupName: string;
  filterGroupKind: number;
  options: FilterOption[];
  visible: boolean;
}

export interface FilterState {
  locations: string[];   // Value GUIDs
  services: string[];    // Value GUIDs
  daysOfWeek: string[];  // Value strings (e.g. "Monday")
  ageMin: number;
  ageMax: number;
  dateStart: string;     // YYYY-MM-DD
  dateEnd: string;       // YYYY-MM-DD
  keyword: string;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  locations: [],
  services: [],
  daysOfWeek: [],
  ageMin: 0,
  ageMax: 120,
  dateStart: '',
  dateEnd: '',
  keyword: '',
};
