import { Box, Grid, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <Grid
      item
      xs={12}
      md={6}
      style={{ color: "#ffffff", position: "relative" }}
    >
      <Box
        sx={{
          p: 4,
          position: "absolute",
          top: -30,
          left: -60,
          transform: "rotate(-30deg)",
          transformOrigin: "left top",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #FF008E, #FFCD1E, #FF565F)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: 700,
            WebkitTextFillColor: "transparent",
            p: 4,
          }}
        >
          TravaaZaap
        </Typography>
      </Box>
    </Grid>
  );
}
