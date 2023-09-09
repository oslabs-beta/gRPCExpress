import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';

type ButtonGroupComponentProps = {
  handleClick: (e: any) => void;
};

export default function ButtonGroupComponent({
  handleClick,
}: ButtonGroupComponentProps) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mt={4}
    >
      <ButtonGroup
        variant="outlined"
        aria-label="large outlined button group"
        sx={{ margin: 'auto' }}
      >
        <Button onClick={handleClick} value="Arthur">
          Google (GOOGL)
        </Button>
        <Button onClick={handleClick} value="Murat">
          Con Edison (ED)
        </Button>
        <Button onClick={handleClick} value="Jun">
          Microsoft (MSFT)
        </Button>
        <Button onClick={handleClick} value="Shiyu">
          Apple (AAPL)
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
