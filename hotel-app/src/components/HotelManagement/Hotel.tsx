import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { Typography, Grid, Rating, Box } from "@mui/material";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import {
  getHotels,
  setHotelDetails,
  getRooms,
} from "../../state/actions/hotelAction";

interface Hotels {
  id: string;
  name: string;
  description: string;
  address1: string;
  address2: string;
  postcode: string;
  town: string;
  countryCode: string;
  country: string;
  facilities: [];
  telephone: string;
  email: string;
  images: [];
  checkInHours: string;
  checkInMinutes: string;
  starRating: string;
  position: {};
}

const Hotel = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const hotels = state.hotelReducer.hotels;
  const [selectedStars, setSelectedStars] = useState<string>("");

  // Side effect to fetch the users
  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  const hotelColumns: Column<any>[] = [
    {
      title: "Name",
      field: "name",
      headerStyle: {
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 500,
        color: "#000000",
      },
      cellStyle: {
        color: "#000000",
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 500,
        lineHeight: "17px",
        width: 150,
      },
    },
    {
      title: "Description",
      field: "description",
      cellStyle: {
        color: "#000000",
        fontFamily: "Inter",
        fontSize: "12px",
        letterSpacing: "0.5px",
        width: 350,
        fontWeight: 400,
      },
      headerStyle: {
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 500,
        color: "#000000",
      },
      render: (row: any) =>
        row.description.length > 50
          ? row.description.substring(0, 50).concat("...")
          : row.description,
    },
    {
      title: "Primary Address",
      field: "address1",
      headerStyle: {
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 500,
        color: "#000000",
      },
      cellStyle: {
        color: "#000000",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 400,
        width: 250,
      },
    },
    {
      title: "Telephone",
      cellStyle: {
        width: 150,
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 400,
        color: "#000000",
      },

      field: "telephone",
    },
    {
      title: "Post Code",
      field: "postcode",
      cellStyle: {
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,
        fontStyle: "normal",
        width: 250,
      },
      headerStyle: {
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 500,
        color: "#000000",
      },
    },
    {
      title: "Hotel Rating",
      field: "starRating",
      cellStyle: {
        width: 200,
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,
        fontStyle: "normal",
      },
      headerStyle: {
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 500,
        color: "#000000",
      },
      render: (row: any) => (
        <Rating
          name="hotel-rating"
          value={Number(row.starRating)}
          size="small"
          readOnly
        />
      ),
    },

    {
      title: "",
      cellStyle: {
        width: 150,
      },

      field: "actions",
      render: (row: any) => (
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => handleRoom(row)}
          size="small"
        >
          Rooms
        </Button>
      ),
    },
  ];

  const handleChange = (value: string) => {
    setSelectedStars(value);
  };
  const filteredHotels: Hotels[] = hotels.filter((hotel: any) => {
    return selectedStars === "" || selectedStars <= hotel.starRating;
  });

  const handleRoom = (row: Hotels) => {
    dispatch(setHotelDetails(row));
    setTimeout(() => {
      navigate(`/hotels/${row?.name}`);
      dispatch(getRooms(row?.id));
    }, 1000);
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="space-between"
        marginTop={"15px"}
        alignItems="center"
        marginBottom={4}
      >
        <Grid item>
          <Typography
            fontFamily={"Inter"}
            color="#000000"
            fontSize={"28px"}
            fontWeight={400}
            fontStyle={"normal"}
          >
            Hotel(s)
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
                    defaultValue="Filter By Star Rating"
                    style={{ width: 240, marginRight: "10px" }}
                    placeholder="Message Type"
                    onChange={handleChange}
                    size="large"
                    options={[
                      { value: "5", label: "5 STAR" },
                      { value: "4", label: "4 STAR" },
                      { value: "3", label: "3 STAR" },
                      { value: "2", label: "2 STAR" },
                      { value: "1", label: "1 STAR" },
                    ]}
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <MaterialTable
        localization={{
          header: {
            actions: "", // remove the action header
          },
          body: {
            emptyDataSourceMessage: "No hotels to display",
            filterRow: {
              filterTooltip: "Filter",
            },
          },
        }}
        style={{ width: "100%" }}
        columns={hotelColumns}
        data={filteredHotels}
        options={{
          sorting: false,
          paging: false,
          selection: false,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          showTitle: false,
          search: false,
          toolbar: false,
          actionsColumnIndex: -1,

          rowStyle: {
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            height: "50px",
            overflowWrap: "break-word",
          },
        }}
      />
    </React.Fragment>
  );
};

export default Hotel;
