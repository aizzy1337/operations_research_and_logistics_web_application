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

export default function CpmTable({nodes}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">T0&nbsp;(s)</TableCell>
            <TableCell align="right">T1&nbsp;(s)</TableCell>
            <TableCell align="right">Reserve&nbsp;(s)</TableCell>
            <TableCell align="right">InnerActivites</TableCell>
            <TableCell align="right">OutterActivites</TableCell>
            <TableCell align="right">Critical</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.nodes.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: row.isCritical ? 'rgba(255, 0, 0, 0.1)' : 'inherit', //background
                color: row.isCritical ? 'white' : 'inherit', //text color
                fontWeight: row.isCritical ? 'bold' : 'normal', // font boldnesss
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.t0}</TableCell>
              <TableCell align="right">{row.t1}</TableCell>
              <TableCell align="right">{row.reserve}</TableCell>
              <TableCell align="right">{row.innerActivities.map((inner) => (
                <p>{nodes.activites[inner].name}</p>
              ))}</TableCell>
              <TableCell align="right">{row.outerActivities.map((outer) => (
                <p>{nodes.activites[outer].name}</p>
              ))}</TableCell>
              <TableCell align="right">{row.isCritical ? "Critical" : "Not Critical"}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}