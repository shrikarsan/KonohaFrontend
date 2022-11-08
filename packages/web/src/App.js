import { createTheme, ThemeProvider } from "@mui/material/styles";

import MainRouter from "routes/MainRouter";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
