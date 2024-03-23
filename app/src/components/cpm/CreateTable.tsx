import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CriticalPath from '../../interfaces/CriticalPath';

interface Props {
  nodes: CriticalPath;
}

export default function CPMTable({nodes}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">T0&nbsp;(s)</TableCell>
            <TableCell align="right">T1&nbsp;(s)</TableCell>
            <TableCell align="right">Reserve&nbsp;(s)</TableCell>
            <TableCell align="right">InnerActivites</TableCell>
            <TableCell align="right">OutterActivites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.nodes.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.t0}</TableCell>
              <TableCell align="right">{row.t1}</TableCell>
              <TableCell align="right">{row.isCritical}</TableCell>
              <TableCell align="right">{row.innerActivities}</TableCell>
              <TableCell align="right">{row.outerActivities}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}