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

  if(loading) return <p>Loading spells..</p>
  if(error) return <p>Error occured: {error}</p>

  return (
    <div>
      <h1>Spellbook</h1>

      <table>
        <thead>
          <tr>
            <th>Spell Name</th>
            <th>Level</th>
            <th>School</th>
            <th>Source</th>
            <th>Casting Time</th>
            <th>Range</th>
            <th>Duration</th>
            <th>Known</th>
            <th>Prepared</th>
            <th>Damage Types</th>
          </tr>
        </thead>

        <tbody>
          {spells.map((spell) => (
            <tr key={spell.id}>
              <td>{spell.name}</td>
              <td>{spell.level}</td>
              <td>{spell.school}</td>
              <td>{spell.source}</td>
              <td>{spell.castingTime}</td>
              <td>{spell.range}</td>
              <td>{spell.duration}</td>
              <td>{spell.known}</td>
              <td>{spell.prepared}</td>
              <td>{spell.damageTypes}</td>
            </tr>
          ))}

        </tbody>
      </table>

      <h2>to be removed soon...</h2>


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