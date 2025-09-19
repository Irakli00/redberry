import { Link } from "react-router";

function LogInForm() {
  return (
    <div className="min-w-[554px] mt-[241px]">
      <form className="flex flex-col gap-[48px] w-full">
        <h2 className="text-[42px] font-semibold">Log in</h2>
        <div className="flex flex-col gap-[24px]">
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
        </div>
        <div className="flex flex-col gap-[24px]">
          <button
            className="bg-main-red text-white py-[10px] cursor-pointer rounded-[10px]"
            type="submit"
          >
            Log in
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
