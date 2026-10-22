import { create } from "zustand";
import { persist } from 'zustand/middleware';

export type ColorModeType = {
  letters: string;
  secondary: { [key: number]: string };
  primary: { [key: number]: string };
  mode: "light" | "dark";
};

const buildColorMode = (mode: "light" | "dark"): ColorModeType =>
  mode === "dark"
    ? {
        letters: "#ffffff",
        secondary: {
          100: "#d4d4d4", 200: "#a9a9a9", 300: "#7f7f7f",
          400: "#545454", 500: "#292929", 600: "#212121",
          700: "#191919", 800: "#101010", 900: "#080808",
        },
        primary: {
          100: "#f1f5f9", 200: "#e2e8f0", 300: "#cad5e2",
          400: "#90a1b9", 500: "#62748e", 600: "#45556c",
          700: "#314158", 800: "#1d293d", 900: "#0f172b",
        },
        mode: "dark",
      }
    : {
        letters: "#000000",
        secondary: {
          100: "#f9f9f9", 200: "#f3f3f3", 300: "#ededed",
          400: "#e7e7e7", 500: "#e1e1e1", 600: "#b4b4b4",
          700: "#878787", 800: "#5a5a5a", 900: "#2d2d2d",
        },
        primary: {
          100: "#ffffff", 200: "#ffffff", 300: "#ffffff",
          400: "#ffffff", 500: "#ffffff", 600: "#cccccc",
          700: "#999999", 800: "#666666", 900: "#333333",
        },
        mode: "light",
      };

interface ColorStore {
  colors: ColorModeType;
  changeColor: () => void;
}

export const useColorStore = create<ColorStore>()(persist((set) => ({
  colors: buildColorMode("dark"),
  changeColor: () =>
    set((state) => ({
      colors: buildColorMode(state.colors.mode === "dark" ? "light" : "dark"),
    })),
}),{
  name: 'color-storage',
}));
