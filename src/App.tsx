import { useEffect, useState } from 'react';
import { fetchSpells } from './spellService';
import type { Spell } from './model/spell';
import './style/spellTable.css'

function App() {

  const [spells, setSpells] = useState<Spell[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredSpells = spells.filter((spell) => {
    const term = searchTerm.toLowerCase();
    return (
      spell.name.toLowerCase().includes(term) || 
      spell.level.toString().toLowerCase().includes(term) || 
      spell.castingTime.toLowerCase().includes(term) || 
      spell.range.toLowerCase().includes(term) ||
      spell.school.toLowerCase().includes(term) || 
      spell.duration.toLowerCase().includes(term) || 
      spell.source.toLowerCase().includes(term) 
    );
  });

  return (
    <div className='spellbook-container'>
      <h1>Spellbook</h1>

      <input
        type='text'  
        placeholder='Type to filter spells'
        className='spell-search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className='spell-table'>
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
          {filteredSpells.map((spell) => (
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

    </div>

  );

}

export default App