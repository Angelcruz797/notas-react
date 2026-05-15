import {createContext ,useContext} from 'react';
import type { FileData } from '../../interfaces/FileData';

export interface UserContextType {
    user:UserType;
    setAccount: (user:UserType) => void;
    setFiles?: (files: FileData[]) => void;
}

export interface UserType {
    id:number,
    name: string;
    lastName: string;
    username: string;
    email: string;
    files: FileData[];
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};