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
import { useEffect, useState } from 'react'

const OrderAmount = (props) => {
  const {handleBudgetClick} = props
  const {avg_order_amount} = props

  
  return (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            Average Order Amount
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {avg_order_amount}
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
      {/* <Button color="primary" variant="contained" id="order-amount" onClick={handleBudgetClick}>
        View
      </Button> */}
    </CardContent>
  </Card>
  )
}

export default OrderAmount;
