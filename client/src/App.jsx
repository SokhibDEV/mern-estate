import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEn from "./translate/translateEn";
import translationsUz from "./translate/translateUz";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("language"),
  debug: true,
  resources: {
    en: {
      translation: translationsEn,
    },
    uz: {
      translation: translationsUz,
    },
  },
});

export default function App() {
  
  const changeLang = (value) => {
    localStorage.setItem("language", value);
    i18n.changeLanguage(localStorage.getItem("language"));
  };

  return (
    <BrowserRouter>
      <Header changeLang={changeLang} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
