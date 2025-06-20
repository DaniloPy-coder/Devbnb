import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext, useUserContext } from "../contexts/UserContext";

const AccProfile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/logout");
      console.log(data);
      setRedirect(true);
    } catch (error) {
      alert("Erro ao fazer logout");
    }
  };

  if (redirect) return <Navigate to="/" />;

  if (!user) return <></>;

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
