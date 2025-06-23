import { useEffect, useState } from "react";
import Item from "../components/Item";
import axios from "axios";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data } = await axios.get("http://localhost:3333/places");
        console.log("Places recebidos:", data);
        setPlaces(data);
      } catch (error) {
        console.error("Erro ao carregar places:", error);
      }
    };
    axiosGet();
  }, []);
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.map((place) => (
          <Item key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default Home;
