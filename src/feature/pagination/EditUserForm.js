import React,{useState} from 'react'
import { TextField, Button, Paper, FormControl,Input, InputLabel, FormHelperText ,Box} from "@material-ui/core";
import { useNavigate, useLocation } from 'react-router-dom';


function EditUserForm(props) {
    const {users,setUsers} = props
    let {state} = useLocation()
    const [userId, setUserId] = useState(state[0].userId);
    const [userName, setUserName] = useState(state[0].name);
    const [userCode, setUserCode] = useState(state[0].userCode);
    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        users.map((user)=>{
            if(user.userId === userId){
                user.name = userName
                user.userCode = userCode
            }
            return users
        })
        navigate("/", { state: { from: { pathname: "/editUser" } } })
    }
    return (
        <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
            <form onSubmit={submitHandler}>
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
        <Button type="submit" variant="contained" color="primary">Add</Button>
        {/* <Button onClick={() => reset()} variant={"outlined"}>Reset</Button> */}
      </form>
      </Box>

    )
}

export default EditUserForm
// id, user-id, name, user-code