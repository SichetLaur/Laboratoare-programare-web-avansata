import { useEffect, useState } from "react";
import type { Building, Entrance } from "field-app-contract/contract";

function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [entrances, setEntrances] = useState<Entrance[]>([]);

  useEffect(() => {
    fetch("/api/buildings")
      .then((r) => r.json())
      .then((data) => setBuildings(data.buildings ?? []))
      .catch(console.error);

    fetch("/api/entrances")
      .then((r) => r.json())
      .then((data) => setEntrances(data.entrances ?? []))
      .catch(console.error);
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>Office Site</h1>
      <section>
        <h2>Buildings ({buildings.length})</h2>
        <ul>
          {buildings.map((b) => (
            <li key={b.id}>{b.label}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Entrances ({entrances.length})</h2>
        <ul>
          {entrances.map((e) => (
            <li key={e.id}>
              {e.street} {e.number} &mdash; {e.entranceName}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;