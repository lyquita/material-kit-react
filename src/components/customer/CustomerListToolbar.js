import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  MenuItem,
  makeStyles
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
import { format } from 'date-fns'

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
    width: "30% !important"
  }
})

// 将用户输入的值 放入state中

const CustomerListToolbar = (props) => {
  const { handleChange } = props;
  const [inputValue, setInputvalue] = useState('');
  const [targetId, setTargetid] = useState('');
  const classes = useStyles();
  function handleInput(e) {
    console.log('child',e)

    switch(e.type){
      case 'change' :
        setInputvalue(e.target.value)
        setTargetid(e.target.id)
        console.log('e.change')
        break;
      case 'click':
        setInputvalue(e.target.value)
        setTargetid(e.target.name)
        break;
      default:
        console.log('got error when handleInput')
    }
  
  }
  const handleDateChange =(date)=>{
    let formatDate = format(date,'yyyy-MM-dd')
    let targetId = 'coursedate'
    setInputvalue(formatDate);
    setTargetid(targetId);
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
        {/* <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button>
        <Button color="primary" variant="contained">
          Add Course
        </Button> */}
      </Box>
      <Box sx={{ mt: 3}}>
        <Card>
          <CardContent>
            <Box>
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
                className={classes.filter}
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
                id="coursename"
                onChange={handleInput}
                className={classes.filter}

              />
              <TextField fullWidth select label="Select Location" onChange={handleInput} name="placename" className={classes.filter}>
                {Locations.map((option) => (
                  <MenuItem key={option.placeid} value={option.placename}>
                    {option.placename}
                  </MenuItem>
                ))}
              </TextField>
              <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.filter}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="coursedate"
                  label="Course Date Start"
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  value='coursedate'
                />
              </MuiPickersUtilsProvider>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
