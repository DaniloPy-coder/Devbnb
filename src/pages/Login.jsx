import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useState } from "react";

const Login = () => {
  const { setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Preencha todos os campos");
    }

    try {
      const { data } = await api.post("/login", { email, password });

      setUser({
        ...data.user,
        token: data.token,
      });

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu login</h1>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full rounded-full border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full rounded-full border px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary-400 cursor-pointer rounded-full py-2 text-white">
            Login
          </button>
        </form>

        <p>
          Ainda não tem conta?{" "}
          <Link to="/register" className="font-semibold underline">
            Registre-se
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
