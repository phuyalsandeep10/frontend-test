import React from 'react';

const InformationsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
      {children}
    </div>
  );
};

export default InformationsWrapper;
