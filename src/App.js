import React from "react";
import "./App.css";
import NewSpotting from "./NewSpotting";
import BirdTable from "./BirdTable";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Moment from "moment";

function App() {
  let spottedBirds = [];
  spottedBirds = JSON.parse(localStorage.getItem("spottedBirds")) || [];

  const columns = React.useMemo(
    () => [
      {
        Header: "Species",
        accessor: "species"
      },
      {
        Header: "Notes",
        accessor: "notes"
      },
      {
        Header: "Rarity",
        accessor: "rarity"
      },
      {
        Header: "Spotting time",
        accessor: d => {
          return Moment(d.spottedAt).format("DD.MM.YYYY hh:mm:ss");
        }
      }
    ],
    []
  );

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <BirdTable columns={columns} data={spottedBirds} />
            <Link to="/newspotting">
              <button>New Spotting</button>
            </Link>
          </Route>
          <Route path="/newspotting">
            <NewSpotting spottedBirds={spottedBirds} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
