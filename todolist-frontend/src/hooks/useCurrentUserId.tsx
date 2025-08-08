import { useState, useEffect } from "react";
import { authService } from "../services/api/authService";

export function useCurrentUserId() {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUserId(user.id);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return { userId, loading, error };
}
