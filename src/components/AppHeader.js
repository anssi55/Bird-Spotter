import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";

const AppHeader = () => {
  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Bird Spotter
          </Typography>

          <Button variant="contained">
            <AddIcon />
            Add Observation
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default AppHeader;
