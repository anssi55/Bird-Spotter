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
        Header: () => null,
        id: "expander",
        Cell: ({ row }) => (
          <span {...row.getExpandedToggleProps()}>
            {row.isExpanded ? "🔽" : " ℹ️ "}
          </span>
        )
      },
      {
        Header: "Species",
        accessor: "species"
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
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: "16px"
        }}
      >
        <code>{"Notes: " + row.original.notes}</code>
      </pre>
    ),
    []
  );

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Link to="/newspotting">
              <button className="newSpottingButton">New Spotting</button>
            </Link>
            <BirdTable
              columns={columns}
              data={spottedBirds}
              renderRowSubComponent={renderRowSubComponent}
            />
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
