import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  MenuItem
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
    setInputvalue(e.target.value)
    setTargetid(e.target.id)
  }

  handleChange(inputValue, targetId);

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button>
        <Button color="primary" variant="contained">
          Add Course
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
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
                id='coachname'
                onChange={handleInput}
                // onChange = {handleChange('kyomo', 'coachname')}
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
              />
              <TextField fullWidth select label="Select Location">
                {Locations.map((option) => (
                  <MenuItem key={option.placeid} value={option.placename}>
                    {option.placename}
                  </MenuItem>
                ))}
              </TextField>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="course-date-start"
                  label="Course Date Start"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="course-date-end"
                  label="Course Date End"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button>Submit</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
