import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoxActions = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
`
);

export default BoxActions;
