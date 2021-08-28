import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { React, useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [coachname, setCoachname] = useState('胤儿');
  const [placename, setPlacename] = useState('');
  const [coursedate, setCoursedate] = useState('');
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState('');
  const [orderamount, setorderAmount] = useState('');
  const [signamount, setSignamount] = useState('');
  const [fee, setFee] = useState('');
  const params = {
    page: page + 1,
    coachname: coachname,
    placename: placename,
    coursedate: coursedate,
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
  }, [page,coachname]);

  // toolbar handle
  function searchHandler(inputValue, param) {
   console.log('props from child', inputValue, param)
   if(param='coachname'){
     setCoachname(inputValue)
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
