import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInStart,signInFailure,signInSuccess} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
const{loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      setError(null); 

      
      const res = await fetch("/api/auth/Signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      console.log("Success:", data);
      navigate("/");

    } catch (error) {
      dispatch(signInFailure("Something went wrong! Please try again."));
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handlechange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handlechange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 font-medium text-center">{error}</p>}
    </div>
  );
}
