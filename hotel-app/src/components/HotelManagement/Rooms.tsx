import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
// import {} from "../../state/actions/supportActions"
import { useDispatch, useSelector } from "react-redux";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckIcon from "@mui/icons-material/Check";
import ReplyIcon from "@mui/icons-material/Reply";
import { Input } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";

const { TextArea } = Input;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Rooms = () => {
  const [dense, setDense] = React.useState(false);
  const [replyMenu, setReplyMenu] = React.useState(false);
  const theme = useTheme();
  const state: any = useSelector((state) => state);

  const singleSupport = state.supportReducer.singleSupport;
  const dispatch = useDispatch();

  const handleReplyMenu = () => {
    setReplyMenu(true);
  };
  return (
    <div>
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "24px",
          color: "#000000",
          fontWeight: 400,
          marginTop: "14px",
        }}
      >
        {singleSupport?.subject}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "#FFF8F8",
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
          <Grid item spacing={2}>
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="user profile" src="https://i.pravatar.cc/300" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          fontFamily: "Inter",
                          color: "#4E4E4E",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        From John Doe
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
                        }}
                      >
                        {singleSupport?.messageType}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Grid>
          </Grid>
          <Grid item>
            {" "}
            <List dense={dense}>
              <ListItem>
                <DateRangeIcon sx={{ fontSize: "18px", marginRight: "5px" }} />

                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          fontFamily: "Inter",
                          color: "#4E4E4E",
                          fontWeight: 500,
                          fontSize: "13px",
                          letterSpacing: "0.5px",
                          marginRight: "10px",
                        }}
                      >
                        {singleSupport?.date}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          fontFamily: "Inter",
                          color: "#4E4E4E",
                          fontWeight: 500,
                          fontSize: "13px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        13:45pm
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Support Body */}
        <Grid container>
          <Grid item xs={12}>
            <Item sx={{ minHeight: "300px" }}>
              <Typography
                sx={{
                  padding: "10px",
                  paddingY: "35px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  textAlign: "justify",
                }}
              >
                {singleSupport?.messageBody}
              </Typography>
            </Item>
          </Grid>
        </Grid>

        {/* Reply and resolve */}
        {!replyMenu ? (
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            sx={{ marginTop: "6px", padding: "10px" }}
          >
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<ReplyIcon />}
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  fontStyle: "normal",
                  textTransform: "none",
                }}
                onClick={handleReplyMenu}
              >
                Reply
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<CheckIcon />}
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  fontStyle: "normal",
                  textTransform: "none",
                }}
              >
                Resolved
              </Button>
            </Grid>
          </Grid>
        ) : (
          ""
        )}

        {/* Enter reply text */}
        {replyMenu ? (
          <Grid container mt={2}>
            <Grid item xs={12}>
              <Item>
                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="space-between"
                  sx={{ padding: "2px" }}
                >
                  <Grid item>
                    <List>
                      <ListItem disablePadding>
                        <ReplyIcon />
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                sx={{
                                  fontFamily: "Inter",
                                  fontSize: "13px",
                                  fontWeight: 400,
                                  color: "#4E4E4E",
                                  marginLeft: "10px",
                                }}
                              >
                                Replying Ret SILO
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {/* Form Input */}
                <Grid container item mt={2}>
                  <TextArea rows={6} placeholder="Enter your reply" />
                </Grid>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  marginTop={0.2}
                  justifyContent="space-between"
                  alignItems="center"
                  paddingBottom={4}
                  paddingX={1}
                >
                  <Grid item container xs={10} spacing={1}>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{
                          fontFamily: "Inter",
                          fontSize: "13px",
                          fontWeight: 600,
                          fontStyle: "normal",
                          textTransform: "none",
                          paddingX: "30px",
                        }}
                      >
                        Send
                      </Button>
                    </Grid>
                    <Grid item>
                      <Paper
                        elevation={6}
                        sx={{
                          padding: "7px",
                          paddingY: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <AttachFileIcon fontSize="small" />
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        elevation={6}
                        sx={{
                          padding: "7px",
                          paddingY: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        <LinkIcon fontSize="small" />
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid item spacing={2}>
                    <IconButton aria-label="delete">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default Rooms;
