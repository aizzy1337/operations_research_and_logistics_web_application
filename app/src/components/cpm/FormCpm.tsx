import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CustomTabPanel from "./CustomTabPanel";
import V1Form from "./V1Form";
import ActivityV1 from "../../interfaces/Activity";
import { theme } from "../../theme";
import V2Form from "./V2Form";
import ActivityV2 from "../../interfaces/ActivityV2";

interface props {
  handleSubmit: (a: ActivityV1[] | ActivityV2[]) => void;
  handleClear: () => void;
}

const FormCpm = ({ handleSubmit, handleClear }: props) => {
  const [value, setValue] = useState(0);

  const handleChage = (e: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "90vw" }}>
      <AppBar
        position="static"
        color="transparent"
        sx={{ backgroundColor: theme.palette.grey[900], borderRadius: 2 }}
      >
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          onChange={handleChage}
        >
          <Tab label="V1" {...a11yProps(0)} />
          <Tab label="V2" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <CustomTabPanel value={value} index={0}>
        <V1Form handleSubmit={handleSubmit} handleClear={handleClear} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <V2Form handleSubmit={handleSubmit} handleClear={handleClear} />
      </CustomTabPanel>
    </Box>
  );
};

export default FormCpm;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
