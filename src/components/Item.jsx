import { Link } from "react-router-dom";

const Item = ({ place }) => {
  const firstPhoto = place.photos?.[0];
  const photoUrl = firstPhoto
    ? firstPhoto.startsWith("http")
      ? firstPhoto
      : `http://localhost:3333/files/${firstPhoto}`
    : "/placeholder.jpg";

  return (
    <Link to={`/place/${place.id}`} className="flex flex-col gap-2">
      <img
        src={photoUrl}
        alt={place.title || "acomodação"}
        className="aspect-square w-full rounded-2xl object-cover"
      />

      <div className="flex flex-grow flex-col p-4">
        <h3 className="text-xl font-semibold">{place.title}</h3>
        <h1 className="text-xl">{place.city}</h1>
        <p className="truncate text-gray-600">{place.description}</p>
      </div>
      <p>
        <span className="font-semibold">R$ {place.price}</span> por diária
      </p>
    </Link>
  );
};

export default Item;
