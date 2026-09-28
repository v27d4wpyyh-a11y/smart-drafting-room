import { notFound } from "next/navigation";
import { RoomExperience } from "@/components/digital-twin/RoomExperience";
import { rooms, seats } from "@/data/mockData";

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = rooms.find((item) => item.id === id);
  if (!room) notFound();
  const roomSeats = seats.filter((seat) => seat.roomId === room.id);
  return <RoomExperience room={room} seats={roomSeats} />;
}
