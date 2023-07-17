import MUIPaper from '@mui/material/Paper';

import type { PaperProps } from './index.types';

const Paper = (props: PaperProps) => {
  const { children, className = '' } = props;
  return (
    <MUIPaper className={className} variant="outlined" elevation={3}>
      {children}
    </MUIPaper>
  );
};

export default Paper;
