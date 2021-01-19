import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 700,
    marginBottom: 8
  },
  reportContentWrapper: {
    margin: 12,
    minHeight: 400
  },
  itemReport: {
    display: 'flex',
    margin: 8
  },
  reportAuthor: {
    cursor: 'pointer'
  },
  reportReason: {
    flex: 1
  }
}))