declare global {
  interface Window {
    theme: {
      setTheme: (theme: string) => void;
      getTheme: () => string;
    };
  }
}

export {};
