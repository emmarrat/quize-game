import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
        fullWidth: true,
      }
    }
  }
});

export default theme;