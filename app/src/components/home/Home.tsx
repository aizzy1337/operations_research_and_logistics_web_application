import { Box, Button, Typography } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "40px",
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
        <Typography sx={{ fontSize: 36 }}>Choose a problem</Typography>
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
        Critical Path Method
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
        Zagadnienie Pośrednika
      </Button>
    </Box>
  );
}

export default Home;
