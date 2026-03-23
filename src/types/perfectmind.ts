export interface PMFilterValue {
  Name: string;
  Value: string | null;
  Value2: string | null;
  ValueKind: number;
  Children?: PMFilterValue[] | null;
}

export interface PMFilterGroup {
  GroupName: string;
  GroupPluralName: string | null;
  FilterGroupKind: number; // 0=Age, 2=Service, 5=Location, 6=DateRange, 8=DayOfWeek, 9=Keyword
  Values: PMFilterValue[];
  Visible: boolean;
}

export interface PMFilterGroupsResponse {
  filterGroups: PMFilterGroup[];
}

export interface PMInstructor {
  Id: string | null;
  FullName: string;
  Type: string;
  Description: string;
  Image: string;
  Email: string;
}

export interface PMDisplaySettings {
  DisplayInstructorsName: boolean;
  DisplayPrices: boolean;
  DisplaySpotsLeft: boolean;
  DisplayRegistrationDate: boolean;
  DisplayNumberOfSessions: boolean;
  DisplayCourseId: boolean;
  DisplayAgeRestrictions: boolean;
  DisplayRankRestrictions: boolean;
  DisplayGenderRestrictions: boolean;
  ButtonName: string;
}

export interface PMClass {
  EventId: string;
  CourseId: string;
  CourseIdTrimmed: string;
  EventName: string;
  Details: string;
  Spots: string;
  OccurrenceDate: string; // yyyyMMdd
  BookButtonText: string;
  BookButtonDescription: string;
  Instructor: PMInstructor;
  Facility: string;
  DisplaySettings: PMDisplaySettings;
  PriceRange: string;
  AllDayEvent: boolean;
  FormattedStartDate: string;
  FormattedStartTime: string;
  FormattedEndDate: string;
  FormattedEndTime: string;
  NumberOfSessions: number;
  MinAge: number | null;
  MinAgeMonths: number | null;
  MaxAge: number | null;
  MaxAgeMonths: number | null;
  NoAgeRestriction: boolean;
  AgeRestrictions: string;
  GenderRestrictions: string;
  DurationInMinutes: number;
  EventTimeDescription: string;
  DisplayableRestrictionsForCourses: string;
  Occurrences: unknown[];
  PrerequisiteEvents: boolean;
}

export interface PMClassesResponse {
  classes: PMClass[];
  classesMaxEndDateString: string | null;
  nextKey: string | null;
}
