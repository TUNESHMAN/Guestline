import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderBreadCrumb from "./HeaderBreadCrumb";
import Hotel from "./HotelManagement/Hotel";
import Dashboard from "./Dashboard/Dashboard";
import HotelDetails from "./HotelManagement/HotelDetails";
import { Grid } from "@mui/material";

function Content() {
  return (
    <Grid container>
      <HeaderBreadCrumb />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </Grid>
  );
}

export default Content;
