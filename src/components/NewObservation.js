import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NewObservation.css";

function NewObservation(props) {
  const history = useHistory();
  const initialBirdState = {
    species: "",
    notes: "",
    rarity: "common",
    spottedAt: new Date().toUTCString()
  };

  const [spottedBird, setSpottedBird] = useState(initialBirdState);
  const [speciesError, setSpeciesError] = useState("");

  const saveObservations = () => {
    props.spottedBirds.unshift(spottedBird);
    try {
      localStorage.setItem("spottedBirds", JSON.stringify(props.spottedBirds));
    } catch (error) {
      throw error;
    }
  };

  const speciesIsValid = () => {
    if (spottedBird.species.length < 2) {
      setSpeciesError("Species is too short. Minimum 2 letters.");
      return false;
    } else if (spottedBird.species.length > 50) {
      setSpeciesError("Species is too long. Maximum 50 letters.");
      return false;
    } else {
      setSpeciesError("");
      return true;
    }
  };

  const handleChange = event => {
    event.persist();
    setSpottedBird(prevBird => ({
      ...prevBird,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (speciesIsValid()) {
      try {
        saveObservations();
        history.push("/");
      } catch {
        alert("Local storage not working");
      }
    }
  };
  const handleCancel = event => {
    history.push("/");
  };

  return (
    <>
      <form>
        <div>
          <label>
            Bird Species:
            <input
              name="species"
              type="text"
              minLength="2"
              value={spottedBird.species}
              onChange={handleChange}
            />
          </label>
          <div className="error">{speciesError}</div>
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
        <div className="submitDiv">
          <button className="cancelButton" onClick={handleCancel} type="button">
            Cancel
          </button>
          <button className="submitButton" onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
export default NewObservation;
