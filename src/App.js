import React,{useState} from 'react'
import theme from './styles/theme';
import UsersList from './feature/pagination/UsersList'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import Table from './components/Table'
import { ThemeProvider } from '@material-ui/styles';
import AddUserForm from './feature/pagination/AddUserForm';
import EditUserForm from './feature/pagination/EditUserForm';
import { usersData } from './feature/pagination/UsersData';



function App() {
  const [users, setUsers] = useState(usersData);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<UsersList users={users} setUsers={setUsers}/>} />
          <Route path="addUser" element={<AddUserForm users={users} setUsers={setUsers}/>} />
          <Route path="editUser" 
          element={<EditUserForm users={users} setUsers={setUsers}/>}
          />
        </Routes>
    </Router>
      {/* <Table /> */}
    </ThemeProvider>
  )
}

export default App
