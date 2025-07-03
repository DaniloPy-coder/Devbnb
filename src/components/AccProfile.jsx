import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../services/api";

const AccProfile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);

  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      toast.success("Deslogado com sucesso");
      setRedirect(true);
    } catch (error) {
      toast.error("Erro ao deslogar");
    }
  };

  if (redirect) return <Navigate to="/" />;

  if (!user) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <p>
        Logado como {user.name} ({user.email})
      </p>

      <button
        onClick={logout}
        className="bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AccProfile;
