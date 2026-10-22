import { Environment } from "../data/Enviroment";

export const fetchLogin = async (loginData:{username: string, password: string}): Promise<{username: string, token: string, email: string}> => {
    try{
        const resp = await fetch(`${Environment.apiUrl}/api/Auth/login`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        const data = await resp.json();
        if(!resp.ok){
            throw new Error(data.message || 'Login failed');
        }
        return {
            username: data.userName,
            token: data.token,
            email: data.email
        };
    }catch(error){
        console.error('Error logging in:', error);
        throw error;
    }
}