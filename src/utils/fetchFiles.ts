import { Environment } from "../data/Enviroment";
import type { FileData } from "../interfaces/FileData";
import { useUserStore } from "../store/useUserStore";

const token = useUserStore.getState().user.token;

export const fetchFilesAsync: () => Promise<FileData[]> = async () => {
    try {
      const response = await fetch(`${Environment.apiUrl}/api/files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }});
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

export const addFileAsync: (file:{fileName:string, fileType:string}) => Promise<FileData> =
 async (file: {fileName:string, fileType:string}) => {
  try {
    const response = await fetch(`${Environment.apiUrl}/api/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

export const findFileByIdAsync: (id:string) => Promise<FileData | null> = async (id:string) => {
  try {
    const response = await fetch(`${Environment.apiUrl}/api/files/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }});
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;}
}