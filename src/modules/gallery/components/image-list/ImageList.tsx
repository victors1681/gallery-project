import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { observer } from 'mobx-react-lite';
import { Photo } from '@/networking/types';
import { IconButton, ImageListItemBar } from '@mui/material';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import ViewModel from '../../ViewModel';
import Image from 'next/image';

interface ImageListProps {
  photos: Photo[];
  isLoading: boolean;
  viewModel: ViewModel;
}

export const ImageListComponent = observer((props: ImageListProps) => {
  return (
    <Box sx={{ width: '100%', height: 480 }}>
      <ImageList variant="quilted" cols={5} gap={8}>
        {props.photos.map((item) => {
          return (
            <ImageListItem key={item.id} rows={1}>
              <Image
                width={164}
                height={200}
                src={`${item.src.medium}`}
                alt={item.alt}
                placeholder="blur"
                style={{ objectFit: 'cover' }}
                blurDataURL="/loading.gif"
              />
              <ImageListItemBar
                title={item.alt}
                subtitle={item.photographer}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    target="_blank"
                    href={item.photographer_url}
                  >
                    <MonochromePhotosIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
});

export default ImageListComponent;
