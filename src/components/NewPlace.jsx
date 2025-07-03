import { useEffect, useState } from "react";
import Perks from "./Perks";
import { Navigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { useUserContext } from "../contexts/UserContext";
import PhotoUploader from "./PhotoUploader";
import { toast } from "react-toastify";

const apiBaseUrl =
  import.meta.env.VITE_AXIOS_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3333";

const NewPlace = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [extras, setExtras] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id && user?.token) {
      const fetchPlace = async () => {
        try {
          const { data } = await api.get(`${apiBaseUrl}/places/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setTitle(data.title || "");
          setCity(data.city || "");
          setPhotos(data.photos || []);
          setDescription(data.description || "");
          setPerks(
            Array.isArray(data.perks)
              ? data.perks
              : JSON.parse(data.perks || "[]"),
          );
          setCheckin(data.checkin || "");
          setCheckout(data.checkout || "");
          setGuests(data.guests || "");
          setPrice(data.price || "");
          setExtras(data.extras || "");
        } catch (error) {
          console.error("Erro ao buscar place:", error);
        }
      };

      fetchPlace();
    }
  }, [id, user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !city ||
      photos.length === 0 ||
      !description ||
      !price ||
      !checkin ||
      !checkout ||
      !guests
    ) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("city", city);
      formData.append("checkin", checkin);
      formData.append("checkout", checkout);
      formData.append("price", Number(price));
      formData.append("guests", Number(guests));
      formData.append("description", description);
      formData.append("extras", extras);
      formData.append("userId", user.id);

      perks.forEach((perk) => formData.append("perks", perk));

      // Fotos antigas
      photos
        .filter((p) => typeof p === "string")
        .forEach((photoName) => formData.append("oldPhotos", photoName));

      // Fotos novas
      photos
        .filter((p) => typeof p !== "string")
        .forEach((photo) => formData.append("photos", photo));

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (id) {
        await api.put(`${apiBaseUrl}/places/${id}`, formData, config);
        toast.success("Anúncio atualizado com sucesso!");
      } else {
        await api.post(`${apiBaseUrl}/places`, formData, config);
        toast.success("Anúncio criado com sucesso!");
      }
      setRedirect(true);
    } catch (error) {
      console.error(error);
      toast.error(
        id ? "Erro ao cadastrar anúncio" : "Por favor, tente novamente.",
      );
    }
  };

  if (redirect) return <Navigate to="/account/places" />;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 px-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="ml-2 text-2xl font-bold">
          Título
        </label>
        <input
          type="text"
          id="title"
          placeholder="Digite o título do seu anúncio"
          className="rounded-full border-gray-300 px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="ml-2 text-2xl font-bold">
          Cidade e País
        </label>
        <input
          type="text"
          id="city"
          placeholder="Digite a cidade e país"
          className="rounded-full border-gray-300 px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <PhotoUploader photos={photos} user={user?.token} setPhotos={setPhotos} />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="ml-2 text-2xl font-bold">
          Descrição
        </label>
        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border-gray-300 px-4 py-2"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="ml-2 text-2xl font-bold">
          Comodidades
        </label>

        <Perks {...{ perks, setPerks }} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="ml-2 text-2xl font-bold">
          Informações extras
        </label>
        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border-gray-300 px-4 py-2"
          id="extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 htmlFor="extras" className="ml-2 text-2xl font-bold">
          Restrições e Preço
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(225px,_1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Preço
            </label>
            <input
              type="number"
              placeholder="500"
              id="price"
              className="rounded-full border-gray-300 px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Checkin
            </label>
            <input
              type="text"
              placeholder="500"
              id="checkin"
              className="rounded-full border-gray-300 px-4 py-2"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkout">
              Checkout
            </label>
            <input
              type="text"
              placeholder="16:00"
              id="checkout"
              className="rounded-full border-gray-300 px-4 py-2"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="guests">
              N° convidados
            </label>
            <input
              type="number"
              placeholder="4"
              id="guests"
              className="rounded-full border-gray-300 px-4 py-2"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="hover:bg-primary-500 bg-primary-400 min-w-44 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-white transition"
        >
          Salvar infomações
        </button>
      </div>
    </form>
  );
};

export default NewPlace;
