import React, { useState } from "react";

function BirdSpottingForm() {
  const initialBirdState = {
    species: "",
    notes: "",
    rarity: "common",
    spottedAt: new Date().toISOString()
  };
  const [spottedBird, setSpottedBird] = useState(initialBirdState);
  const [spottedBirds, setSpottedBirds] = React.useState(
    JSON.parse(localStorage.getItem("spottedBirds")) || []
  );
  React.useEffect(() => {
    if (spottedBirds.length) {
      localStorage.setItem("spottedBirds", JSON.stringify(spottedBirds));
    }
  }, [spottedBirds]);

  const handleChange = event => {
    event.persist();
    setSpottedBird(prevBird => ({
      ...prevBird,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSpottedBirds([...spottedBirds, spottedBird]);
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
        <div>
          <label>
            Notes:
            <textarea
              name="notes"
              value={spottedBird.notes}
              onChange={handleChange}
            />
          </label>
        </div>
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
