import ImageList from './components/image-list';
import React from 'react';
import ViewModel from './ViewModel';
import { observer } from 'mobx-react-lite';
import { Box, Container, Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import Search from './components/search';

interface GalleryProps {
  viewModel: ViewModel;
}
export const Gallery = observer((props: GalleryProps) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ height: '100vh' }}>
      <Search viewModel={props.viewModel} />
      <Container maxWidth="md">
        <ImageList
          viewModel={props.viewModel}
          photos={props.viewModel.images}
          isLoading={props.viewModel.isLoading}
        ></ImageList>
        <Stack alignItems="center">
          <Pagination
            {...props.viewModel.pagination}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </Container>
    </Stack>
  );
});

export default Gallery;
