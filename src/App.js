import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Work from './pages/Work';
import Animation from './components/ShipAnimation';
import Intro from './pages/Intro';

import {
  Routes,
  Route,
} from "react-router-dom";
import ButtonAppBar from './components/ButtonAppBar';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Source Code Pro'
    ].join(','),
    allVariants: {
      color: 'white'
    }
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Animation />} />
        <Route path="*" element={<MainLayoutRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

const MainLayoutRoutes = () => (
  <div>
    <ButtonAppBar />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/work" element={<Work />} />
    </Routes>
  </div>
)
