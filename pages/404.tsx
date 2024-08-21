// pages/404.tsx

import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Go back to the homepage</a>
      </Link>
    </div>
  );
};

export default Custom404;
