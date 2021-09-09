import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  TableSortLabel
} from '@material-ui/core';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { property } from 'lodash';

const CustomerListResults = ({ customers, page, setPage, ...rest }) => {
  const [customerlist, setCustomerlist] = useState([]);
  const [counts, setCounts] = useState(10);
  useEffect(() => {
    if (!customers.data) {
      setCustomerlist([]);
    } else {
      setCustomerlist(customers.data);
      setCounts(customers.headers['content-range']);
    }
  }, [customers]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('coursename');
  const [rowsPerPage, setRowsPerPage] = useState(10);


// handler
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customerlist.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    console.log('limit', limit);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    console.log('wats in the event?', newPage);
  };

  const handleRequestSort = (event, property) =>{
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property)
  }

  // Pagination portion

  const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  }));

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();

    const { count, page, onPageChange, rowsPerPage } = props;
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  // Table Head
  const headCells = [
    { id: 'coachname', numeric: false, label: 'Coach Name' },
    { id: 'coursename', numeric: false, label: 'Course Name' },
    { id: 'location', numeric: false, label: 'Location' },
    { id: 'coursedate', numeric: false, label: 'Course Date' },
    { id: 'starttime', numeric: false, label: 'Start Time' },
    { id: 'endtime', numeric: false, label: 'End Time' },
    { id: 'orderamount', numeric: true, label: 'Order Amount' },
    { id: 'signamount', numeric: true, label: 'Sign Amount' },
    { id: 'fee', numeric: true, label: 'Fee' },
    { id: 'accommodateamount', numeric: true, label: 'Accommodate' },
    { id: 'occupyrate', numeric: true, label: 'Occupy Rate' },
    { id: 'costperuser', numeric:true, label:'Cost/Per Student'}
  ];

  function CustomTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) =>{
      onRequestSort(event, property);
    }
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={selectedCustomerIds.length === customers.length}
              color="primary"
              indeterminate={
                selectedCustomerIds.length > 0 &&
                selectedCustomerIds.length < customers.length
              }
              onChange={handleSelectAll}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel 
               active={orderBy === headCell.id}
               direction={orderBy === headCell.id ? order: 'asc'}
               onClick={createSortHandler(headCell.id)}
              >{headCell.label}</TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }


  // sorting logic 

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el,index) => [el,index]);
    stabilizedThis.sort((a,b)=>{
      const order = comparator(a[0],b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    })
    return stabilizedThis.map((el) => el[0])
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
    ?(a,b) => descComparator(a,b,orderBy)
    :(a,b) => - descComparator(a,b,orderBy);
  }

  function descComparator(a,b, orderBy) {
    if(b[orderBy] < a[orderBy]) {
      return -1;
    }
    if(b[orderBy] > a[orderBy]){
      return 1;
    }
    return 0;
  }

  function EmptyList(){
    return(
      <Typography>there is no data here</Typography>
    )
  }
  function ResultList(){
    return (
      <>
        {
             stableSort(customerlist, getComparator(order, orderBy))
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((row,index)=>{
               return (
                 <TableRow >
                   <TableCell padding="checkbox">
                     <Checkbox 
                     />
                   </TableCell>
                   <TableCell>{row.coachname}</TableCell>
                   <TableCell>{row.coursename}</TableCell>
                   <TableCell>{row.placename}</TableCell>
                   <TableCell>{row.coursedate}</TableCell>
                   <TableCell>{row.starttime}</TableCell>
                   <TableCell>{row.endtime}</TableCell>
                   <TableCell>{row.orderamount}</TableCell>
                   <TableCell>{row.signamount}</TableCell>
                   <TableCell>{row.fee}</TableCell>
                   <TableCell>{row.accommodateAmount}</TableCell>
                   <TableCell>{(row.orderamount/row.accommodateAmount).toFixed(2)}</TableCell>
                   <TableCell>{(row.fee/row.signamount).toFixed(2)}</TableCell>
                 </TableRow>
               )
             })
        }
      </>
    )
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <CustomTableHead order={order} orderBy={orderBy} onRequestSort = {handleRequestSort}/>
            <TableBody>

              {
                customerlist ? <ResultList /> : <EmptyList />
              }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={counts}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5,10,25,50]}
        ActionsComponent={TablePaginationActions}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.object.isRequired
};

export default CustomerListResults;
