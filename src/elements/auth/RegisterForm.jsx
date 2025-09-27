import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { register } from "../../services/auth";

import { AppContext } from "../../context/AppContext";

import Button from "../components/Button";

import CameraIcon from "../../assets/icons/camera.svg";
import EyeIcon from "../../assets/icons/eye.svg";

function RegisterForm() {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      loginUser(data.user, data.token);
      navigate("/products");
    },
    onError: (err) => {
      setErrorMessages(err.messages);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", inputMail);
    formData.append("username", inputUsername);
    formData.append("password", inputPassword);
    formData.append("password_confirmation", inputPasswordConfirm);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    mutate(formData);
  }

  return (
    <div className="min-w-[554px] mt-[152px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[48px] w-full">
        <h2 className="text-[42px] text-main-black font-semibold">
          Registration
        </h2>
        <div className="flex items-center gap-4">
          <label
            htmlFor="avatarInput"
            className="flex items-center gap-4 cursor-pointer"
          >
            <div className="w-[100px] h-[100px] rounded-full border border-light-gray flex items-center justify-center overflow-hidden">
              <img
                src={avatar ? URL.createObjectURL(avatar) : CameraIcon}
                alt="preview"
                className="object-cover "
              />
            </div>
            {avatar ? (
              <div className="flex gap-[15px] items-center text-[14px] text-dark-blue">
                <div>
                  <label className=" cursor-pointer" htmlFor="avatarInput2">
                    Upload new
                  </label>
                  <input
                    type="file"
                    name="avatarInput2"
                    id="avatarInput2"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => setAvatar(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <span>Upload Image</span>
            )}
          </label>

          <input
            type="file"
            name="avatarInput"
            id="avatarInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        <div className="flex flex-col gap-[24px]">
          <input
            className="auth-form-input"
            type="text"
            placeholder="Username"
            required
            minLength={3}
            onChange={(e) => setInputUsername(e.target.value)}
          />
          <input
            className="auth-form-input"
            type="email"
            placeholder="Email"
            required
            minLength={3}
            onChange={(e) => setInputMail(e.target.value)}
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
          <div className="relative w-full">
            <input
              className="auth-form-input w-full pr-10"
              placeholder="Confirm password"
              onChange={(e) => setInputPasswordConfirm(e.target.value)}
              type={isPasswordConfirmVisible ? "text" : "password"}
              required
              minLength={3}
            />
            <img
              src={EyeIcon}
              onClick={() => setIsPasswordConfirmVisible((p) => !p)}
              alt="toggle password visibility"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
            />
          </div>

          <div>
            {isError &&
              errorMessages.map((message, i) => (
                <p
                  key={i}
                  className=" top-full italic text-main-red text-[14px]"
                >
                  {message}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <Button type="submit">
            {isPending ? "Registering..." : "Register"}
          </Button>
          <aside className="flex justify-center gap-[8px]">
            <p className="text-dark-blue cursor-default font-normal">
              Already a member?
            </p>
            <Link className="text-main-red font-medium" to={"/auth/logIn"}>
              Log in
            </Link>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
