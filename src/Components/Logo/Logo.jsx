import React from 'react';
import { IoLibrarySharp } from 'react-icons/io5';

const Logo = () => {
  return (
    <div>
      <h3 className='text-3xl text-primary font-bold flex gap-1.5 items-center'>
        <IoLibrarySharp />
        LibraGo
      </h3>
    </div>
  );
};

export default Logo;