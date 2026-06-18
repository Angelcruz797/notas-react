import { create } from "zustand";
import type { FileData } from "../interfaces/FileData";
import type { UserType } from "../interfaces/UserType";

interface UserStore {
  user: UserType;
  searchQuery: string;
  setAccount: (user: UserType) => void;
  setFiles: (files: FileData[]) => void;
  setSearchQuery: (query: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 1,
    name: "Angel",
    lastName: "Cruz",
    username: "angelcruz_.23",
    email: "angelcruz@example.com",
    files: [],
  },
  searchQuery: "",
  setAccount: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  setFiles: (files) =>
    set((state) => ({ user: { ...state.user, files } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
