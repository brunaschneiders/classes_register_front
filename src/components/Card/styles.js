import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 214,
    maxHeight: 300,
    margin: '2%',
    marginTop: 0,
    padding: '1%',
    border: `3px dotted ${theme.palette.secondary.main}`,
  },
}));
