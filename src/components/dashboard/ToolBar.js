import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  makeStyles,
  CardHeader,
  Divider
} from '@material-ui/core';
import 'date-fns';

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
  const { set_place_name } = props;
  const { updateTarget } = props;
  const classes = useStyles();

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
