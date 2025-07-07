import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Perk from "../components/Perk";
import Booking from "../components/Booking";
import { toast } from "react-toastify";
import { api } from "../services/api";

const Place = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const [place, setPlace] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const numberOfDays = (date1, date2) => {
    const dateCheckin = new Date(date1);
    const dateCheckout = new Date(date2);
    return Math.ceil(
      (dateCheckout.getTime() - dateCheckin.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  useEffect(() => {
    if (id && user) {
      const checkUserBooking = async () => {
        try {
          const { data } = await api.get(`/bookings/user/${user.id}`);
          const hasBooking = data.find((b) => b.placeId === id);
          setAlreadyBooked(!!hasBooking);
          setBooking(hasBooking || null);
        } catch (err) {
          console.error("Erro ao verificar reservas:", err);
        }
      };
      checkUserBooking();
    }
  }, [id, user]);

  useEffect(() => {
    if (id) {
      const fetchPlace = async () => {
        try {
          const { data } = await api.get(`/places/${id}`);
          console.log("Dados do lugar:", data);
          setPlace(data);
        } catch (error) {
          console.error("Erro ao buscar lugar:", error);
        }
      };
      fetchPlace();
    }
  }, [id]);

  useEffect(() => {
    if (overlay) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [overlay]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Você precisa estar logado para fazer uma reserva.");
      return;
    }

    if (!checkin || !checkout || !guests) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const daily = numberOfDays(checkin, checkout);

    if (daily <= 0) {
      toast.error("A data de check-in deve ser anterior à data de check-out.");
      return;
    }

    if (Number(guests) <= 0) {
      toast.error("O número de hóspedes deve ser maior que zero.");
      return;
    }

    try {
      const objBooking = {
        userId: user.id,
        placeId: id,
        checkin: new Date(checkin).toISOString(),
        checkout: new Date(checkout).toISOString(),
        guests: Number(guests),
      };

      const { data } = await api.post("/bookings", objBooking);
      setBooking(data);
      toast.success("Reserva realizada com sucesso.");
      setRedirect(true);

      setCheckin("");
      setCheckout("");
      setGuests("");
    } catch (err) {
      toast.error(
        "Erro ao reservar: " + err.response?.data?.message || err.message,
      );
    }
  };

  if (redirect) return <Navigate to="/account/bookings" />;
  if (!place) return <p>Carregando...</p>;

  const handleCancelBooking = async () => {
    if (!booking) return;

    try {
      await api.delete(`/bookings/${booking.id}`);
      alert("Reserva cancelada com sucesso.");
      setBooking(null);
      setAlreadyBooked(false);
    } catch (err) {
      toast.error(
        "Erro ao cancelar reserva: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-8">
        <div className="flex flex-col sm:gap-1">
          <div className="text-xl font-bold sm:text-3xl">{place.title}</div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p>{place.city}</p>
          </div>
        </div>

        {booking && (
          <Booking
            onCancel={handleCancelBooking}
            booking={booking}
            place={true}
          />
        )}

        <div className="relative grid aspect-square gap-4 overflow-hidden rounded-2xl sm:aspect-[3/2] sm:grid-cols-[2fr_1fr] sm:grid-rows-2">
          {(place.photos?.length ?? 0) > 0 ? (
            place.photos
              .filter((_, index) => index < 3)
              .map((photo, index) => {
                const photoName =
                  typeof photo === "string" ? photo : photo.url || photo.path;
                const photoSrc = photoName.startsWith("http")
                  ? photoName
                  : `http://localhost:3333/files/${photoName}`;
                return (
                  <img
                    key={`${photoName}-${index}`}
                    src={photoSrc}
                    alt={`Foto ${index + 1} de ${place.title}`}
                    className={`${index === 0 ? "row-span-2 h-full object-center" : ""} aspect-square w-full cursor-pointer transition hover:opacity-75 sm:object-cover`}
                  />
                );
              })
          ) : (
            <img
              src="/placeholder.jpg"
              alt="Sem fotos disponíveis"
              className="row-span-2 h-full w-full rounded-md object-cover"
            />
          )}
          <div
            onClick={() => setOverlay(true)}
            className="absolute right-2 bottom-2 flex cursor-pointer gap-2 rounded-xl border border-black bg-white px-2 py-1 transition hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <p>Mostrar mais imagens</p>
          </div>
        </div>

        <div className={`grid ${booking ? "" : "grid-cols-1 md:grid-cols-2"}`}>
          <div className="order-2 flex flex-col gap-5 p-6 md:order-none">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">Descrição</p>
              <p>{place.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">
                Horários e Restrições
              </p>
              <div>
                <p>Checkin: {place.checkin}</p>
                <p>Checkout: {place.checkout}</p>
                <p>Máx de convidados: {place.guests}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">Diferenciais</p>
              <div className="flex flex-col gap-1">
                {place.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2">
                    <Perk perk={perk} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!booking && (
            <form
              className="order-1 flex flex-col gap-4 self-center justify-self-center rounded-2xl border border-gray-200 px-4 py-3 sm:px-8 sm:py-4 md:order-none"
              onSubmit={handleBooking}
            >
              <p className="text-center text-lg font-bold sm:text-2xl">
                Preço: R$ {place.price} Diária
              </p>
              <div className="flex flex-col sm:flex-row">
                <div className="rounded-tl-2xl rounded-tr-2xl border border-gray-300 px-4 py-2 sm:rounded-tr-none sm:rounded-bl-2xl">
                  <label className="font-bold" htmlFor="checkin">
                    Checkin:
                  </label>
                  <input
                    id="checkin"
                    className="w-full sm:w-auto"
                    type="date"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    required
                  />
                </div>
                <div className="rounded-br-2xl rounded-bl-2xl border border-t-0 border-gray-300 px-4 py-2 sm:rounded-tr-2xl sm:rounded-bl-none sm:border-t sm:border-l-0">
                  <label className="font-bold" htmlFor="checkout">
                    Checkout:
                  </label>
                  <input
                    id="checkout"
                    className="w-full sm:w-auto"
                    type="date"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-gray-300 px-4 py-2">
                <label className="font-bold" htmlFor="guests">
                  N° de convidados
                </label>
                <input
                  id="guests"
                  className="rounded-2xl border border-gray-300 px-4 py-2"
                  placeholder="2"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                  min="1"
                />
              </div>
              {alreadyBooked ? (
                <p className="text-center font-bold text-red-500">
                  Você já reservou este local.
                </p>
              ) : user ? (
                <button
                  type="submit"
                  className="bg-primary-400 w-full cursor-pointer rounded-full px-4 py-2 text-center text-white"
                >
                  Reservar
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-primary-400 w-full cursor-pointer rounded-full px-4 py-2 text-center font-bold text-white"
                >
                  Faça seu login
                </Link>
              )}
            </form>
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
          <p className="text-lg font-bold sm:text-2xl">Informações extras</p>
          <p>{place.extras}</p>
        </div>

        <div
          className={`${overlay ? "flex" : "hidden"} fixed inset-0 items-start overflow-y-auto bg-black text-white`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {(place.photos ?? []).map((photo, index) => {
                const photoName =
                  typeof photo === "string" ? photo : photo.url || photo.path;
                const photoSrc = photoName.startsWith("http")
                  ? photoName
                  : `http://localhost:3333/files/${photoName}`;
                console.log("photo raw:", photo);
                console.log("photoName:", photoName);
                console.log("photoSrc:", photoSrc);
                return (
                  <img
                    key={`${photoName}-${index}`}
                    src={photoSrc}
                    alt={`Foto ${index + 1} de ${place.title}`}
                    className="aspect-square w-full object-cover"
                  />
                );
              })}
            </div>
          </div>
          <button
            className="absolute top-2 right-4 aspect-square w-8 cursor-pointer rounded-full bg-white font-bold text-black transition hover:scale-105"
            onClick={() => setOverlay(false)}
          >
            X
          </button>
        </div>
      </div>
    </section>
  );
};

export default Place;
