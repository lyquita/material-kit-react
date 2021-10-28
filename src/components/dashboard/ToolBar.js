import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  MenuItem,
  makeStyles,
  CardHeader,
  Divider
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Locations = [
  {
    placeid: 1,
    placename: '长寿路'
  },
  {
    placeid: 88,
    placename: '环宇荟'
  },
  {
    placeid: 84,
    placename: '世纪大道'
  },
  {
    placeid: 81,
    placename: '淮海路'
  },
  {
    placeid: 83,
    placename: '来福士'
  },
  {
    placeid: 92,
    placename: '港汇恒隆广场'
  },
  {
    placeid: 82,
    placename: '龙之梦'
  },
  {
    placeid: 93,
    placename: '太平洋'
  },
  {
    placeid: 94,
    placename: '五角场又一城'
  }
];

const useStyles = makeStyles({
  filter: {
    width: '30% !important'
  },
  itemContainer: {
    marginBottom: 30
  }
});

// 将用户输入的值 放入state中

const DashboardToolBar = (props) => {
  const { handleChange } = props;
  const { set_place_name } = props;
  const { updateTarget } = props;
  const [inputValue, setInputvalue] = useState('');
  const [targetId, setTargetid] = useState('');
  const classes = useStyles();

  const handleDateAfterChange = (date) => {
    let formatDate = format(date, 'yyyy-MM-dd');
    let targetId = 'coursedateAfter';
    setInputvalue(formatDate);
    setTargetid(targetId);
  };

  const handleDateBeforeChange = (date) => {
    let formatDate = format(date, 'yyyy-MM-dd');
    let targetId = 'coursedateBefore';
    setInputvalue(formatDate);
    setTargetid(targetId);
  };

  const handleOnChange =(e) =>{
    set_place_name(e.target.dataset.value)
    updateTarget(e.target.id)
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      ></Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader
            action={
              <Button
                size="small"
                variant="text"
              >
                Last 7 days
              </Button>
            }
            title="Location based analysis"
          />
          <Divider />
          <CardContent>
            <Box>
              <TextField
                fullWidth
                select
                label="Select Location"
                name="placename"
                className={classes.filter}
                onClick={handleOnChange}
              >
                {Locations.map((option) => (
                  <MenuItem key={option.placeid} value={option.placename} id ={option.placeid}>
                    {option.placename}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardToolBar;
