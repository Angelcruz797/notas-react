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
          100: "#5983A8", 200: "#537A9C", 300: "#4C708F",
          400: "#456683", 500: "#3E5C76", 600: "#31495D",
          700: "#243544", 800: "#18242E", 900: "#0C1217",
        },
        primary: {
          100: "#2D4580", 200: "#283D72", 300: "#233564", 
          400: "#192648", 500: "#141F3A", 600: "#0F172B", 
          700: "#0E1527", 800: "#0C1323", 900: "#090E1A",
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
