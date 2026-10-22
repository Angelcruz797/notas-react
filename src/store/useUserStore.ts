import { create } from "zustand";
import { persist } from 'zustand/middleware';
import type { FileData } from "../interfaces/FileData";
import type { UserType } from "../interfaces/UserType";
import { jwtDecode } from 'jwt-decode';

interface UserStore {
  user: UserType;
  token: string | null;
  searchQuery: string;
  validToken: boolean;
  setAccount: (user: UserType) => void;
  logout: () => void
  setFiles: (files: FileData[]) => void;
  setToken: (token: string) => void;
  setSearchQuery: (query: string) => void;
  isTokenValid: () => boolean;
}

const initialUser: UserType = {
  id: null,
  name: '',
  lastName: '',
  username: '',
  email: '',
  files: [],
};

const validateToken = (set:any, get: any): boolean => {
  const token = get().token;
    if (!token) {
      get().logout();
      set({ validToken: false });
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;       
      if (decoded.exp && decoded.exp < currentTime) {
        get().logout();
        set({ validToken: false });
        return false;
      }
      set({ validToken: true });
      return true;
    } catch (error) {
      set({ validToken: false });
      return false; 
    }
}

export const useUserStore = create<UserStore>()(persist((set,get) => ({
  user: initialUser,
  token: null,
  searchQuery: "",
  validToken:false,
  setAccount: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  logout: () =>
    set({user: initialUser,token: null}),
  setFiles: (files) =>
    set((state) => ({ user: { ...state.user, files } })),
  setToken: (token) => set(() => ({ token })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  isTokenValid: () => validateToken(set,get),
}),{
  name: 'user-storage',
  partialize: (state) => ({ user: state.user, token: state.token }),
}));