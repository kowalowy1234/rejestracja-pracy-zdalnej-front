import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const NewUserModal = (props) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [])

  const handleClose = () => {
    setOpen(false);
    props.toggle();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pomyślnie utworzono nowego użytkownika"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Upewnij się o przekazaniu danych logowania odpowiedniej osobie</p>
            <p>Nazwa użytkownika: <strong>{props.username}</strong></p>
            <p>Hasło: <strong>{props.password}</strong></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewUserModal;