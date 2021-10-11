import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';

const CostPerUser = (props) => {
  const { avg_cost_per_user } = props

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Average Cost Per User
            </Typography>
            <Typography color="textPrimary" variant="h3">
             ￥ {  Math.floor(avg_cost_per_user* 100) /100  } 
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained">
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default CostPerUser;
