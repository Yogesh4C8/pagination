import React,{useState} from 'react'
import { Container, makeStyles, Paper, TableBody, TableCell, TableRow,TextField} from '@material-ui/core'
import Header from '../../components/HeaderComponent';
import Table from '../../components/TableComponent';
import { usersData, headCells } from './UsersData';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        maxWidth: '60vw',
        minHeight: '50vh',
        margin: '9% auto',
        borderRadius: '35px 35px 5px 5px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        [theme.breakpoints.down('md')]:{
            maxWidth: '90vw',
        },
        [theme.breakpoints.down('sm')]:{
            overflowX: 'auto'
        }
    }
}))

const Pagination = () => {
    const [users, setUsers] = useState(usersData);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const classes = useStyles();
    let usersList = searchTerm.length < 2 ? users: searchResults
    const { TblContainer, TblHead, TblPagination, dataAfterPaging } = Table(usersList, headCells); 

    const searchHandler = (e) => {
        setSearchTerm(e.target.value)
        if(searchTerm !== "" && searchTerm.length > 2 ){
            const newUsersList = users.filter(user =>{
                return Object.values(user).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
            })
            // console.log("newuserslist---->",newUsersList)
            setSearchResults(newUsersList)
        }else{
            setSearchResults(users)
            // console.log("searchResults----->",searchResults)
        }
    }
    let renderedUsersList = dataAfterPaging().map((user) => (
        <TableRow key={user.id}>
            <TableCell align='center'>{user.userId}</TableCell>
            <TableCell align='center'>{user.name}</TableCell>
            <TableCell align='center'>{user.userCode}</TableCell>
        </TableRow>
    ))
    return (
        <Container maxWidth='xl' className={classes.root} style={{backgroundColor:"white"}}>
            <Header text='Feature/Pagination' />
            <TextField id="outlined-basic" label="Search User" variant="outlined"  value={searchTerm} onChange={searchHandler} autoComplete='off'/>
            
            <Paper className={classes.paper}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            renderedUsersList.length > 0 ? renderedUsersList : "No users found"
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        
        </Container>
    )
}

export default Pagination
