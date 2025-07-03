import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Place from "./pages/Place";
import Account from "./pages/Account";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { api } from "./services/api";

api.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
api.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage/:action?/:id?" element={<Account />} />
          <Route path="/place/:id" element={<Place />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
