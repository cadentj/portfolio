import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import Home from './pages/Home';
import Work from './pages/Work'
import {
  Routes,
  Route,
} from "react-router-dom";
import ButtonAppBar from './components/ButtonAppBar';

export default function App() {
  return (
    <div>
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="work" element={<Work />} />
      </Routes>
    </div>
  );
}
