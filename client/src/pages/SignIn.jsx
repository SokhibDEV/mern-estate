import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { signFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import OAuth from "../Components/OAuth";
import { useTranslation } from "react-i18next"

export default function SignIn() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({});
  const { loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      dispatch(signFailure(error.message))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">{ t("sign_in") }</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center">
        
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder = {`${t("password")}`}
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." :  t("sign_in") }
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>{t("dont_have_account")}</p>
        <Link to={"/sign-up"} className="text-blue-700">
          {t('sign_up')}
        </Link>
      </div>
      {error && <p className="text-red-500 my-5">{error}</p>}
    </div>
  );
}
