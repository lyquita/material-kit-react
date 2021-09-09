import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { React, useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [coachname, setCoachname] = useState('');
  const [coursename, setCoursename] = useState('');
  const [placename, setPlacename] = useState('');
  const [coursedateAfter, setCoursedateAfter] = useState('');
  const [coursedateBefore, setCoursedateBefore] = useState('');
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState('');
  const [orderamount, setorderAmount] = useState('');
  const [signamount, setSignamount] = useState('');
  const [fee, setFee] = useState('');
  const params = {
    page: page + 1,
    coachname: coachname,
    coursename: coursename,
    placename: placename,
    coursedate_after: coursedateAfter,
    coursedate_before: coursedateBefore,
    starttime: starttime,
    endtime: endtime,
    orderamount: orderamount,
    signamount: signamount,
    fee: fee
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(`http://127.0.0.1:8000/course/`, { params });
      setCustomers(res);
      console.log('params', params)
    };
    fetchData();
  }, [page,coachname,coursename,placename,coursedateAfter,coursedateBefore]);

  // toolbar handle
  function searchHandler(inputValue, param) {
   console.log('props from child', inputValue, param)
  switch(param){
    case 'coachname':
      setCoachname(inputValue)
      break;
    case 'coursename':
      setCoursename(inputValue)
      break;
    case 'placename':
      setPlacename(inputValue)
      break;
    case 'coursedateAfter':
      setCoursedateAfter(inputValue)
      break;
    case 'coursedateBefore':
      setCoursedateBefore(inputValue)
      break;
    default:
      console.log('got error when using switch case')
  }

  }

  return (
    <>
      <Helmet>
        <title>Course Analysis</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar handleChange={searchHandler} />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults
              customers={customers}
              page={page}
              setPage={setPage}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerList;
