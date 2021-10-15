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


export default function SignalTable(props) {
    const columns = [
        { id: 'status', label: '', minWidth: 130 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
        {
          id: 'population',
          label: 'Population',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'Size\u00a0(km\u00b2)',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'density',
          label: 'Density',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        { id: 'settings', label: '', minWidth: 50 },
      ];
      
      function createData(status, name, code, population, size, settings) {
        const density = population / size;
        return { status, name, code, population, size, density, settings };
      }
      
      const rows = [
        createData('Ready','India', 'IN', 1324171354, 3287263,'settings'),
        createData('Processing','China', 'CN', 1403500365, 9596961,'settings'),
        createData('Error','Italy', 'IT', 60483973, 301340,'settings'),
        createData('Ready','United States', 'US', 327167434, 9833520,'settings'),
        createData('Ready','Canada', 'CA', 37602103, 9984670,'settings'),,
        createData('Processing','Australia', 'AU', 25475400, 7692024,'settings'),
        
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
                                 value==='settings' ? <SettingsIcon fontSize='small'/>:
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