import type { Entrance } from "@office/shared";
import { useEffect, useState } from "react";
import { EntranceForm } from "./EntranceForm";

const API = "http://localhost:3000";

export default function App() {
  const [entrances, setEntrances] = useState<Entrance[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch(`${API}/api/entrances`)
      .then((res) => res.json())
      .then((data: Entrance[]) => {
        if (!ignore) {
          setEntrances(data);
        }
      })
      .catch((err: Error) => {
        if (!ignore) {
          setError(err.message);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id: number) {
    const res = await fetch(`${API}/api/entrances/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEntrances((prev) => prev.filter((e) => e.id !== id));
      setSelectedId(null);
    } else {
      alert("Failed to delete entrance");
    }
  }

  const selectedEntrance = entrances.find((e) => e.id === selectedId);

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Office Monorepo - Entrances</h1>
      {error && <p style={{ color: "red" }}>Could not load entrances: {error}</p>}

      {selectedEntrance ? (
        <div>
          <h2>Entrance Details</h2>
          <p><strong>ID:</strong> {selectedEntrance.id}</p>
          <p><strong>Address:</strong> {selectedEntrance.address}</p>
          <p><strong>Floors:</strong> {selectedEntrance.floors}</p>
          <p><strong>Elevator:</strong> {selectedEntrance.hasElevator ? "Yes" : "No"}</p>

          <button onClick={() => handleDelete(selectedEntrance.id)} style={{ color: "red", marginRight: "1rem" }}>
            Delete
          </button>
          <button onClick={() => setSelectedId(null)}>Back to list</button>
        </div>
      ) : (
        <>
          <EntranceForm
            api={API}
            onCreated={(entrance) => setEntrances([...entrances, entrance])}
          />

          <h2>All Entrances</h2>
          <ul>
            {entrances.map((entrance) => (
              <li key={entrance.id} style={{ margin: "0.5rem 0" }}>
                <button
                  onClick={() => setSelectedId(entrance.id)}
                  style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
                >
                  {entrance.address}
                </button>
                {" "}— {entrance.floors} floors{entrance.hasElevator ? ", elevator" : ""}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}