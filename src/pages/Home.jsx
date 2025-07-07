import { useState, useEffect } from "react";
import Item from "../components/Item";
import { toast } from "react-toastify";
import { api } from "../services/api";

const apiBaseUrl =
  import.meta.env.VITE_AXIOS_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3333";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const { data } = await api.get(`${apiBaseUrl}/places`);
        setPlaces(data);
      } catch {
        toast.error("Erro ao buscar lugares");
      }
    };
    fetchAllPlaces();
  }, []);

  const handleSearch = async () => {
    if (!checkin || !checkout) {
      toast.error("Selecione as datas de check-in e check-out");
      return;
    }
    try {
      const { data } = await api.get(`${apiBaseUrl}/places`, {
        params: { checkin, checkout },
      });
      setPlaces(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao buscar lugares");
    }
  };

  return (
    <section>
      <div className="mb-6 flex gap-4">
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="rounded border px-2 py-1"
          placeholder="Check-in"
        />
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="rounded border px-2 py-1"
          placeholder="Check-out"
        />
        <button
          onClick={handleSearch}
          className="bg-primary-400 rounded px-4 py-2 text-white"
        >
          Buscar
        </button>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.map((place) => (
          <Item key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default Home;
