import { React, useEffect, useState } from 'react';
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
import AvgOrderAmountChart from 'src/components/dashboard/AvgOrderAmountChart';
import AvgSignAmountChart from 'src/components/dashboard/AvgSignAmountChart';
import CostPerUserChart from 'src/components/dashboard/CostPerUserChart';
import OccupyRateChart from 'src/components/dashboard/OccupyRateChart';

const useStyles = makeStyles({
  filter: {
    width: '30% !important'
  },
  itemContainer: {
    marginBottom: 30
  }
});

const handleBudgetClick = (e) => {
  console.log('handleBudgetClick', e.currentTarget.id);
};

const Dashboard = () => {
  const classes = useStyles();
  const labels = [];
  const avg_order_amount = [];
  const [placeName, setPlaceName] = useState('huanyuhui');
  const [targetId, setTargetId] = useState(88);
  const [labelsState, setLabelsState] = useState(labels);
  const [avgOrderAmountData, setAvgOrderAmountData] =
    useState(avg_order_amount);
  const [avgOrderAmount, setAvgOrderAmount] = useState(0);
  const [avgSignAmount, setAvgSignAmount] = useState(0);
  const [avgCostPerUser, setAvgCostPerUser] = useState(0);
  const [avgOccupyRate, setAvgOccupyRate] = useState(0);

  function updateTargetId(value) {
    switch (value) {
      case '88':
        return setPlaceName('huanyuhui');
      case '1':
        return setPlaceName('changshou');
      case '84':
        return setPlaceName('shijidadao');
      case '81':
        return setPlaceName('huaihai');
      case '83':
        return setPlaceName('laifushi');
      case '92':
        return setPlaceName('ganghui');
      case '82':
        return setPlaceName('longzhimeng');
      case '93':
        return setPlaceName('taipingyang');
      case '94':
        return setPlaceName('wujiaochang');
      default:
        return console.log('something wrong when update target id');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        `http://127.0.0.1:8000/course/${placeName}/last_seven_days`
      );
      const result = res.data.results[0];
      // 去掉空值的对象
      Object.keys(result).forEach((item) => {
        const key = result[item];
        if (key === null || key === undefined || key === '') {
          delete result[item];
        }
      });
      const original_labels = [
        'hiphop_avg_orderamount',
        'swag_avg_orderamount',
        'choreography_avg_orderamount',
        'locking_avg_orderamount',
        'waacking_avg_orderamount',
        'popping_avg_orderamount',
        'k-pop_avg_orderamount',
        'mvdance_avg_orderamount',
        'souldance_avg_orderamount',
        'special_avg_orderamount',
        'heel_avg_orderamount',
        'girl_avg_orderamount',
        'jazz_avg_orderamount'
      ];
      const avg_order_amount_list = [
        'hiphop_avg_orderamount',
        'swag_avg_orderamount',
        'choreography_avg_orderamount',
        'locking_avg_orderamount',
        'waacking_avg_orderamount',
        'popping_avg_orderamount',
        'k-pop_avg_orderamount',
        'mvdance_avg_orderamount',
        'souldance_avg_orderamount',
        'special_avg_orderamount',
        'heel_avg_orderamount',
        'girl_avg_orderamount',
        'jazz_avg_orderamount'
      ];
      const avg_sign_amount_list = [
        'hiphop_avg_signamount',
        'swag_avg_signamount',
        'choreography_avg_signamount',
        'locking_avg_signamount',
        'waacking_avg_signamount',
        'popping_avg_signamount',
        'k-pop_avg_signamount',
        'mvdance_avg_signamount',
        'souldance_avg_signamount',
        'special_avg_signamount',
        'heel_avg_signamount',
        'girl_avg_signamount',
        'jazz_avg_signamount'
      ];

      for (const key in result) {
        if (original_labels.includes(key)) {
          labels.push(key.split('_')[0]);
        }
      }

      for (const key in result) {
        if (original_labels.includes(key)) {
          avg_order_amount.push(result[key]);
        }
      }

      setAvgOrderAmountData(avg_order_amount);
      setLabelsState(labels);
      setAvgOrderAmount(result.avg_orderamount);
      setAvgSignAmount(result.avg_signamount);
      setAvgCostPerUser(result.avg_costperuser);
      setAvgOccupyRate(result.avg_occupyrate);
    };
    fetchData();
  }, [placeName]);

  console.log('before update', placeName);
  // console.log('update id', placeName)

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
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={12}>
                  <DashboardToolBar
                    set_place_name={setPlaceName}
                    updateTarget={updateTargetId}
                  />
                  <Grid container className={classes.itemContainer}>
                    <Grid items sm={6}>
                      <OrderAmount
                        handleBudgetClick={handleBudgetClick}
                        avg_order_amount={avgOrderAmount}
                      />
                    </Grid>
                    <Grid items sm={6}>
                      <SignAmount
                        handleBudgetClick={handleBudgetClick}
                        avg_sign_amount={avgSignAmount}
                      />
                    </Grid>
                    <Grid items sm={6}>
                      <CostPerUser
                        handleBudgetClick={handleBudgetClick}
                        avg_cost_per_user={avgCostPerUser}
                      />
                    </Grid>
                    <Grid items sm={6}>
                      <OccupyRate
                        handleBudgetClick={handleBudgetClick}
                        avg_occupy_rate={avgOccupyRate}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      {/* <AverageOrderAmountChart /> */}
                      <AvgOrderAmountChart
                        labels={labelsState}
                        avg_order_amount_data={avgOrderAmountData}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <AvgSignAmountChart />
                    </Grid>
                    <Grid item sm={6}>
                      <CostPerUserChart />
                    </Grid>
                    <Grid item sm={6}>
                      <OccupyRateChart />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
