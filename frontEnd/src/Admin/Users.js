import React, { useEffect, useState } from 'react'
import './users.css'
import {DataGrid} from '@mui/x-data-grid';
import api from '../config/axiosApi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import {Delete, Edit} from '@mui/icons-material'
import MyBackDrop from '../utils/backDrop';
import { useAlert } from 'react-alert';
export default function Users() {
    const [rows, setrows] = useState({})
  const alert = useAlert();
    const [loading, setloading] = useState(true)




    const [showDeletePrompt, setshowDeletePrompt] = useState(false);
    const [userTobeDelete, setuserTobeDelete] = useState(null);
 const handleDeletePromt = ()=>{
    if(showDeletePrompt) { setuserTobeDelete(null)}
    setshowDeletePrompt(!showDeletePrompt);
    
 }
 const [refreshPageVariable, setrefreshPageVariable] = useState(0);
    // delete user
    const deleteUser = ()=>{
        api.delete(`/api/v2/users/admin/userActions/${userTobeDelete}`).then((res)=>{
            alert.success("user deleted");
            handleDeletePromt();
            setrefreshPageVariable(refreshPageVariable+1)
        }).catch((e)=>{
            alert.error(e.response.data.message || "something went wrong");
        })

    }
// update  user role


const [showEditPrompt, setshowEditPrompt] = useState(false);
const [userToBeEdit, setuserToBeEdit] = useState({id:"dummy",role:"user"});
const handleEditPrompt = ()=>{
    if(showEditPrompt){
        setuserToBeEdit({id:"dummy",role:"user"});
    }
    setshowEditPrompt(!showEditPrompt);

}
const updateUser = ()=>{

    api.put(`/api/v2/users/admin/userActions/${userToBeEdit.id}`,{role:userToBeEdit.role}).then((res)=>{
        alert.success("user updated");
        handleEditPrompt();
        setrefreshPageVariable(refreshPageVariable+1)
    }).catch((e)=>{
        alert.error(e.response.data.message || "something went wrong");
    })

}

    useEffect( () => {
     api.get('/api/v2/users/admin/allUsers').then((res)=>{
         const users = res.data.Users;
         const allrows  = [];
         users.map((item)=>{
             allrows.push({id:item._id,'name':item.name,'email':item.email,'role':item.role,});
         })
         setrows([...allrows])
setloading(false)
     })
}, [refreshPageVariable])

    const column =[
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'role', headerName: 'Role', width: 150},
        // edit
        { field: 'edit', headerName: 'Edit',sortable:false , renderCell: (cellValues) => {
            return (
                <Edit
                variant="contained"
                color="primary"
                style={{cursor:'pointer'}}
                onClick={() => {
               
                    setuserToBeEdit({id:cellValues.id,role:cellValues.row.role});
                handleEditPrompt()
                }}
              />
  
              
            );
          }},

          //delete
        { field: 'delete', headerName: 'delete',sortable:false , renderCell: (cellValues) => {
            return (
                <Delete
                variant="contained"
                color="primary"
                style={{cursor:'pointer'}}
                onClick={() => {
                    setuserTobeDelete(cellValues.id);
                 handleDeletePromt();
                }}
              />
           );
          }},

   
      ]

  return (
    <div className='userList'>
        {/* <MyBackDrop open={loading} /> */}
       <DataGrid 
    rows={rows}
    columns={column}
    loading={loading}
    autoHeight
    disableSelectionOnClick
    />

    
<Dialog 
 open={showDeletePrompt}
 onClose={handleDeletePromt}
>
    <DialogTitle>Are you sure? delete user</DialogTitle>
    <DialogContent>
        user will permanently delete and you can not undo
    </DialogContent>
    <DialogActions>
        <Button color='error' onClick={() => deleteUser()}>delele</Button>
        <Button variant='contained' onClick={()=> handleDeletePromt()}>cancel</Button>
    </DialogActions>
    </Dialog>
  


    <Dialog 
 open={showEditPrompt}
 onClose={handleEditPrompt}
 fullWidth
>
    <DialogTitle> Please select user Role</DialogTitle>
    <DialogContent>
    <FormControl fullWidth>
              <Select
                value={userToBeEdit.role}
                onChange= {(event)=>{
                    setuserToBeEdit({...userToBeEdit,role:event.target.value});
                }}
                fullWidth
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
               
              </Select>
              </FormControl>
    </DialogContent>
    <DialogActions>
        <Button color='success' onClick={() => updateUser()}>submit</Button>
        <Button  onClick={()=> handleEditPrompt()}>cancel</Button>
    </DialogActions>
    </Dialog>
  
    </div>
  )
}
