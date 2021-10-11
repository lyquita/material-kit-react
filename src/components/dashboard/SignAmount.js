import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
  import MoneyIcon from '@material-ui/icons/Money';
  import { red } from '@material-ui/core/colors';
  
  const SignAmount = (props) => {
    const { handleBudgetClick } = props
    const { avg_sign_amount } = props
    return(
    <Card
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
             Average Sign Amount
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {avg_sign_amount}
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
        <Button color="primary" variant="contained" id='sign-amount'>View</Button>
      </CardContent>
    </Card>
    )
  }
  
  export default SignAmount;
  