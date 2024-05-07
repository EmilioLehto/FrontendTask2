import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='TrainingApp'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/Customerlist" style={{ marginRight: '20px', color: 'inherit', textDecoration: 'none' }}>
            Customer list
          </Typography>
          <Typography variant="h6" component={Link} to="/Traininglist" style={{ marginRight: '20px',color: 'inherit', textDecoration: 'none' }}>
            Training list
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default App;
