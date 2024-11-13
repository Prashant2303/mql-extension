import './style.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { User } from '../../types';

export function Header({ user }: { user: User }) {
  console.log('USER', user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='header' position="static">
        <Toolbar className='toolbar'>
          <a href='http://localhost:3000/' target='_blank'>
            <Typography variant="h6" component="div">
              MyQuestionList
            </Typography>
          </a>
          <Typography variant="h6" component="div">
            Hi {user?.username}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
