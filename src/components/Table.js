import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {users} from '../feature/pagination/EmployeeData'
// import { useDemoData } from '@mui/x-data-grid-generator';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';



function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function QuickFilteringGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     maxColumns: 6,
//   });


  const [searchText, setSearchText] = React.useState('');
  const [rows, setRows] = React.useState(users.rows);
  const [pageSize, setPageSize] = React.useState(5);
  console.log("rows useState ------->",rows)

  const requestSearch = (searchValue) => {
      console.log("searched value-------->",searchValue)
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = users.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    console.log("filtered rows --->",filteredRows)
    setRows(filteredRows);
  };

//   React.useEffect(() => {
//     //   console.log(data)
//     setRows(users.rows);
//     // users.rows
//   }, []);

  return (
    //   <h1>hey</h1>
    <center>
        <Box  sx={{width: 500, height: 400, display: 'flex', flexWrap: 'wrap',}}>
            {/* <div style={{ flexGrow: 1 }}> */}
            
            <DataGrid 
                components={{ Toolbar: QuickSearchToolbar }} 
                rows={users.rows} 
                columns={users.columns} 
                componentsProps={{
                toolbar: {
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    clearSearch: () => requestSearch(''),
                },
                }} 
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} 
                rowsPerPageOptions={[5, 10, 20]}/>
            {/* </div> */}
        </Box>
    </center>
  );
}
