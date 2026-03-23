export interface NormalizedClass {
  id: string;
  eventId: string;
  courseId: string;
  eventName: string;
  details: string;
  facility: string;
  startDate: string;       // ISO string
  endDate: string;         // ISO string
  formattedStartDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  priceRange: string;
  isFree: boolean;
  spotsLeft: string;
  isFull: boolean;
  ageMin: number | null;
  ageMax: number | null;
  noAgeRestriction: boolean;
  ageRestrictions: string;
  genderRestrictions: string;
  durationMinutes: number;
  numberOfSessions: number;
  bookButtonText: string;
  eventTimeDescription: string;
}
