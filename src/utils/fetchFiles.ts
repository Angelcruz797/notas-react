import { Environment } from "../data/Enviroment";
import type { File } from "../useContext/user/userContext";

export const fetchFilesAsync: () => Promise<File[]> = async () => {
    try {
      const response = await fetch(`${Environment.apiUrl}/api/files`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
}

export const addFileAsync: (file:{fileName:string, fileType:string}) => Promise<File> =
 async (file: {fileName:string, fileType:string}) => {
  try {
    const response = await fetch(`${Environment.apiUrl}/api/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(file),
    });
    if (!response.ok) {
      throw new Error('Failed to add file');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding file:', error);
    throw error;
  }
}

export const findFileByIdAsync: (id:string) => Promise<File | null> = async (id:string) => {
  try {
    const response = await fetch(`${Environment.apiUrl}/api/files/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;}
}