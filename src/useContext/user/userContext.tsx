import {createContext ,useContext} from 'react';
import type { FileData } from '../../interfaces/FileData';
import type { UserType } from '../../interfaces/UserType';

export interface UserContextType {
    user:UserType;
    setAccount: (user:UserType) => void;
    setFiles?: (files: FileData[]) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};