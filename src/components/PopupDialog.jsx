import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PopupDialog(props) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.msg}</DialogTitle>
      <DialogActions>
        {props.move ? (
          <>
            <Button onClick={handleClose}>아니오</Button>
            <Button
              onClick={() => {
                handleClose();
                navigate(props.href);
              }}
              autoFocus
            >
              이동
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleClose}>확인</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
