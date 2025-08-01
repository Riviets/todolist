import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate, searchParams]);
  return (
    <div className="bg-gradient h-screen flex-center">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
