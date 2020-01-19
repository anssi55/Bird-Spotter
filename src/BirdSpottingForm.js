import React, { useState } from "react";

function BirdSpottingForm() {
  const initialBirdState = {
    species: "",
    rarity: "common",
    spottedAt: new Date().toISOString()
  };
  const [spottedBird, setSpottedBird] = useState(initialBirdState);

  const handleChange = event => {
    event.persist();
    setSpottedBird(prevBird => ({
      ...prevBird,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(spottedBird);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Bird Species:
          <input
            name="species"
            type="text"
            value={spottedBird.species}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Rarity:
          <select
            value={spottedBird.rarity}
            onChange={handleChange}
            name="rarity"
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="extremely rare">Extremely rare</option>
          </select>
        </label>
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}
export default BirdSpottingForm;
