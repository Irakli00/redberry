import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

import EyeIcon from "../../assets/icons/eye.svg";
import { logIn } from "../../services/auth";
import { AppContext } from "../../context/AppContext";

function LogInForm() {
  const { loginUser } = useContext(AppContext);

  const navigate = useNavigate();

  const [inputMail, setInPutMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      loginUser(data.user, data.token);
      navigate("/products");
    },
    onError: (err) => setErrorMessage(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ email: inputMail, password: inputPassword });
  }

  return (
    <div className="min-w-[554px] mt-[241px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[48px] w-full">
        <h2 className="text-[42px] text-main-black font-semibold">Log in</h2>
        <div className="flex flex-col gap-[24px] relative">
          <input
            className="auth-form-input"
            type="email"
            placeholder="Email"
            required
            minLength={3}
            onChange={(e) => setInPutMail(e.target.value)}
          />
          <div className="relative w-full">
            <input
              className="auth-form-input w-full pr-10"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              required
              minLength={3}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <img
              src={EyeIcon}
              onClick={() => setIsPasswordVisible((p) => !p)}
              alt="toggle password visibility"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
            />
          </div>

          {isError && (
            <p className="absolute top-full italic text-main-red text-[14px] ">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[24px]">
          <button
            className="bg-main-red text-white py-[10px] cursor-pointer rounded-[10px]"
            type="submit"
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
          <aside className="flex justify-center gap-[8px]">
            <p className="text-dark-blue cursor-default font-normal">
              Not a member?
            </p>
            <Link className="text-main-red font-medium" to={"/auth/register"}>
              Register
            </Link>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
