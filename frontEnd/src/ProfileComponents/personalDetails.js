import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Skeleton, TextField } from "@mui/material";

import { useDispatch, useSelector } from 'react-redux';
import api from '../config/axiosApi';
import { LoggedIn } from '../Redux/UserActions';
import MyBackDrop from '../utils/backDrop';
import { useAlert } from 'react-alert';
export default function PersonalDetails() {
 
    const [editingEnable, seteditingEnable] = useState(false);
   const user = useSelector((state)=>state.UserReducer);
   const [newEmail, setnewEmail] = useState(user.email);
  const [newName, setnewName] = useState(user.name);
  const [processing, setprocessing] = useState(false);
  const alert = useAlert();
   const dispatch = useDispatch();
  const updateUserProfile = ()=>{
    setprocessing(true);
      api.put('/api/v2/users/profile/updateProfile',{name:newName,email:newEmail}).then((res)=>{
        setprocessing(false);
        dispatch(LoggedIn(res.data.user));
        seteditingEnable(false)
        alert.success("user profile updated");
      }).catch((e)=>{
        setprocessing(false);
          if(e.response){
            alert.error(e.response.data.message);
          }
          else{
            alert.error("something went wrong");
            console.log(e);
          }
      })
  }
  const forgotPassword =()=>{
    setprocessing(true);
   
    api.post('/api/v2/users/password/forgot',{email:user.email}).then((res)=>{
      setprocessing(false);
      alert.success(res.data.message);
    }).catch((e)=>{
      setprocessing(false);
      if(e.response){
  
        alert.error(e.response.data.message);
      }
      else{
        console.log(e.message);
        alert.error("something went wrong")
      }
  
    })
  }
  // handle dialog
  const [dialogOpen, setdialogOpen] = useState(false);
 const handleDialog = ()=>{
setdialogOpen(!dialogOpen);
 }

 const [oldPassword, setoldPassword] = useState("");
 const [newPassword, setnewPassword] = useState("");
 const [confirmPassword, setconfirmPassword] = useState("")

 const ChangePassword = ()=>{
    setprocessing(true);
    api.put('http://localhost:4500/api/v2/users/profile/updatePassword',{oldPassword,newPassword,confirmPassword}).then((res)=>{
      setprocessing(false);
      handleDialog();
      alert.success("password changed successfully");
    }).catch((err)=>{
      setprocessing(false)
      // handleDialog();
      alert.error(err.response.data.message || "something went wrong");
    })
  }
   return (
    <div className="profile_right_personalDetails rightProfileSection">
    <div style={{ width: "100%", textAlign: "end" }}>
      <Button variant="contained" onClick={()=>{
          seteditingEnable(!editingEnable)
      }}>{editingEnable?'cancel':'edit'}</Button>
    </div>
    <div className="sectionTitleProfile">Personal Details</div>
    <div className="personalDetails">
      <TextField
         value={(editingEnable)?newName:user.name}
         onChange={(event)=>setnewName(event.target.value)}
        variant="outlined"
        disabled={!editingEnable}
        label="Full Name"
      />
    </div>
    <div className="sectionTitleProfile">Contact Details</div>
    <div className="personalDetails">
      <TextField
        value={(editingEnable)?newEmail:user.email}
        onChange={(event)=>setnewEmail(event.target.value)}
        disabled={!editingEnable}
        variant="outlined"
        label="Email"
      />
    </div>
  {(editingEnable)?
        <Button variant='contained' style={{margin:'1vmax 0'}}
        onClick={updateUserProfile}
        >Submit</Button>
    :""
    }
    <div className="sectionTitleProfile">Password</div>
    <div style={{ display: "flex", columnGap: "1vmax" }}>
      <Button variant="outlined" onClick={handleDialog}>Change Password</Button>
      <Button variant="outlined" onClick={forgotPassword}>Forgot Password</Button>
    </div>
    <Dialog open={dialogOpen} onClose={()=>setdialogOpen(!setdialogOpen)} style={{zIndex:2}}>
        <DialogTitle>update Password </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="oldpassword"
            label="old password"
            type="password"
            value={oldPassword}
            fullWidth
            variant="outlined"
            onChange={(e)=>setoldPassword(e.target.value)}
          />
          <Divider />
           <TextField
          
            margin="dense"
            id="newpassword"
            label="new password"
            type="password"
            value={newPassword}
            fullWidth
            variant="outlined"
            onChange={(e)=>setnewPassword(e.target.value)}
          />
           <TextField
          
            margin="dense"
            id="confirmPassword"
            label="confirm password"
            type="password"
            value={confirmPassword}
            fullWidth
            variant="outlined"
            onChange={(e)=>setconfirmPassword(e.target.value)}
          />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={ChangePassword}>Update</Button>
        </DialogActions>
          </Dialog>
    <MyBackDrop open={processing} />
  </div>
  )
}
