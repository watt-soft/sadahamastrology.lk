import React from 'react';
import { instituteInfo } from '../data/instituteInfo';

export const InstituteHeader: React.FC = () => {
  return (
    <>
      <div className="institute-header">
        <div className="icon-container">
          <img src="/logo-sub.png" alt="Sadaham Astrology" className="institute-emblem" />
        </div>
        <div className="details">
          <h1>{instituteInfo.name}</h1>
          <p className="institute-address">{instituteInfo.address}</p>
          <p className="institute-phone">දුර: {instituteInfo.phone}</p>
        </div>
      </div>
      <div className="section-divider" aria-hidden="true">
        ✦ ✦ ✦
      </div>
    </>
  );
};
