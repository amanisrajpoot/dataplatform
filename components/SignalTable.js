import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';


export default function SignalTable(props) {
    const columns = [
        { id: 'status', label: '', minWidth: 130 },
        { id: 'name', label: 'Dataset Name', minWidth: 170 },
        { id: 'Features', label: 'Data Sources', minWidth: 50 },
        { id: 'Features', label: 'No. of Rows', minWidth: 110 },
        {
          id: 'time',
          label: 'Time Grain',
          minWidth: 110,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'dateupdated',
          label: 'Start Date',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'modified',
          label: 'End Date',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        { id: 'settings', label: '', minWidth: 50 },
      ];
      
      function createData(status, name, Features, time, geography, dateupdated, modified, settings) {
        return { status, name, Features, time, geography, dateupdated, modified,settings };
      }
      
      const rows = [
        createData('Ready','Cancer Patient', '03', "Quarter", "Zip","26/10/2021","26/10/2021",'settings'),
        createData('Processing','Covid Recovery', '10', "Month", "State","26/10/2021","17/10/2021",'settings'),
        createData('Ready','Survival Rate', '11', "Day", "Country","26/10/2021","10/10/2021",'settings'),
        
      ];
  

    return(
    <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{bgcolor:"#eaeff1"}}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} sx={{bgcolor:"#ffffff",}} align={column.align}>
                                {value==='Ready'? <Button variant="contained" startIcon={<CheckCircleOutlineIcon />}
                                    color="success" size="small">{value}</Button>:
                                 value==='Processing' ? <Button variant="contained" startIcon={<CachedOutlinedIcon />}
                                    size="small">{value}</Button>: 
                                 value==='Error' ? <Button variant="contained" startIcon={<CancelOutlinedIcon />}
                                    color="error" size="small">{value}</Button>:
                                 value==='settings' ? <IconButton href="/managesignaloutput">
                                      <SettingsIcon fontSize='small'/></IconButton>:
                                column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

  )
}