import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginUserSchema from "../../zod/schemas/loginUserSchema";
import type { UserLoginData } from "../../types/user";
import { authService } from "../../services/api/authService";
import { useState } from "react";
import EyeClosedIcon from "../../assets/icons/eyeClosed";
import EyeOpenIcon from "../../assets/icons/eyeOpen";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema), mode: "onChange" });

  const onSubmit = async (data: UserLoginData) => {
    try {
      const user = await authService.loginUser(data);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch {
      setError("root.serverError", {
        type: "400",
        message: "Incorrect email or password!",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-4 md:px-6 py-6 md:py-10 rounded-sm shadow-md flex flex-col gap-3 md:min-w-[380px] items-center"
    >
      <p className="text-center font-bold text-lg md:text-2xl">Login</p>
      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-base">Email:</p>
        <input {...register("email")} type="text" className="input" />
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.email?.message}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm md:text-base">Password:</p>
        <div className="relative">
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            className="input"
          />
          <button
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          >
            {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.password?.message || errors.root?.serverError.message}
        </div>
      </div>
      <button className="btn md:max-w-[300px]">Submit</button>
      <p>
        Don't have an account?{" "}
        <Link to={"/register"} className="text-purple-800">
          Sign up
        </Link>
      </p>
      <Link to={"/forgot-password"} className="text-purple-800">
        Forgot password?
      </Link>
    </form>
  );
};

export default LoginForm;
