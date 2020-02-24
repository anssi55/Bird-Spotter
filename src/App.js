import React, { useState } from "react";
import BirdTable from "./components/BirdTable";
import AppHeader from "./components/AppHeader";

const App = () => {
  const [spottedBirds, setSpottedBirds] = useState([]);

  const handleObservationCreate = spottedBird => {
    setSpottedBirds(prevBirds => [...prevBirds, spottedBird]);
  };

  return (
    <>
      <AppHeader handleObservationCreate={handleObservationCreate} />

      <BirdTable birdData={spottedBirds} />
    </>
  );
};

export default App;
