import { Box, Button, Typography } from "@mui/material";
import FormCpm from "./FormCpm";

function Cpm() {

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Button
        href="/"
        variant="contained"
        sx={{ backgroundColor: "black", m: 1 }}
      >
        Home
      </Button>

      <Typography
        sx={{ fontSize: 35, textTransform: "uppercase", fontWeight: "bold" }}
      >
        Input data
      </Typography>

      <FormCpm />
    </Box>
  );
}

export default Cpm;
