import { Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <GitHubIcon sx={{ mr: 1 }} />
      <Link color="inherit" href="https://github.com/xenosign">
        My Github
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
