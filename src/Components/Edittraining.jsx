import React from "react";
import { useState } from "react";
import Button  from "@material-ui/core/Button";
import TextField  from "@material-ui/core/TextField";
import  Dialog  from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";



export default function Edittraining(props){

const[open, setOpen] = useState(false);
const[training, setTraining] = useState({
    date: '', duration: '', activity: '', customer: ''
});


const handleClickOpen = () => {
    setTraining({
       date: props.training.date,
       duration: props.training.duration,
       activity: props.training.activity,
       customer: props.training.customer
    })

    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
}

const handleInputChange =(e) => {
    setTraining({...training, [e.target.name]: e.target.value})
}

const updateTraining = () => {
    props.updateTraining(training, props.training._links.self.href);
    handleClose();
}

return(
    <div>
    
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Training
        </Button>
    
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Training</DialogTitle>
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
                     {Array.isArray(props.customer) && (
            <Select
              labelId="customer-label"
              id="customer"
              name="customer"
              value={training.customer}
              onChange={handleInputChange}
              fullWidth
            >
              {props.customer.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {`${customer.firstname} ${customer.lastname}`}
                </MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>
    
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={updateTraining} color="primary">
                Save
            </Button>
        </DialogActions>
        </Dialog>
    
    </div>
    );
    
    }


