import type { Spell } from '../src/model/spell';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchSpells(): Promise<Spell[]> {
    const response = await fetch(`${API_BASE_URL}/getAllSpells`);

    if(response.ok){
        console.log('Data fetched succesfully!');        
    }else{
        console.log('Failed to fetch the spells data from the backend: ${response.status}');
        throw new Error('Failed to fetch the spells data from the backend: ${response.status}');
    }

    return response.json();
}