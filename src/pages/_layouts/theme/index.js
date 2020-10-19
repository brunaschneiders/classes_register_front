import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#243C5E',
    },
    secondary: {
      main: '#E57525',
    },
  },
  overrides: {
    MuiListItemText: {
      primary: {
        color: 'black',
      },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        title: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body: 'span',
      },
    },
  },
});
