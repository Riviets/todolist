import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import resetPasswordSchema from "../../zod/schemas/resetPasswordSchema";
import Modal from "../modals/Modal";
import EyeClosedIcon from "../../assets/icons/eyeClosed";
import EyeOpenIcon from "../../assets/icons/eyeOpen";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/api/authService";

type ResetPasswordFormFields = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormFields>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data: ResetPasswordFormFields) => {
    try {
      await authService.resetPassword({
        newPassword: data.password,
        token: new URLSearchParams(location.search).get("token") || "",
      });
      setIsSuccessModalVisible(true);
    } catch {
      setError("root.serverError", {
        type: "500",
        message: "Sorry, an error occurred",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-4 md:px-6 py-6 md:py-10 rounded-sm shadow-md flex flex-col gap-1 md:max-w-[350px] items-center"
    >
      <p className="text-center font-bold text-lg md:text-2xl mb-2">
        Reset Password
      </p>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="password" className="text-sm md:text-base">
          New Password:
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            className="input"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          >
            {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.password?.message}
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="confirmPassword" className="text-sm md:text-base">
          Confirm Password:
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
          className="input"
        />
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.confirmPassword?.message || errors.root?.serverError?.message}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn md:max-w-[300px] ${isSubmitting && "bg-gray-300"} mb-3`}
      >
        {isSubmitting ? "Hold On" : "Submit"}
      </button>

      <Link to={"/login"} className="text-purple-800">
        Back to Login
      </Link>

      {isSuccessModalVisible && (
        <Modal
          title="Success"
          text="Your password has been reset successfully!"
          closeFunction={() => navigate("/login")}
        />
      )}
    </form>
  );
};

export default ResetPasswordForm;
