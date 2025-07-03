import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import Booking from "./Booking";
import { api } from "../services/api";

const AccBookings = () => {
  const { user } = useUserContext();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    const apiGet = async () => {
      try {
        const { data } = await api.get(
          `http://localhost:3333/bookings/user/${user.id}`,
        );
        setBookings(data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };
    apiGet();
  }, [user]);

  if (!user) {
    return <p>Você precisa estar logado para ver suas reservas.</p>;
  }

  if (bookings.length === 0) {
    return <p>Você não tem reservas ainda.</p>;
  }

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8">
      {bookings.map((booking) => (
        <Booking booking={booking} key={booking.id} />
      ))}
    </div>
  );
};

export default AccBookings;
