import { createTheme } from "@mui/material/styles";

export const peepTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "2px solid #3f48d6",
          borderRadius: "unset",
          textTransform: "capitalize",
          color: "black",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root:{
          position: "relative",
        },
        edgeEnd: {
          backgroundColor: "#e1effe",
          color: "#3f48d6",
          position: "absolute",
          left: 0,
          top:0,
        },
        edgeStart: {
          backgroundColor: "#e1effe",
          color: "#3f48d6",
          position: "absolute",
          right: 0,
          top:0,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#3f48d6",
        },
      },
    },
  },
});
