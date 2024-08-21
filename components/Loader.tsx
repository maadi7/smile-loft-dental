import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 flex items-center justify-center space-x-4 z-50">
      <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-0"></div>
      <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-1"></div>
      <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-2"></div>
    </div>
  );
};

export default Loader;
