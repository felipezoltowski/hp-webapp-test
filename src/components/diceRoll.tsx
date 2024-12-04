import React, { useState } from "react";

type fetchResponse = {
    critical_failures : number,
    failures : number,
    successes : number,
    critical_successes: number,
}

const DiceRoll: React.FC = () => {
  const [modifier, setmodifier] = useState<number | "">("");
  const [difficultyClass, setdifficultyClass] = useState<number | "">("");
  const [result, setResult] = useState<fetchResponse>({} as fetchResponse);

  async function handleSearch(){
    if (modifier === "" || difficultyClass === "") {
      alert("Por favor, preencha ambos os campos.");
      return;
    }

    const baseUrl = 'http://localhost:8080';

    try {
      const response = await fetch(
        `${baseUrl}/api/pathfinder2e/v1/distribution?modifier=${modifier}&dc=${difficultyClass}`
      );

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      
      const data = await response.json() as fetchResponse
      
      setResult(data);

    } catch (error) {
      alert(`Erro ao buscar dados: ${error}`);
      
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Pathfinder 2E Dice Odds Calculation</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Modifier:
          <input
            type="number"
            value={modifier}
            onChange={(e) => setmodifier(Number(e.target.value) || "")}
            style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Difficulty Class:
          <input
            type="number"
            value={difficultyClass}
            onChange={(e) => setdifficultyClass(Number(e.target.value) || "")}
            style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
          />
        </label>
      </div>
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Roll
      </button>
      {Object.keys(result).length !== 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <p>Critical Failure: {result.critical_failures}</p> 
          <p>Failure: {result.failures}</p> 
          <p>Success: {result.successes}</p> 
          <p>Critical Success: {result.critical_successes}</p>          
        </div>
      )}
    </div>
  );
};

export default DiceRoll;