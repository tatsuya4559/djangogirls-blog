import React from 'react';

type Props = {
  onClick?: () => void;
};

const Backdrop: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className="fixed left-0 top-0 w-full h-full z-40 bg-black bg-opacity-50"
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
