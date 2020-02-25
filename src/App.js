import React, { useState } from "react";
import BirdTable from "./components/BirdTable";
import AppHeader from "./components/AppHeader";
import { autorun } from "mobx";
import localStorage from "mobx-localstorage";

const App = () => {
  const [spottedBirds, setSpottedBirds] = useState(
    localStorage.getItem("spottedBirds") || []
  );

  const handleObservationCreate = spottedBird => {
    setSpottedBirds(prevBirds => [...prevBirds, spottedBird]);
  };

  autorun(() => {
    localStorage.setItem("spottedBirds", spottedBirds);
  });

  return (
    <>
      <AppHeader handleObservationCreate={handleObservationCreate} />

      <BirdTable birdData={spottedBirds} />
    </>
  );
};

export default App;
