import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Rating,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { Carousel, Select } from "antd";

interface Images {
  url: string;
}

interface RoomsInterface {
  id: string;
  name: string;
  longDescription: string;
  occupancy: {
    maxAdults: number;
    maxChildren: number;
    maxOverall: number;
  };
  disabledAccess: boolean;
  bedConfiguration: string;
  images: [];
  facilities: [];
}

const HotelDetails = () => {
  const state = useAppSelector((state: any) => state);
  const [selectedAdults, setSelectedAdults] = useState<number>(0);
  const [selectedChildren, setSelectedChildren] = useState<number>(0);
  const hotelDetails = state.hotelReducer.hotelDetails;
  const rooms = state.hotelReducer.rooms.rooms;

  const handleAdultChange = (value: number) => {
    setSelectedAdults(value);
  };

  const handleChildrenChange = (value: number) => {
    setSelectedChildren(value);
  };

  const filteredRooms = rooms?.filter((room: RoomsInterface) => {
    return (
      selectedAdults <= room.occupancy.maxAdults &&
      selectedChildren <= room.occupancy.maxChildren
      //   && selectedAdults + selectedChildren <= room.occupancy.maxOverall
    );
  });

  return (
    <div style={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="space-between"
        marginTop={"15px"}
        alignItems="center"
      >
        <Grid item>
          <Typography
            fontFamily={"Inter"}
            color="#000000"
            fontSize={"28px"}
            fontWeight={400}
            fontStyle={"normal"}
          >
            {hotelDetails?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "18ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  {" "}
                  <Select
                    onChange={handleAdultChange}
                    style={{ width: 240, marginRight: "10px" }}
                    placeholder="Maximum Adult Occupancy"
                    options={[
                      { value: 2, label: "2 ADULTS" },
                      { value: 1, label: "1 ADULT" },
                      { value: 0, label: "0 ADULT" },
                    ]}
                  />
                </div>
              </Box>
            </Grid>

            <Grid item>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "18ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  {" "}
                  <Select
                    onChange={handleChildrenChange}
                    style={{ width: 240, marginRight: "10px" }}
                    placeholder="Maximum Children Occupancy"
                    options={[
                      { value: 2, label: "2 CHILDREN" },
                      { value: 1, label: "1 CHILD" },
                      { value: 0, label: "0 CHILD" },
                    ]}
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "#FFF8F8",
          paddingBottom: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid
          container
          direction="row"
          spacing={2}
          marginTop={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* 1st grid */}
          <Grid
            container
            item
            spacing={2}
            xs={8}
            marginLeft={1.3}
            marginBottom={3}
          >
            <Grid item sx={{ width: "300px" }}>
              <Carousel autoplay>
                {hotelDetails?.images?.map((images: Images, index: number) => (
                  <div key={index}>
                    <img
                      style={{ height: "170px" }}
                      src={images?.url}
                      alt={`room ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          fontFamily: "Inter",
                          color: "#4E4E4E",
                          fontWeight: 500,
                          fontSize: "15px",
                        }}
                      >
                        {hotelDetails?.name}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          color: "#4E4E4E",
                          fontFamily: "Inter",
                          fontSize: "13px",
                          fontWeight: 500,
                          marginTop: "5px",
                        }}
                      >
                        {hotelDetails?.address1}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#4E4E4E",
                          fontFamily: "Inter",
                          fontSize: "13px",
                          fontWeight: 500,
                          marginTop: "5px",
                        }}
                      >
                        {hotelDetails?.address2}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#4E4E4E",
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          fontWeight: 700,
                          marginTop: "5px",
                        }}
                      >
                        ✉️{" "}
                        <span style={{ paddingLeft: "5px" }}>
                          {hotelDetails?.email}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          color: "#4E4E4E",
                          fontFamily: "Poppins",
                          fontSize: "11px",
                          fontWeight: 700,
                          marginTop: "5px",
                        }}
                      >
                        ☎️{" "}
                        <span style={{ paddingLeft: "5px" }}>
                          {hotelDetails?.telephone}
                        </span>
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Grid>
          </Grid>

          {/* Second grid */}
          <Grid item marginRight={1.2}>
            {" "}
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Rating
                        name="read-only"
                        value={Number(hotelDetails?.starRating)}
                        readOnly
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: "5px" }} />
        <React.Fragment>
          {filteredRooms?.map((room: RoomsInterface, index: number) => (
            <div key={index}>
              <Grid
                container
                direction="row"
                // spacing={2}
                marginTop={2}
                marginBottom={2}
                justifyContent="space-between"
                alignItems="center"
                wrap="nowrap"
              >
                <Grid item xs={8} marginRight={4} marginLeft={4}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    {room.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "14px",
                      paddingTop: "5px",
                    }}
                  >
                    Adults: {room.occupancy.maxAdults}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "14px",
                      paddingTop: "5px",
                    }}
                  >
                    Children: {room.occupancy.maxChildren}
                  </Typography>
                </Grid>
                <Grid
                  item
                  marginRight={4}
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "13px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  {room.longDescription}
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: "10px" }} />
            </div>
          ))}
        </React.Fragment>
      </Box>
    </div>
  );
};

export default HotelDetails;
