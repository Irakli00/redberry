import { Link } from "react-router";

import CameraIcon from "../../assets/icons/camera.svg";

function RegisterForm() {
  return (
    <div className="min-w-[554px] mt-[152px]">
      <form className="flex flex-col gap-[48px] w-full">
        <h2 className="text-[42px] font-semibold">Registration</h2>
        <div className="flex items-center gap-4">
          <label
            htmlFor="avatarInput"
            className="flex items-center gap-4 cursor-pointer"
          >
            <div className="w-[100px] h-[100px] rounded-full border border-light-gray flex items-center justify-center overflow-hidden">
              <img
                src={CameraIcon}
                alt="preview"
                className="object-cover w-[20px] h-[20px]"
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
          />
        </div>

        <div className="flex flex-col gap-[24px]">
          <input
            className="auth-form-input"
            type="text"
            placeholder="Username"
            required
            minLength={3}
          />
          <input
            className="auth-form-input"
            type="email"
            placeholder="Email"
            required
            minLength={3}
          />
          <input
            className="auth-form-input"
            type="password"
            placeholder="Password"
            required
            minLength={3}
          />
          <input
            className="auth-form-input"
            type="password"
            placeholder="Confirm password"
            required
            minLength={3}
          />
        </div>
        <div className="flex flex-col gap-[24px]">
          <button
            className="bg-main-red text-white py-[10px] cursor-pointer rounded-[10px]"
            type="submit"
          >
            Register
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
