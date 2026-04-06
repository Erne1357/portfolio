import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function usePortfolioData<T>(endpoint: string): FetchState<T> {
  const { lang } = useLang();
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true }));

    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${endpoint}${separator}lang=${lang}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [endpoint, lang]);

  return state;
}
