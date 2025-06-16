import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import { UserContextProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/account";
import Header from "./components/Header";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
