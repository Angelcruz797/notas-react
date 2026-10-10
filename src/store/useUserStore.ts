import { create } from "zustand";
import { persist } from 'zustand/middleware';
import type { FileData } from "../interfaces/FileData";
import type { UserType } from "../interfaces/UserType";
import { jwtDecode } from 'jwt-decode';

interface UserStore {
  user: UserType;
  searchQuery: string;
  setAccount: (user: UserType) => void;
  logout: () => void
  setFiles: (files: FileData[]) => void;
  setSearchQuery: (query: string) => void;
  isTokenValid: () => boolean;
}

const initialUser: UserType = {
  id: null,
  name: '',
  lastName: '',
  username: '',
  email: '',
  token: '',
  files: [],
};

const validateToken = (set:any, get: any): boolean => {
  const token = get().user.token;
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      
      if (decoded.exp && decoded.exp < currentTime) {
        set({ user: initialUser }); 
        return false;
      }
      return true;
    } catch (error) {
      return false; 
    }
}

export const useUserStore = create<UserStore>()(persist((set,get) => ({
  user: initialUser,
  searchQuery: "",
  setAccount: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  logout: () =>
    set({user: initialUser}),
  setFiles: (files) =>
    set((state) => ({ user: { ...state.user, files } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  isTokenValid: () => validateToken(set,get),
}),{
  name: 'user-storage',
}));