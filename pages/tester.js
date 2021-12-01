import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ScreenLockPortraitOutlinedIcon from '@mui/icons-material/ScreenLockPortraitOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {signIn} from "../function/checkAuth";
import mixpanel from 'mixpanel-browser';
import Papa from 'papaparse'

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

const Tester =() => {
    const handleChange = event => {
        setcsvfile(event.target.files[0])
    }

    const [ csvfile, setcsvfile ] = useState({});

    const importCSV = () => {
        Papa.parse(csvfile, {
            complete: updateData,
            header: true
        });
    };

    function updateData(result) {
        var data = result.data.map(mapper=>mapper);
        console.log(data);
    }

  return (
      <div className="App">
          <h2>Import CSV File!</h2>
          <input
              className="csv-input"
              type="file"
              ref={input => {
                  const filesInput = input;
              }}
              name="file"
              placeholder={null}
              onChange={handleChange}
          />
          <p />
          <button onClick={importCSV}> Upload now!</button>
      </div>
  );
}

export default Tester;