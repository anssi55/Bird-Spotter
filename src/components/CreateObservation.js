import React, { useState, Fragment, useEffect } from "react";
import {
  Button,
  Dialog,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery
} from "@material-ui/core/";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 250
    }
  },
  form: {
    margin: theme.spacing(2),
    width: 250
  }
}));

const CreateObservation = ({ handleObservationCreate }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const initialBirdState = {
    species: "",
    notes: "",
    rarity: "common",
    spottedAt: ""
  };

  const [spottedBird, setSpottedBird] = useState(initialBirdState);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addDate = () => {
    setSpottedBird(prevBird => ({
      ...prevBird,
      spottedAt: new Date().toUTCString()
    }));
  };

  const changeValue = (event, type) => {
    event.persist();
    setSpottedBird(prevBird => ({
      ...prevBird,
      [type]: event.target.value
    }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    addDate();
    handleClose();
  };
  useEffect(() => {
    if (spottedBird.spottedAt !== "") {
      handleObservationCreate(spottedBird);
      setSpottedBird(initialBirdState);
    }
  }, [spottedBird, handleObservationCreate, initialBirdState]);

  const classes = useStyles();

  return (
    <Fragment>
      <Button onClick={handleClickOpen} variant="contained">
        <AddIcon />
        Add Observation
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="create-observation-dialog"
      >
        <DialogTitle id="create-observation-dialog">
          {"Add new bird observation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill given fields and press accept-button. Timestamp will be added
            to observation automatically.
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              autoFocus
              id="species"
              label="Species"
              type="name"
              value={spottedBird.species}
              onChange={e => changeValue(e, "species")}
              helperText=""
            />

            <div>
              <FormControl className={classes.form}>
                <InputLabel id="rarityLabel">Rarity</InputLabel>
                <Select
                  labelId="rarityLabel"
                  id="rarity"
                  value={spottedBird.rarity}
                  onChange={e => changeValue(e, "rarity")}
                >
                  <MenuItem value="common">Common</MenuItem>
                  <MenuItem value="rare">Rare</MenuItem>
                  <MenuItem value="extremely rare">Extremely rare</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              id="notes"
              label="Notes"
              multiline
              rows="5"
              placeholder="Notes about your observation"
              value={spottedBird.notes}
              onChange={e => changeValue(e, "notes")}
              helperText=""
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={e => handleSubmit(e)} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default CreateObservation;
