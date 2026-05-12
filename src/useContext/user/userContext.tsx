import {createContext ,useContext} from 'react';

export interface UserContextType {
    user:UserType;
    setAccount: (user:UserType) => void;
    setFiles?: (files: File[]) => void;
}
 
export interface File {
  id: string;
  fileName: string;
  content: string;
  fileType: string;
  createDate: Date;
  lastUpdatedDate: Date;
}

export interface UserType {
    id:number,
    name: string;
    lastName: string;
    username: string;
    email: string;
    files: File[];
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};