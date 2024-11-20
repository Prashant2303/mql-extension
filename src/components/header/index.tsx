import './style.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { User } from '@src/types';
import { APP_URL } from '@src/constants';

export function Header({ user }: { user: User }) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='header' position="static">
        <Toolbar className='toolbar'>
          <a href={APP_URL} target='_blank'>
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
