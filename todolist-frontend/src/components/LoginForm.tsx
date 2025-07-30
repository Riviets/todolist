import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginUserSchema from "../zod/schemas/loginUserSchema";
import type { UserLoginData } from "../types/user";
import { authService } from "../services/api/authService";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema), mode: "onChange" });

  const onSubmit = async (data: UserLoginData) => {
    const user = await authService.loginUser(data);
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
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
        <input {...register("password")} type="password" className="input" />
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.password?.message}
        </div>
      </div>
      <button className="btn md:max-w-[300px]">Submit</button>
    </form>
  );
};

export default LoginForm;
