import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

import CameraIcon from "../../assets/icons/camera.svg";

import { register } from "../../services/auth";

function RegisterForm() {
  const navigate = useNavigate();

  const [inputMail, setInPutMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [inputUsername, setinputUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("we good:", data);
      localStorage.setItem("token", data.token);
      navigate("/");
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
        <h2 className="text-[42px] font-semibold">Registration</h2>
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
            <span>Upload Image</span>
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
            onChange={(e) => setinputUsername(e.target.value)}
          />
          <input
            className="auth-form-input"
            type="email"
            placeholder="Email"
            required
            minLength={3}
            onChange={(e) => setInPutMail(e.target.value)}
          />
          <input
            className="auth-form-input"
            type="password"
            placeholder="Password"
            required
            minLength={3}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <input
            className="auth-form-input"
            type="password"
            placeholder="Confirm password"
            required
            minLength={3}
            onChange={(e) => setInputPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[24px]">
          <button
            className="bg-main-red text-white py-[10px] cursor-pointer rounded-[10px]"
            type="submit"
          >
            {isPending ? "Processing your data..." : "Register"}
            {/* Register */}
          </button>
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
