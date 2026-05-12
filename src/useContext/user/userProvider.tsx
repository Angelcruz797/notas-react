import { useState, type ReactNode } from "react";
import { UserContext, type File, type UserContextType, type UserType } from "./userContext";

type Props = {
  children: ReactNode;
};

export const UserProvider = ({children}: Props) => {
  const [user, setUser] = useState<UserType>({
      id: 1,
      name: 'Angel',
      lastName: 'Cruz',
      username: 'angelcruz_.23',
      email: 'angelcruz@example.com',
      files: [],
  })
    const setAccount=(newUser:UserType)=>{
      setUser(prevUser=>({
        ...prevUser,
        ...newUser,
        // files: newUser?.files || [],
      }))
    }

    const setFiles=(files: File[])=>{
      setUser(prevUser=>({
        ...prevUser,
        files: files,
      }))
    }

    const value: UserContextType = {
      user,
      setAccount,
      setFiles,
    }

return (
    <UserContext.Provider value={value}>
            {children}
    </UserContext.Provider>
)
}