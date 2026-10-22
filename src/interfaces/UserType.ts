import type { FileData } from "./FileData";

export interface UserType {
    id: string | null;
    name: string;
    lastName: string;
    username: string;
    email: string;
    files: FileData[];
};