import { makeStyles, fade } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  titlePost: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 26,
    margin: 14,
    display: 'flex',
    justifyContent: 'center'
  },
  imagePost: {
    backgroundSize: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 14,
    width: '100%',
    height: 400,    
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  tag: {
    margin: 12
  },
  createDateWrapper: {
    display: 'flex',
    margin: '12px 12px 16px 12px'
  },
  icon: {
    color: '#fff'
  },
  createDate: {
    color: '#fff',
    marginLeft: 12
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  approveButtonWrapper: {
    marginRight: 14,
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  navTabsWrapper: {
    marginTop: 12
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