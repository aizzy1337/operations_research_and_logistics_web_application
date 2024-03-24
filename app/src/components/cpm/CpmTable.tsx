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
    <>
    <Paper sx={{textAlign: "center", padding: "10px", marginBottom: "20px"}}>
      Critical path: {nodes.criticalActivites.map( (critical) => (
        nodes.criticalActivites[nodes.criticalActivites.length-1] === critical ?
        <span>{nodes.activites[critical].name}</span> :
        <span>{nodes.activites[critical].name} - </span>
      ))}
    </Paper>
    <Paper sx={{textAlign: "center", padding: "10px", marginBottom: "20px"}}>
      Lead time: {nodes.nodes[nodes.criticalNodes[nodes.criticalNodes.length-1]].t0 - nodes.nodes[nodes.criticalNodes[0]].t0}
    </Paper>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a table">
        <TableHead>
          <TableRow sx={{backgroundColor: "#272727"}}>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>ID</TableCell>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>T0</TableCell>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>T1</TableCell>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>Reserve</TableCell>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>InnerActivites</TableCell>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>OuterActivites</TableCell>
            <TableCell align="center" sx={{color: "#AAAAAA", fontWeight: "bold", fontSize: "16px"}}>Critical</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.nodes.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: row.isCritical ? 'rgba(255, 0, 0, 0.05)' : 'inherit', //background
                color: row.isCritical ? 'white' : 'inherit', //text color
                fontWeight: row.isCritical ? 'bold' : 'normal', // font boldnesss
              }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.t0}</TableCell>
              <TableCell align="center">{row.t1}</TableCell>
              <TableCell align="center">{row.reserve}</TableCell>
              <TableCell align="center">{row.innerActivities.map((inner) => (
                <p style={{
                  color: nodes.criticalActivites.includes(inner) ? "rgba(255, 0, 0, 0.75)" : "inherit",
                  fontWeight: nodes.criticalActivites.includes(inner) ? "bold" : "normal"
                }}>{nodes.activites[inner].name} ({nodes.activites[inner].time})</p>
              ))}</TableCell>
              <TableCell align="center">{row.outerActivities.map((outer) => (
                <p style={{
                  color: nodes.criticalActivites.includes(outer) ? "rgba(255, 0, 0, 0.75)" : "inherit",
                  fontWeight: nodes.criticalActivites.includes(outer) ? "bold" : "normal"
                }}>{nodes.activites[outer].name} ({nodes.activites[outer].time})</p>
              ))}</TableCell>
              <TableCell align="center" sx={{
                color: row.isCritical ? "rgba(255, 0, 0, 0.75)" : "inherit",
                fontWeight: row.isCritical ? "bold" : "normal"}}>
                  {row.isCritical ? "Critical" : "Not Critical"}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}