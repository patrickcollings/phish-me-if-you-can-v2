import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FinishedDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your Results"}</DialogTitle>
        <DialogContent>
          {!!props.result && (
            <>
              <DialogContentText id="alert-dialog-description">
                Missed {props.result.missed ?? 0}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Caught {props.result.caught ?? 0}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Accidental {props.result.accidental ?? 0}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose(false);
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              props.handleClose(true);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}