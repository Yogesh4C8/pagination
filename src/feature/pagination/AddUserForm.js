import React,{useState} from 'react'
import { TextField, Button, Paper,Card, FormControl,Input, InputLabel, FormHelperText ,Box} from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import {Alert,Snackbar} from '@mui/material';
import CloseIcon from "@material-ui/icons/Close";

function AddUserForm(props) {
    const {users,setUsers} = props
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userCode, setUserCode] = useState("");
    let navigate = useNavigate()

    // material ui snackbar
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      // material ui snackbar

    const submitHandler = (e) => {
        e.preventDefault();
        setUsers([...users,{"userCode":userCode,"name":userName,"userId":userId}])
    //    { <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    //      User added successfully!
    //     </Alert>
    //   </Snackbar>}
        // navigate("/", { state: { from: { pathname: "/addUser" } } })
    }
    return (
        <Card  variant="outlined" square style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              User added successfully!
             </Alert>
           </Snackbar>
            <form onSubmit={submitHandler} style={{borderTop:"8px solid #f44326"}}>
                <h2>Add User</h2>
            <TextField
        onChange={e => setUserId(e.target.value)}
        value={userId}
        label={"Enter User Id"}
      /><br></br>
      <TextField
        onChange={e => setUserName(e.target.value)}
        value={userName}
        label={"Enter Name"}
      /><br></br>
      <TextField
        onChange={e => setUserCode(e.target.value)}
        value={userCode}
        label={"Enter User Code"}
      /><br></br>
        {/* onClick={handleSubmit(onSubmit)} */}
       <center> <Button type="submit" variant="contained" color="primary" onClick={handleClick}>Add</Button></center>
        {/* <Button onClick={() => reset()} variant={"outlined"}>Reset</Button> */}
      </form>
      
      </Card>
    )
}

export default AddUserForm
// id, user-id, name, user-code