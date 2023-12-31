import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,TextField, } from '@mui/material';
import { Link } from 'react-router-dom';
import PopupSignUp from './PopupSignUp';

const PopupLogIn = ({ open, onClose, forSignInPopup }) => {
  let {handlePopupSignUpOpen, isPopupSignUpOpen, handlePopupSignUpClose} = forSignInPopup;
  const [formData, setFormData] = useState({email: '',password: '',});

  const handlChange = (e) => {
    const { name, value } = e.target; // Correct destructuring
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Close the popup after form submission
    
    onClose(formData);
    setFormData({email: '',password: '',});
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>For Loging in Enter Details</DialogTitle>
      <DialogContent>
        {/* Text Input for Email */}
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          name="email"
          type="text"
          fullWidth
          value={formData.email}
          onChange={handlChange}
        />

        {/* Text Input for Password */}
        <TextField
          margin="dense"
          label="Password"
          name="password"
          type="text"
          fullWidth
          value={formData.password}
          onChange={handlChange}/>
            <div>
    <label>alredy have an acount? </label>
    <Link onClick={handlePopupSignUpOpen}>Sign up</Link>
    <PopupSignUp open={isPopupSignUpOpen} onClose={handlePopupSignUpClose} />
    </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{onClose({email:'', password:''})}} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>

      </DialogActions>
    </Dialog>
    </form>
    
    </div>
  )
}

export default PopupLogIn