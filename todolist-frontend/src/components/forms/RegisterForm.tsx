import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerUserSchema from "../../zod/schemas/registerUserSchema";
import { useState } from "react";
import EyeClosedIcon from "../../assets/icons/eyeClosed";
import EyeOpenIcon from "../../assets/icons/eyeOpen";
import { authService } from "../../services/api/authService";
import { useNavigate } from "react-router-dom";
import type { UserRegisterData } from "../../types/user";
import Modal from "../modals/Modal";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserRegisterData) => {
    try {
      await authService.registerUser(data);
      setIsSuccessModalVisible(true);
    } catch {
      setError("root.serverError", {
        type: "400",
        message: "Registration failed",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-4 md:px-6 py-6 md:py-10 rounded-sm shadow-md flex flex-col gap-3 md:min-w-[380px] items-center"
    >
      <p className="text-center font-bold text-lg md:text-2xl">Register</p>

      <div className="flex flex-col gap-1 w-full max-w-[300px]">
        <p className="text-sm md:text-base">Username:</p>
        <input {...register("username")} type="text" className="input" />
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.username?.message}
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full max-w-[300px]">
        <p className="text-sm md:text-base">Email:</p>
        <input {...register("email")} type="text" className="input" />
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.email?.message}
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full max-w-[300px]">
        <p className="text-sm md:text-base">Password:</p>
        <div className="relative">
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            className="input w-full"
          />
          <button
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          >
            {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.password?.message}
        </div>
      </div>

      <button className="btn md:max-w-[300px]">Submit</button>
      <p>
        Already have an account?{" "}
        <Link to={"/login"} className="text-purple-800">
          Log in
        </Link>
      </p>
      {isSuccessModalVisible && (
        <Modal
          title="Success"
          text="User signed up succesfully"
          closeFunction={() => {
            setIsSuccessModalVisible(false);
            navigate("/login");
          }}
        />
      )}
    </form>
  );
};

export default RegisterForm;
