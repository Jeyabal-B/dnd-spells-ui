import { useEffect, useState } from 'react';
import { fetchSpells } from './spellService';
import type { Spell } from './model/spell';

function App() {

  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    async function loadPage() {
      try{
        const data = await fetchSpells();
        setSpells(data);
      }catch(err: any){
        setError(err.message ?? "Failed to load spells data");
      }finally{
        setLoading(false);
      }
    }

    loadPage();
  
  }, []);



  return (
    <div>
      <h1>Spellbook</h1>
      <ul>
        {spells.map((spell) => (
          <li>
            <strong>
              Spell: {spell.name}
            </strong>
            <br />
            <strong>
              Level: {spell.level}
            </strong>
            <br />
            <strong>
              School: {spell.school}
            </strong>
            <br />
            <strong>
              Source: {spell.source}
            </strong>
            <br />
            <strong>
              Casting TIme: {spell.castingTime}
            </strong>
            <br />
          </li>
        ))}
      </ul>

    </div>




  );

}

export default App