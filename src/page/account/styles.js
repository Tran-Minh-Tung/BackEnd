import { makeStyles, fade } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 700,
    marginBottom: 8
  },
  tableContainer: {
    height: 700
  },
  titleWrapper: {
    display: 'flex'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flex: 'auto'
  },
  search: {
    display: 'flex',
    height: 32,
    top: 8,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  dateInput: {
    width: '100%'
  },
  textInput: {
    marginTop: 16,
    marginBottom: 8
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  formControl: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8
  },
  modal: {
    minWidth: '90%'
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  }
}))