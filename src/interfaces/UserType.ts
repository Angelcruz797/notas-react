import type { FileData } from "./FileData";

export interface UserType {
    id:number,
    name: string;
    lastName: string;
    username: string;
    email: string;
    files: FileData[];
};