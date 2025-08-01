import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/api/authService";
import Modal from "../modals/Modal";
import forgotPasswordSchema from "../../zod/schemas/forgotPasswordSchema";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await authService.sendResetPasswordEmail(data.email);
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("email", {
            type: "manual",
            message: "User with this email not found",
          });
        }
        setError("root.serverError", {
          type: "400",
          message: "Sorry, an error occurred",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-4 md:px-6 py-6 md:py-10 rounded-sm shadow-md flex flex-col gap-3 md:max-w-[350px] items-center"
    >
      <p className="text-center font-bold text-lg md:text-2xl mb-2">
        Reset Password
      </p>
      <p className="text-sm text-gray-800">
        Enter your email and we will send you a recovery link :)
      </p>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-sm md:text-base">
          Email:
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="input"
        />
        <div className="min-h-[1.5rem] text-red-500 text-sm">
          {errors.email?.message || errors.root?.serverError?.message}
        </div>
      </div>
      <button
        disabled={isSubmitting ? true : false}
        className={`btn md:max-w-[300px] ${isSubmitting && "bg-gray-300"}`}
      >
        {isSubmitting ? "Hold on..." : "Confirm"}
      </button>
      <Link to={"/login"} className="text-purple-800">
        Back to Login
      </Link>
      {isSuccessModalVisible && (
        <Modal
          title="Success"
          text="The email was sent succesfully. Check your inbox"
          closeFunction={() => setIsSuccessModalVisible(false)}
        />
      )}
    </form>
  );
};

export default ForgotPasswordForm;
