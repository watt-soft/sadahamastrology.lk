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
          <div className="astrologer-credentials">
            {instituteInfo.credentials.map((credential) => (
              <span key={credential}>{credential}</span>
            ))}
          </div>
          <h2 className="astrologer-name">{instituteInfo.astrologerName}</h2>
          <span className="astrologer-subtitle">{instituteInfo.astrologerSubtitle}</span>
          <p className="institute-address">{instituteInfo.address}</p>
          <p className="institute-phone">දුර: {instituteInfo.phone}</p>
          <p className="institute-email">{instituteInfo.email}</p>
        </div>
      </div>
      <div className="section-divider" aria-hidden="true">
        ✦ ✦ ✦
      </div>
    </>
  );
};
