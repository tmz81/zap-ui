import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ textAlign: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #FF008E, #FFCD1E)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              WebkitTextFillColor: "transparent",
              pt: 2,
            }}
          >
            SendMessage
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
