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
                      <OrderAmount handleBudgetClick={handleBudgetClick}/>
                    </Grid>
                    <Grid items sm={6}>
                      <SignAmount  handleBudgetClick={handleBudgetClick}/>
                    </Grid>
                    <Grid items sm={6}>
                      <CostPerUser  handleBudgetClick={handleBudgetClick} />
                    </Grid>
                    <Grid items sm={6}>
                      <OccupyRate  handleBudgetClick={handleBudgetClick}/>
                    </Grid>
                    <Grid item sm={12}>
                      {/* <AverageOrderAmountChart /> */}
                      <Sales />
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
