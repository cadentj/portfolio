import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import Home from './Home';
import ButtonAppBar from './components/ButtonAppBar';

export default function App() {
  return (
    <div>
      <ButtonAppBar/>
      <Home />
    </div>
  );
}
