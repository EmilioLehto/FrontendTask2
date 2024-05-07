import { useState } from "react";
import React from "react";
import Button  from "@material-ui/core/Button";
import TextField  from "@material-ui/core/TextField";
import  Dialog  from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function Addtraining(props){

    const[open, setOpen] = useState(false);
    const[training, setTraining] = useState({
        date: '', duration: '', activity: '', customer: ''
    });

    const handleClickOpen = () => {
         setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const handleInputChange =(e) => {
        setTraining({...training, [e.target.name]: e.target.value})
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    return(
        <div>
        
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Training
            </Button>
        
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="date"
                            value={training.date}
                            onChange={e => handleInputChange(e)}
                            label="Date"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="duration"
                            value={training.duration}
                            onChange={e => handleInputChange(e)}
                            label="Duration in min"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="activity"
                            value={training.activity}
                            onChange={e => handleInputChange(e)}
                            label="Activity"
                            fullWidth
                        />
                        <TextField
                            margin="customer"
                            name="customer"
                            value={training.customer}
                            onChange={e => handleInputChange(e)}
                            label="Customer"
                            fullWidth
                        />
                    </DialogContent>
        
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addTraining} color="primary">
                    Save
                </Button>
            </DialogActions>
            </Dialog>
        
        </div>
        );
        
  
        

    }



