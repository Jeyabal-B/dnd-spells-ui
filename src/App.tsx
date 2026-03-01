import { useEffect, useState } from 'react';
import { fetchSpells } from './spellService';
import type { Spell } from './model/spell';
import './style/spellTable.css'

function App() {

  const [spells, setSpells] = useState<Spell[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<number[]>([]);
  const [knownFilter, setKnownFilter] = useState(false);
  const [preparedFilter, setPreparedFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (key: string) => {
  setExpandedRows(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
  };

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

  const filteredSpells = spells
    .filter((spell) => {
      if(levelFilter.length > 0 && !levelFilter.includes(spell.level)){
        return false;
      }
      if(knownFilter && !spell.known){
        return false;
      }
      if(preparedFilter && !spell.prepared){
        return false;
      }
      return true;
    }) 
    .filter((spell) => {
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

  function toggleLevel(level: number) {
    setLevelFilter(previous => 
      previous.includes(level) 
      ? previous.filter(lvl => lvl != level)
      : [...previous, level]
    );
  }

  function toggleKnownOnly() {
    setKnownFilter(previous => !previous);
  }

  function togglePreparedOnly() {
    setPreparedFilter(previous => !previous);
  }

  function resetFilters() {
    setSearchTerm("");
    setLevelFilter([]);
    setKnownFilter(false);
    setPreparedFilter(false);
  }

  return (
    <div className='spellbook-container'>
      <h1>Spellbook</h1>

      <div className='spell-filter-box'>

        <div className='spell-search'>
          <input
          type='text'  
          placeholder='Type to filter spells'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='level-filter'>
          {[0,1,2,3].map(level => (
            <label key={level} style={{ marginRight: '10px'}}>
              <input
                type='checkbox'
                checked={levelFilter.includes(level)}
                onChange={() => toggleLevel(level)}
              />
              {level}
            </label>
          ))}
        </div>

        <div className='known-filter'>
          <label style={{ marginRight: '10px'}}>
            <input
              type='checkbox'
              checked={knownFilter}
              onChange={toggleKnownOnly}
            />
            Known
          </label>
        </div>

        <div className='prepared-filter'>
          <label style={{ marginRight: '10px'}}>
            <input
              type='checkbox'
              checked={preparedFilter}
              onChange={togglePreparedOnly}
            />
            Prepared
          </label>
        </div>

        <div className='reset-filter'>
          <button onClick={resetFilters}>
            Reset
          </button>
        </div>

      </div>

      <table className='spell-table'>
        <thead>
          <tr>
            <th>Spell Name</th>
            <th>Level</th>
            <th>School</th>
            {/*<th>Source</th>*/}
            <th>Mechanic</th>
            <th>Casting Time</th>
            <th>Range</th>
            <th>Duration</th>
            <th>Known</th>
            <th>Prepared</th>
            <th>Damage Types</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {filteredSpells.map((spell) => (
            <tr key={`${spell.id}-${spell.name}`}>
              <td>{spell.name}</td>
              <td>{spell.level}</td>
              <td>{spell.school}</td>
              {/*<td>{spell.source}</td>*/}
              <td>{spell.mechanic}</td>
              <td>{spell.castingTime}</td>
              <td>{spell.range}</td>
              <td>{spell.duration}</td>
              <td>{spell.known ? 'Yes' : 'No'}</td>
              <td>{spell.prepared ? 'Yes' : 'No'}</td>
              <td>{spell.damageTypes}</td>
              <td>
                <div className='spell-description'>

                  <div
                    className={
                      expandedRows[`${spell.id}-${spell.name}`]
                        ? "spell-description expanded"
                        : "spell-description collapsed"
                    }
                  >
                    {expandedRows[`${spell.id}-${spell.name}`]
                      ? spell.description
                      : spell.description.slice(0, 80) +
                      (spell.description.length > 80 ? "..." : "")}
                  </div>

                  {spell.description.length > 80 && (
                    <button
                      onClick={() => toggleRow(`${spell.id}-${spell.name}`)}
                      style={{
                        marginLeft: "8px",
                        background: "none",
                        border: "none",
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline"
                      }}
                    >
                      {expandedRows[`${spell.id}-${spell.name}`] ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>

  );

}

export default App