import { Inter } from '@next/font/google';

import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';

const MasonryImageList = dynamic(() => import('@/modules/gallery'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <MasonryImageList />
    </div>
  );
}

interface Props {
  title: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'Gallery | Project',
    },
  };
};
