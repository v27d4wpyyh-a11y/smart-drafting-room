export type ZoneType = "Quiet Zone" | "Creative Zone";
export type SeatStatus = "available" | "reserved" | "unavailable";
export type OutletStatus = "normal" | "faulty";

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

export interface Outlet {
  id: string;
  roomId: Room["id"];
  label: string;
  status: OutletStatus;
  zone: "A-B" | "C-D" | "E-F";
  side: "좌측" | "우측";
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
