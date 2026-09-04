import React from 'react';
import { Printer, ArrowLeft } from 'lucide-react';
import type { BillData } from '../types';
import { instituteInfo } from '../data/instituteInfo';

interface BillPreviewProps {
  data: BillData;
  onBack: () => void;
}

export const BillPreview: React.FC<BillPreviewProps> = ({ data, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const advance = parseFloat(data.customAdvance) || 0;
  const balance = parseFloat(data.customBalance) || 0;
  const total = advance + balance;

  return (
    <div className="bill-preview-screen">
      <div className="bill-paper">
        <div className="bill-top-band" />

        <div className="bill-body">
          {/* Institute Info */}
          <div className="bill-institute">
            <div className="bill-institute-icon">
              <img src="/logo-sub.png" alt="Sadaham Astrology" className="bill-crest-img" />
            </div>
            <h2 className="bill-institute-name">{instituteInfo.name}</h2>
            <p className="bill-institute-address">{instituteInfo.address}</p>
            <p className="bill-institute-phone">දුර: {instituteInfo.phone}</p>
          </div>

          {/* Ornamental divider */}
          <div className="bill-ornament" aria-hidden="true">
            <span className="bill-ornament-line" />
            <span className="bill-ornament-star">✦ ✦ ✦</span>
            <span className="bill-ornament-line" />
          </div>

          {/* Customer details */}
          <div className="bill-info-grid">
            <span className="bill-info-label">දිනය:</span>
            <span className="bill-info-value">{data.date}</span>
            <span className="bill-info-label">නම:</span>
            <span className="bill-info-value">{data.customerName}</span>
          </div>

          {/* Service & Amounts */}
          <div className="bill-service-card">
            <div className="bill-service-header">
              <span className="bill-service-label">සේවාව</span>
              <span className="bill-service-name">{data.option.label}</span>
            </div>
            <div className="bill-amounts">
              <div className="bill-amount-row">
                <span className="bill-amount-name">අත්තිකාරම්</span>
                <span className="bill-amount-value">රු. {data.customAdvance || '0'}</span>
              </div>
              <div className="bill-amount-row">
                <span className="bill-amount-name">ශේෂය</span>
                <span className="bill-amount-value">රු. {data.customBalance || '0'}</span>
              </div>
              <div className="bill-amount-row total-row">
                <span className="bill-amount-name">මුළු මුදල</span>
                <span className="bill-amount-value">රු. {total}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bill-footer">
            <div className="bill-footer-stars" aria-hidden="true">✦ ✦ ✦ ✦ ✦</div>
            <p className="bill-footer-text">ස්තුතියි!</p>
          </div>
        </div>
      </div>

      {/* Action buttons — hidden on print */}
      <div className="action-buttons no-print">
        <button className="primary-button print-button" onClick={handlePrint}>
          <span className="button-inner">
            <Printer size={19} />
            <span>මුද්‍රණය කරන්න</span>
          </span>
        </button>
        <button className="secondary-button back-button" onClick={onBack}>
          <span className="button-inner">
            <ArrowLeft size={19} />
            <span>ආපසු</span>
          </span>
        </button>
      </div>
    </div>
  );
};
