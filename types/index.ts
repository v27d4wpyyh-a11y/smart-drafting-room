export type ZoneType = "Quiet Zone" | "Creative Zone";
export type SeatStatus = "available" | "reserved" | "unavailable";

export interface Room {
  id: "1" | "2";
  name: string;
  zone: ZoneType;
  description: string;
  rules: string;
  available: number;
  total: number;
}

export interface Seat {
  id: string;
  roomId: Room["id"];
  label: string;
  status: SeatStatus;
  row: string;
}

export interface Reservation {
  id: string;
  roomId: Room["id"];
  zone: ZoneType;
  seatId: string;
  date: string;
  time: string;
  status: "upcoming" | "past" | "cancelled";
}

export interface IssueReport {
  id: string;
  roomId: Room["id"];
  seatId?: string;
  category: string;
  detail: string;
  count?: number;
}

export interface UsageData {
  hour: string;
  quiet: number;
  creative: number;
}

export interface DailyUsageData {
  day: string;
  quiet: number;
  creative: number;
}
