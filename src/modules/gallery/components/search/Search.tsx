'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Photo } from '@/networking/types';
import { FormControl, Input, InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ViewModel from '../../ViewModel';

interface SearchProps {
  viewModel: ViewModel;
}
export const Search = observer((props: SearchProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        background:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgb(0 0 0 / 42%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ height: '100%' }}
      >
        <FormControl variant="standard" sx={{ width: '50%' }}>
          <Input
            onChange={props.viewModel.handleSearch}
            onKeyDown={props.viewModel.handleEnter}
            value={props.viewModel.searchValue}
            size="medium"
            placeholder="Image search..."
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>
    </Box>
  );
});
export default Search;
