import { Typography, Breadcrumbs, Link } from "@mui/material";
// Alias the breadcumbs component because I have a component with same name
// withRouter is a higher order component that will pass updated match, location, and history props to the wrapped component whenever it renders.
import { useLocation, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const HeaderBreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathNames = location.pathname.split("/").filter((x) => x);
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {pathNames.map((name, index) => {
          const routeTo = `/`;
          const isLast = index === pathNames.length - 1;
          return isLast ? (
            <Typography
              // color="text.primary"
              sx={{
                fontFamily: "Poppins",
                fontSize: "12px",
                color: "#000000",
                fontWeight: 600,
              }}
            >
              {decodeURIComponent(name).toUpperCase()}
            </Typography>
          ) : (
            <Link
              key={name}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() => navigate(routeTo)}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: "#000000",
                  fontWeight: 400,
                }}
              >
                {decodeURIComponent(name).toUpperCase()}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default HeaderBreadCrumb;
