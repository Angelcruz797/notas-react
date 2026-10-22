import { Environment } from "../data/Enviroment";
import type { FileData } from "../interfaces/FileData";

export const fetchFilesAsync: (token: string | null) => Promise<FileData[]> = async (token) => {
    try {
      const response = await fetch(`${Environment.apiUrl}/api/files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true", //skip ngrok browser warning
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

export const addFileAsync: (file:{fileName:string, fileType:string},token:string | null) => Promise<FileData> =
 async (file: {fileName:string, fileType:string},token:string | null) => {
  try {
    const response = await fetch(`${Environment.apiUrl}/api/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true", //skip ngrok browser warning
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

export const findFileByIdAsync: (id:string, token:string | null) => Promise<FileData | null> = async (id:string, token:string | null) => {
  try {
    const response = await fetch(`${Environment.apiUrl}/api/files/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true", //skip ngrok browser warning
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