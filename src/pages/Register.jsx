import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const apiBaseUrl =
    import.meta.env.VITE_AXIOS_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:3333";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      try {
        await api.post(`${apiBaseUrl}/users`, {
          name,
          email,
          password,
        });

        toast.success("Cadastro realizado com sucesso! Faça o login.");
        navigate("/login");
      } catch (error) {
        console.error("Erro na requisição:", error.response);
        toast.error(error.response?.data?.message || "Erro no cadastro");
      }
    } else {
      toast.error("Preencha todos os campos");
    }
  };

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu cadastro</h1>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
          <input
            type="text"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
            Registrar-se
          </button>
        </form>
        <p>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold underline">
            Logue aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
