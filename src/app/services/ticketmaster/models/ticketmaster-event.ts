export interface TicketmasterEvent {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  distance: number;
  units: string;
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  promoter: Promoter;
  promoters: Promoter[];
  info: string;
  pleaseNote: string;
  priceRanges: PriceRange[];
  seatmap: Seatmap;
  accessibility: object;
  ticketLimit: TicketLimit;
  ageRestrictions: AgeRestrictions;
  ticketing: Ticketing;
  _links: WelcomeLinks;
  _embedded: Embedded;
}

interface Embedded {
  venues: Venue[];
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  distance: number;
  units: string;
  postalCode: string;
  timezone: string;
  city: City;
  state: State;
  country: Country;
  address: Address;
  location: Location;
  markets: Genre[];
  dmas: DMA[];
  upcomingEvents: UpcomingEvents;
  ada: Ada;
  _links: VenueLinks;
}

interface VenueLinks {
  self: Self;
}

interface Self {
  href: string;
}

interface Ada {
  adaPhones: string;
  adaCustomCopy: string;
  adaHours: string;
}

interface Address {
  line1: string;
  line2: string;
}

interface City {
  name: string;
}

interface Country {
  name: string;
  countryCode: string;
}

interface DMA {
  id: number;
}

interface Image {
  ratio: Ratio;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

enum Ratio {
  The16_9 = '16_9',
  The3_2 = '3_2',
  The4_3 = '4_3',
}

interface Location {
  longitude: string;
  latitude: string;
}

interface Genre {
  name: string;
  id: string;
}

interface State {
  name: string;
  stateCode: string;
}

interface UpcomingEvents {
  ticketmaster: number;
  _total: number;
  _filtered: number;
}

interface WelcomeLinks {
  self: Self;
  venues: Self[];
}

interface AgeRestrictions {
  legalAgeEnforced: boolean;
}

interface Classification {
  primary: boolean;
  segment: Genre;
  genre: Genre;
  subGenre: Genre;
  type: Genre;
  subType: Genre;
  family: boolean;
}

interface Dates {
  start: Start;
  timezone: string;
  status: Status;
  spanMultipleDays: boolean;
}

interface Start {
  localDate: Date;
  localTime: string;
  dateTime: Date;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface Status {
  code: string;
}

interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface Sales {
  public: Public;
}

interface Public {
  startDateTime: Date;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: Date;
}

interface Seatmap {
  staticUrl: string;
}

interface TicketLimit {
  info: string;
}

interface Ticketing {
  safeTix: SafeTix;
}

interface SafeTix {
  enabled: boolean;
}
