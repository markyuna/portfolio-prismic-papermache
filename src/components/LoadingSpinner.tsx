// components/LoadingSpinner.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <Skeleton height={30} width={30} />
    </div>
  );
};

export default LoadingSpinner;
