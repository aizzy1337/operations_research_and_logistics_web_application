import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CustomTabPanel from "./CustomTabPanel";
import V1Form from "./V1Form";


const FormCpm = () => {
  const [value, setValue] = useState(0);

  const handleChage = (e: unknown, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ border: 1, borderColor: 'gray', width: "90vw"}}>
      <AppBar position="static" color="transparent">
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
        <V1Form />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        From 2
      </CustomTabPanel>
    </Box>
  );
};

export default FormCpm;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}