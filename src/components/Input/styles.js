import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: 'whitesmoke',
      '&:hover, &:focus, &.Mui-focused, &:active': {
        background: 'whitesmoke',
      },
      opacity: '0.8',
    },
  })
);
