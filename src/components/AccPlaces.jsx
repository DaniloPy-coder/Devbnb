import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewPlace from "./NewPlace";
import { api } from "../services/api";
import { useUserContext } from "../contexts/UserContext";

const AccPlaces = () => {
  const { action } = useParams();
  const { user } = useUserContext();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      if (!user?.token) return;

      try {
        const { data } = await api.get("/user/places", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPlaces(data);
      } catch (error) {
        console.error("Erro ao buscar lugares:", error);
      }
    };
    axiosGet();
  }, [action, user?.token]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      {action !== "new" ? (
        <div className="flex flex-col items-center gap-8">
          <Link
            to="/account/places/new"
            className="hover:bg-primary-500 bg-primary-400 flex min-w-44 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-white transition"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Adicionar novo lugar
          </Link>

          {places.map((place) => {
            return (
              <Link
                key={place.id}
                to={`/account/places/new/${place.id}`}
                className="flex items-center gap-6 rounded-2xl bg-gray-100 p-6"
              >
                <img
                  className="aspect-square max-w-56 rounded-2xl bg-gray-100 p-6"
                  src={place.photos[0]}
                  alt="Foto da Acomodação"
                />

                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-medium">{place.title}</p>
                  <p>{place.description}</p>
                </div>
              </Link>
            );
          })}

          <></>
        </div>
      ) : (
        <NewPlace />
      )}
    </div>
  );
};

export default AccPlaces;
