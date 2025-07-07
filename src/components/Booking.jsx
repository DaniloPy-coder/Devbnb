import { Link } from "react-router-dom";

const Booking = ({ booking, place = false, onCancel = null }) => {
  const firstPhoto = booking.place.photos?.[0];

  const photoUrl = firstPhoto
    ? firstPhoto.startsWith("http")
      ? firstPhoto
      : `https://https://backend-devbnb.vercel.app/files/${firstPhoto}`
    : "/placeholder.jpg";

  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-2xl bg-gray-100 p-6 ${
        place ? "" : "md:flex-row md:items-center"
      }`}
    >
      {place ? (
        ""
      ) : (
        <Link to={`/place/${booking.place.id}`} className="block">
          <img
            className="aspect-square max-w-56 rounded-2xl bg-gray-100 p-6"
            src={photoUrl}
            alt={booking.place.title || "Foto do lugar"}
          />
        </Link>
      )}

      <div className="flex flex-col gap-2">
        {place ? (
          <p className="text-2xl font-medium">
            Você já tem uma reserva para esse lugar
          </p>
        ) : (
          <p className="text-2xl font-medium">{booking.place.title}</p>
        )}

        <div>
          <p>
            <span className="font-semibold">Check-in: </span>
            {new Date(booking.checkin).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Check-out: </span>
            {new Date(booking.checkout).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Diárias: </span>
            {booking.daily}
          </p>
          <p>
            <span className="font-semibold">Convidados: </span>
            {booking.guests}
          </p>
          <p>
            <span className="font-semibold">Preço Total: </span>
            R$ {booking.total.toLocaleString()}
          </p>
        </div>

        {place && onCancel && (
          <button
            onClick={onCancel}
            className="mt-2 w-full cursor-pointer rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
          >
            Cancelar reserva
          </button>
        )}
      </div>
    </div>
  );
};

export default Booking;
