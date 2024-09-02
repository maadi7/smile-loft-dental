// pages/404.tsx

import Link from 'next/link';
import { FC } from 'react';

const Custom404: FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <a style={{ color: 'blue', textDecoration: 'underline' }}>Go back home</a>
      </Link>
    </div>
  );
};

export default Custom404;
