import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CreateObservation from "./CreateObservation";

const AppHeader = props => {
  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Bird Spotter
          </Typography>
          <CreateObservation
            handleObservationCreate={props.handleObservationCreate}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default AppHeader;
