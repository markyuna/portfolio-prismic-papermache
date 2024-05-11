// components/LoadingSpinner.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <Skeleton height={50} width={50} />
    </div>
  );
};

export default LoadingSpinner;
