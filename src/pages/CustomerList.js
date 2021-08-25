import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { React, useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(`http://127.0.0.1:8000/course/?page=${page+1}`);
      setCustomers(res);
    };
    fetchData();
  }, [page]);
  console.log('pageFromChild',page)
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
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults customers={customers} page={page} setPage={setPage}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerList;
