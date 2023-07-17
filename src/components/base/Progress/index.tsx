import MUIProgress from '@mui/material/LinearProgress';

import type ProgressProps from '@/components/base/Progress/index,types';

const Progress = (props: ProgressProps) => {
  const { value = 50 } = props || {};

  return (
    <MUIProgress className="w-full h-3" variant="determinate" value={value} />
  );
};

export default Progress;
