import { Box, Button, Typography } from "@mui/material";

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
          width: "20vw",
          textAlign: "center",
          padding: 5,
        }}
      >
        CPM
      </Button>

      <Button
        href="posrednik"
        variant="contained"
        sx={{
          width: "20vw",
          textAlign: "center",
          padding: 5,
        }}
      >
        Posrednik
      </Button>
    </Box>
  );
}

export default Home;
