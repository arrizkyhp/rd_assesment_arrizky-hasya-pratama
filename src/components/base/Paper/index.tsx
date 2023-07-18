import MUIPaper from '@mui/material/Paper';

import type { PaperProps } from './index.types';

const Paper = (props: PaperProps) => {
  const { children, className = '' } = props;

  return (
    <MUIPaper className={className} variant="outlined">
      {children}
    </MUIPaper>
  );
};

export default Paper;
