import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import UseMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TimerIcon from '@mui/icons-material/Timer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import StorageIcon from '@mui/icons-material/Storage';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
    <Box
        component="span"
        sx={{ display: 'inline-block', px:2, display:'flex', 
        justifyContent:'space-between', alignItems: 'center',
        flexWrap:'wrap'}}
      >
      
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', px:2,display:'flex', alignItems: 'center', flexWrap:'wrap'}}
      >
        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
        ✩&nbsp;&nbsp;
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        Actual - Maximum Temperature
        </Typography>
      </Box>

      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', justifyContent:'space-around'}}
      >
        <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
        NOAA
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Historic Weather
        </Typography>
      </Box>

      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', justifyContent:'space-around'}}
      >
        <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
        Geo:Weather Station - USA
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Date:Day
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Available Through: 10/05/2021
        </Typography>
      </Box>

      <Typography variant="h5" component="div">
      ＋
      </Typography>
    </Box>
    </CardContent>
    
    
  </React.Fragment>
);

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = UseMediaQuery(theme.breakpoints.up('sm'));
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');

  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection:'column',py: 6, px: 14, bgcolor: 'gray'}}>
          <Box sx={{ display: 'flex', flexDirection:'row', py: 2, bgcolor: 'gray-900', justifyContent:'space-between'}}>
            <Typography color="inherit" variant="h5" component="h1">
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', justifyContent:'space-around'}}>
                    <div>MY SIGNALS &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
            </Typography>

            <Button variant="contained" size="large">
              <div style={{size:"10%"}}>+</div>
              <div>&nbsp; Create a Signal</div></Button>

          </Box>

        
        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Features</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Geography</TableCell>
            <TableCell align="right">Data Updated</TableCell>
            <TableCell align="right">Modified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Box>


      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>EXPLORE FEATURES &nbsp;</div>
                      <div><HelpOutlineIcon /></div>
                  </Box>
              </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'1', py: 2, px: 8, bgcolor: '#eaeff1'

            }}
            noValidate
            autoComplete="off"
          >
            <Box component="main" sx={{ bgcolor: '#eaeff1', minWidth: '25vw', px:2}}>
                <TextField fullWidth id="outlined-basic" label="Keyword" variant="outlined" />
            </Box>
            <Box component="main" sx={{ bgcolor: '#eaeff1',minWidth: '25vw', px:2 }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard-label"
                        value={industry}
                        label="Industry"
                        onChange={handleChangeIndustry}
                      >
                        <MenuItem value={"Select Industry"}>---Select Industry---</MenuItem>
                        <MenuItem value={'B2B Sales'}>B2B Sales</MenuItem>
                        <MenuItem value={'CPG'}>CPG</MenuItem>
                        <MenuItem value={'Healthcare'}>Healthcare</MenuItem>
                        <MenuItem value={'Insurance'}>Insurance</MenuItem>
                        <MenuItem value={'Real Estate'}>Real Estate</MenuItem>
                        <MenuItem value={'Retail'}>Retail</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
            </Box>
            <Box component="main" sx={{  bgcolor: '#eaeff1',minWidth: '25vw', px:2 }}>
                <Box sx={{  }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Analysis</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={analysis}
                        label="Analysis"
                        onChange={handleChangeAnalysis}
                      >
                        <MenuItem value={"Select Analysis"}>---Select Analysis---</MenuItem>
                        <MenuItem value={'Cassification'}>Cassification</MenuItem>
                        <MenuItem value={'Forecasting'}>Forecasting</MenuItem>
                        <MenuItem value={'Impact Analysis'}>Impact Analysis</MenuItem>
                        <MenuItem value={'Scoring'}>Scoring</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>
            </Box>
          </Box>
          </Box>
          
        </Box>

      </Box>


      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <CssBaseline />

        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>POPULAR FEATURES &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1'}}>
            <Box sx={{ minWidth: 275, pb:2,  px: 14, bgcolor: '#eaeff1'}}>
                <Card variant="outlined">{card}</Card>
            </Box>

            <Box sx={{ minWidth: 275, pb:2, px: 14, bgcolor: '#eaeff1'}}>
                <Card variant="outlined">{card}</Card>
            </Box>

            <Box sx={{ minWidth: 275, pb:2,  px: 14, bgcolor: '#eaeff1'}}>
                <Card variant="outlined">{card}</Card>
            </Box> 
              
          </Box>
          
        </Box>

        
      </Box>
    
      <Box sx={{  minHeight: '23vh', }}>
        
        <CssBaseline />
        
        <Box component="main" sx={{ flex: 1, pt:4, px: 4, bgcolor: '#ffffff' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>HELP CENTER &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>


        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          minHeight: '12vh', justifyContent:"space-around" }}>

          
          
          <Box sx={{ minWidth: 275,  px: 14, borderColor:'white', pt: 4}}>
                  <div style={{display:"flex", justifyItems: 'center', justifyContent: 'center', 
                      justifySelf:'center', flexDirection:'column', paddingTop:'5%' }}>
                    <TimerIcon />
                    <h3>GETTING STARTED</h3>
                    <p>Learn about how Ready Signal works. 
                      Information for new users.</p>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                        <p>How to Create a Signal</p>
                    </div>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                      <p>See all articles</p> 
                      &nbsp;&nbsp;<ArrowRightAltSharpIcon />
                    </div>
                  </div>
              </Box>

              <Box sx={{ minWidth: 275, pb:2, px: 14, pt: 4 }}>
              <div style={{display:"flex", justifyItems: 'center', justifyContent: 'center', 
                      justifySelf:'center', flexDirection:'column', paddingTop:'5%' }}>
                    <DateRangeIcon />
                    <h3>GEOGRAPHIC AND TIME GRAINS</h3>
                    <p>Learn what Geographic and Time grains are and how they work.</p>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                      <p>Data Grains Explained</p>
                    </div>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                      <p>See all articles</p> 
                      &nbsp;&nbsp;<ArrowRightAltSharpIcon />
                    </div>
                  </div>
              </Box>

              <Box sx={{ minWidth: 275, pb:2,  px: 14, pt: 4}}>
              <div style={{display:"flex", justifyItems: 'center', justifyContent: 'center', 
                      justifySelf:'center', flexDirection:'column', paddingTop:'5%' }}>
                    <StorageIcon />
                    <h3>DATA SCIENCE TREATMENTS</h3>
                    <p>Learn about the different data science treatments you can apply to your signals.</p>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                      <p>Overview of Data Science Treatments</p>
                    </div>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                      <p>See all articles</p> 
                      &nbsp;&nbsp;<ArrowRightAltSharpIcon />
                    </div>
                  </div>
              </Box> 
        </Box>

    </Box>  

    </ThemeProvider>
  );
}

