import { useState, useEffect } from 'react';
import { HealthService, type HealthResponse } from '@/services/api';

export function useHealthCheck() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;

    async function checkHealth() {
      try {
        setLoading(true);
        const result = await HealthService.check();
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    checkHealth();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
