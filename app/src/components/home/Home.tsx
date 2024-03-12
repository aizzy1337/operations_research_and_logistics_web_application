import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: 5,
        }}
      >
        <Typography sx={{ fontSize: 36 }}>Home</Typography>
      </Box>

      <Button
        href="cpm"
        variant="contained"
        sx={{
          bgcolor: "#111111",
          width: "20vw",
          textAlign: "center",
          padding: 5,
        }}
      >
        CPM Link
      </Button>
      <br />

      <Paper
        elevation={3}
        sx={{
          bgcolor: "#111111",
          width: "20vw",
          textAlign: "center",
          padding: 5,
        }}
      >
        <Link to="posrednik">Posrednik Link</Link>
      </Paper>
    </Box>
  );
}

export default Home;
