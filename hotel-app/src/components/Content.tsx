import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderBreadCrumb from "./HeaderBreadCrumb";
import Hotel from "./HotelManagement/Hotel";
import HotelDetails from "./HotelManagement/HotelDetails";
import { Grid } from "@mui/material";

function Content() {
  return (
    <Grid container>
      <HeaderBreadCrumb />
      <Routes>
        <Route path="/" element={<Hotel />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </Grid>
  );
}

export default Content;
