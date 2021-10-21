import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation, Route, Switch } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Download from './components/Download';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    marginTop: '5%',
    color: 'red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20%',
  },
  Button: {
    marginTop: '10%',
  },
}));
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function App() {
  const classes = useStyles();
  let history = useHistory();
  const parsedUrl = new URL(window.location);
  let query = useQuery();
  // states
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  // effect
  useEffect(() => {
    if (parsedUrl.searchParams.get('text') != null) {
      setUrl(parsedUrl.searchParams.get('text'));
    }
    if (window.location.pathname === '/') {
      setUrl('');
    } else {
      setUrl(query.get('url'));
      if (parsedUrl.searchParams.get('text') != null) {
        setUrl(parsedUrl.searchParams.get('text'));
      }
    }
  }, [window.location.pathname]);
  // function
  const handleSubmit = () => {
    if (url === '' || !url.includes('https') || !url.includes('yout')) {
      alert('Please enter a valid Youtube URL...');
    } else {
      if (url.includes('www')) {
        history.push(`/download?url=${url.replace('www.', '')}`);
      } else {
        history.push(`/download?url=${url}`);
      }
      setLoading(true);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className={classes.app} noValidate>
      <div className={classes.title} onClick={() => history.push('/')}>
        <YouTubeIcon style={{ fontSize: '128px' }} />
        <h1 style={{ marginTop: '0px' }}>Youtube Downloader</h1>
      </div>
      <form className={classes.form}>
        <TextField
          id='outlined-basic'
          variant='outlined'
          label='Enter YouTube URL...'
          type='url'
          required
          onChange={handleUrlChange}
          value={url}
        />
        <Button
          onClick={handleSubmit}
          variant='outlined'
          color='primary'
          className={classes.Button}
        >
          Download
        </Button>
      </form>
      <Switch>
        <Route path='/download'>
          <Download
            setInputUrl={setUrl}
            loading={loading}
            setLoading={setLoading}
          />
        </Route>
      </Switch>

      {/* <Seo /> */}
    </div>
  );
}

export default App;
