import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import DashboardToolBar from 'src/components/dashboard/ToolBar';
import { makeStyles } from '@material-ui/core';
import OrderAmount from 'src/components/dashboard/OrderAmount';
import SignAmount from 'src/components/dashboard/SignAmount';
import CostPerUser from 'src/components/dashboard/CostPerUser';
import OccupyRate from 'src/components/dashboard/OccupyRate';
import AverageOrderAmountChart from 'src/components/dashboard/AverageOrderAmountChart';

const useStyles = makeStyles({
  filter: {
    width: '30% !important'
  },
  itemContainer: {
    marginBottom: 30
  }
});

const handleBudgetClick = (e) =>{
    console.log('handleBudgetClick', e.currentTarget.id)
}


const Dashboard = () => {
  const classes = useStyles();
  const labels = [];
  const avg_order_amount = [];

  const [labelsState, setLabelsState] = useState(labels)
  const [avgOrderAmountData, setAvgOrderAmountData] = useState(avg_order_amount)
  const [avgOrderAmount, setAvgOrderAmount] = useState(0)
  const [avgSignAmount, setAvgSignAmount] =useState(0)
  const [avgCostPerUser, setAvgCostPerUser] = useState(0)
  const [avgOccupyRate, setAvgOccupyRate] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(`http://127.0.0.1:8000/course/huanyuhui/last_seven_days`);
      const result = res.data.results[0]
      // 去掉空值的对象
      Object.keys(result).forEach((item)=>{
        const key = result[item]
        if(key === null || key === undefined || key === ''){
          delete result[item]
        }
      })
      const original_labels = ['hiphop_avg_orderamount','swag_avg_orderamount','choreography_avg_orderamount', 'locking_avg_orderamount', 'waacking_avg_orderamount', 'popping_avg_orderamount','k-pop_avg_orderamount','mvdance_avg_orderamount','souldance_avg_orderamount', 'special_avg_orderamount', 'heel_avg_orderamount', 'girl_avg_orderamount','jazz_avg_orderamount'];
      const avg_order_amount_list = ['hiphop_avg_orderamount','swag_avg_orderamount','choreography_avg_orderamount', 'locking_avg_orderamount', 'waacking_avg_orderamount', 'popping_avg_orderamount','k-pop_avg_orderamount','mvdance_avg_orderamount','souldance_avg_orderamount', 'special_avg_orderamount', 'heel_avg_orderamount', 'girl_avg_orderamount','jazz_avg_orderamount'];
      const avg_sign_amount_list = ['hiphop_avg_signamount','swag_avg_signamount','choreography_avg_signamount', 'locking_avg_signamount', 'waacking_avg_signamount', 'popping_avg_signamount','k-pop_avg_signamount','mvdance_avg_signamount','souldance_avg_signamount', 'special_avg_signamount', 'heel_avg_signamount', 'girl_avg_signamount','jazz_avg_signamount']




      for (const key in result){
        if(original_labels.includes(key)){
          labels.push(key.split('_')[0])
        }
      }

      for (const key in result){
        if(original_labels.includes(key)){
          avg_order_amount.push(result[key])
        }
      }

      setAvgOrderAmountData(avg_order_amount)
      setLabelsState(labels)
      setAvgOrderAmount(result.avg_orderamount)
      setAvgSignAmount(result.avg_signamount)
      setAvgCostPerUser(result.avg_costperuser)
      setAvgOccupyRate(result.avg_occupyrate)

    
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3} direction="row">
            <Grid item sm={6}>
              <Grid container>
                <Grid item sm={12}>
                  <DashboardToolBar />
                  <Grid container className={classes.itemContainer}>
                    <Grid items sm={6}>
                      <OrderAmount handleBudgetClick={handleBudgetClick} avgOrderAmount={avgOrderAmount}/>
                    </Grid>
                    <Grid items sm={6}>
                      <SignAmount  handleBudgetClick={handleBudgetClick} avgSignAmount={avgSignAmount}/>
                    </Grid>
                    <Grid items sm={6}>
                      <CostPerUser  handleBudgetClick={handleBudgetClick} avgCostPerUser={avgCostPerUser}/>
                    </Grid>
                    <Grid items sm={6}>
                      <OccupyRate  handleBudgetClick={handleBudgetClick} avgOccupyRate={avgOccupyRate}/>
                    </Grid>
                    <Grid item sm={12}>
                      {/* <AverageOrderAmountChart /> */}
                      <Sales labels = {labelsState} avgOrderAmountData = {avgOrderAmountData} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <DashboardToolBar />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
