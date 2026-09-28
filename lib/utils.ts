export function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function formatRoomName(roomId: string) {
  return `Drafting Room ${roomId}`;
}
