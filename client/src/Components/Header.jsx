import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Header({ changeLang }) {
  const { t } = useTranslation();
  const changeLangHandler = (e) => {
    changeLang(e.target.value);
  };

  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder={t("search")}
            className="bg-transparent focus:outline-none  sm-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <select
          className="bg-slate-100 p-2 hidden sm:inline text-slate-700 rounded-full  focus:outline-none"
          onChange={changeLangHandler}
          defaultValue={i18n.language}
        >
          <option value="en">{"English"}</option>
          <option value="uz">{"Uzbek"}</option>
        </select>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              {" "}
              {t("home")}{" "}
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              {t("about")}
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline">{t("sign_in")}</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
