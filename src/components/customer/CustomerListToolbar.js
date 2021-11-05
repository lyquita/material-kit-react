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
  Stack
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
import { useState } from 'react';
import { format } from 'date-fns';

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

// 将用户输入的值 放入state中

const CustomerListToolbar = (props) => {
  const { handleChange } = props;
  const [inputValue, setInputvalue] = useState('');
  const [targetId, setTargetid] = useState('');
  function handleInput(e) {
    console.log('child', e);

    switch (e.type) {
      case 'change':
        setInputvalue(e.target.value);
        setTargetid(e.target.id);
        console.log('e.change');
        break;
      case 'click':
        setInputvalue(e.target.value);
        setTargetid(e.target.name);
        break;
      default:
        console.log('got error when handleInput');
    }
  }
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

  function handleResetClick() {
    window.location.reload();
  }

  handleChange(inputValue, targetId);

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
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search coach name"
                variant="outlined"
                id="coachname"
                onChange={handleInput}
              />
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search course name"
                variant="outlined"
                id="coursename"
                onChange={handleInput}
              />
              <TextField
                fullWidth
                select
                label="Select Location"
                onChange={handleInput}
                name="placename"
              >
                {Locations.map((option) => (
                  <MenuItem key={option.placeid} value={option.placename}>
                    {option.placename}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="Course Date After"
                  onChange={handleDateAfterChange}
                  renderInput={(params) => <TextField {...params} />}
                  format="MM/dd/yyyy"
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="Course Date Before"
                  onChange={handleDateBeforeChange}
                  renderInput={(params) => <TextField {...params} />}
                  format="MM/dd/yyyy"
                  inputValue={inputValue}
                />
              </MuiPickersUtilsProvider>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetClick}
            >
              Reset
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
