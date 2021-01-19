import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  actionWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonWrapper: {
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
  contentWrap: {
    padding: 24
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 8,
    marginBottom: 8
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 12
  },
  buttonAction: {
    marginLeft: 6,
    marginRight: 6
  },
  tagsWrap: {
    display: 'flex',
    marginTop: 12
  },
  tag: {
    marginLeft: 8
  },
  chartWrap: {
    marginTop: 24,
    height: 400
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