import React from 'react';
import { Moon } from 'lucide-react';
import { instituteInfo } from '../data/instituteInfo';

export const InstituteHeader: React.FC = () => {
  return (
    <>
      <div className="institute-header">
        <div className="icon-container">
          <Moon size={24} />
        </div>
        <div className="details">
          <h1>{instituteInfo.name}</h1>
          <p>{instituteInfo.address}</p>
          <p>අංකය: {instituteInfo.phone}</p>
        </div>
      </div>
      <div className="section-divider" aria-hidden="true">
        ✦ ✦ ✦
      </div>
    </>
  );
};
