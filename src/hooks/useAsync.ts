import { useCallback, useEffect, useState } from 'react';
import { toUserError, UserError } from '../utils/errors';

/** Carga datos con estados claros: cargando, error amigable y reintento. */
export function useAsync<T>(load: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<UserError | null>(null);
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await load());
    } catch (e) {
      setError(toUserError(e));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, error, loading, reload: run };
}
