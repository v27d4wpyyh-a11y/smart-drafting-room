import type { DailyUsageData, IssueReport, Reservation, Room, Seat, SeatStatus, UsageData } from "@/types";

export const rooms: Room[] = [
  {
    id: "1",
    name: "Drafting Room 1",
    zone: "Quiet Zone",
    description: "개인작업 · 도면작업 · 시험공부",
    rules: "대화 최소화 · 음식 제한 · Clean Desk",
    available: 12,
    total: 30
  },
  {
    id: "2",
    name: "Drafting Room 2",
    zone: "Creative Zone",
    description: "팀 프로젝트 · 토론 · 모형작업",
    rules: "대화 가능 · 협업 중심 · 사용 후 정리",
    available: 8,
    total: 30
  }
];

const roomOneStatuses: SeatStatus[] = [
  "available", "reserved", "reserved", "available", "unavailable", "reserved", "available", "reserved", "reserved", "available",
  "reserved", "available", "reserved", "unavailable", "available", "reserved", "reserved", "reserved", "available", "unavailable",
  "available", "reserved", "available", "reserved", "reserved", "available", "unavailable", "reserved", "available", "reserved"
];

const roomTwoStatuses: SeatStatus[] = [
  "reserved", "available", "reserved", "reserved", "unavailable", "available", "reserved", "reserved", "reserved", "available",
  "reserved", "reserved", "available", "unavailable", "reserved", "available", "reserved", "reserved", "reserved", "unavailable",
  "available", "reserved", "reserved", "available", "reserved", "reserved", "available", "unavailable", "reserved", "reserved"
];

const rowLabels = ["A", "B", "C", "D", "E", "F"];

function buildSeats(roomId: "1" | "2", statuses: SeatStatus[]): Seat[] {
  return statuses.map((status, index) => {
    const row = rowLabels[Math.floor(index / 5)];
    const number = (index % 5) + 1;
    return {
      id: `${row}-${String(number).padStart(2, "0")}`,
      roomId,
      label: `${row}-${String(number).padStart(2, "0")}`,
      row,
      status
    };
  });
}

export const seats: Seat[] = [
  ...buildSeats("1", roomOneStatuses),
  ...buildSeats("2", roomTwoStatuses)
];

export const reservations: Reservation[] = [
  { id: "R-1024", roomId: "1", zone: "Quiet Zone", seatId: "D-02", date: "2026-10-14", time: "16:00-17:00", status: "upcoming" },
  { id: "R-1025", roomId: "2", zone: "Creative Zone", seatId: "B-05", date: "2026-10-16", time: "19:00-20:00", status: "upcoming" },
  { id: "R-0998", roomId: "1", zone: "Quiet Zone", seatId: "C-03", date: "2026-09-21", time: "15:00-16:00", status: "past" }
];

export const issueReports: IssueReport[] = [
  { id: "I-01", roomId: "1", seatId: "D-02", category: "소음", detail: "집중 구역에서 대화가 길게 이어짐", count: 8 },
  { id: "I-02", roomId: "2", seatId: "B-05", category: "쓰레기/청결", detail: "모형작업 후 잔여물 방치", count: 6 },
  { id: "I-03", roomId: "1", seatId: "C-03", category: "장시간 자리점유", detail: "짐만 놓고 장시간 부재", count: 5 },
  { id: "I-04", roomId: "1", seatId: "B-03", category: "콘센트", detail: "콘센트 접촉 불량", count: 5 }
];

export const hourlyUsage: UsageData[] = [
  { hour: "06", quiet: 22, creative: 12 },
  { hour: "08", quiet: 35, creative: 20 },
  { hour: "10", quiet: 58, creative: 43 },
  { hour: "12", quiet: 64, creative: 49 },
  { hour: "14", quiet: 72, creative: 55 },
  { hour: "16", quiet: 84, creative: 67 },
  { hour: "18", quiet: 78, creative: 70 },
  { hour: "20", quiet: 61, creative: 63 },
  { hour: "22", quiet: 45, creative: 48 },
  { hour: "24", quiet: 28, creative: 32 }
];

export const dailyUsage: DailyUsageData[] = [
  { day: "Mon", quiet: 74, creative: 51 },
  { day: "Tue", quiet: 81, creative: 57 },
  { day: "Wed", quiet: 78, creative: 62 },
  { day: "Thu", quiet: 85, creative: 70 },
  { day: "Fri", quiet: 68, creative: 66 },
  { day: "Sat", quiet: 39, creative: 42 },
  { day: "Sun", quiet: 31, creative: 36 }
];

export const issueCounts = [
  { label: "소음", value: 14 },
  { label: "쓰레기/청결", value: 11 },
  { label: "장시간 자리점유", value: 9 },
  { label: "콘센트", value: 5 },
  { label: "조명", value: 4 },
  { label: "기타", value: 3 }
];

export const extendedHoursDemand = [
  { period: "Normal", values: [42, 35, 21, 10] },
  { period: "Assignment", values: [65, 71, 58, 39] },
  { period: "Exam", values: [72, 82, 69, 46] }
];
