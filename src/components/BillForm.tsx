import React, { useState } from 'react';
import { serviceOptions } from '../data/serviceOptions';
import type { BillData } from '../types';

interface BillFormProps {
  onGenerate: (data: BillData) => void;
}

export const BillForm: React.FC<BillFormProps> = ({ onGenerate }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  
  // Track custom advance and balance for each option
  const [amounts, setAmounts] = useState<Record<string, { advance: string, balance: string }>>(() => {
    const initialAmounts: Record<string, { advance: string, balance: string }> = {};
    serviceOptions.forEach(opt => {
      initialAmounts[opt.id] = { advance: opt.advance ? opt.advance.toString() : '', balance: opt.balance ? opt.balance.toString() : '' };
    });
    return initialAmounts;
  });

  const handleAmountChange = (optionId: string, field: 'advance' | 'balance', value: string) => {
    setAmounts(prev => ({
      ...prev,
      [optionId]: {
        ...prev[optionId],
        [field]: value
      }
    }));
    // Auto-select option if they are typing in it
    if (selectedOptionId !== optionId) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const option = serviceOptions.find(opt => opt.id === selectedOptionId);
    if (!option || !customerName.trim()) return;

    const date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    onGenerate({
      customerName: customerName.trim(),
      option,
      customAdvance: amounts[selectedOptionId].advance,
      customBalance: amounts[selectedOptionId].balance,
      date,
    });
  };

  const isFormValid = selectedOptionId !== '' && customerName.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className="bill-form">
      <div className="options-table" role="radiogroup" aria-label="Service Options">
        <div className="table-header">
          <span></span>
          <span>අත්තිකාරම්</span>
          <span>ශේෂය</span>
        </div>
        {serviceOptions.map((opt) => (
          <label 
            key={opt.id} 
            className={`option-row ${selectedOptionId === opt.id ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="serviceOption"
              value={opt.id}
              checked={selectedOptionId === opt.id}
              onChange={(e) => setSelectedOptionId(e.target.value)}
              className="sr-only"
            />
            <div className="option-label">
              <span className="radio-indicator"></span>
              {opt.label}
            </div>
            
            <div className="number-input-wrapper">
              <span className="currency-symbol">රු.</span>
              <input 
                type="text" 
                inputMode="numeric"
                className="number-input"
                value={amounts[opt.id]?.advance || ''}
                onChange={(e) => handleAmountChange(opt.id, 'advance', e.target.value)}
                onClick={() => setSelectedOptionId(opt.id)}
              />
            </div>
            
            <div className="number-input-wrapper">
              <span className="currency-symbol">රු.</span>
              <input 
                type="text" 
                inputMode="numeric"
                className="number-input"
                value={amounts[opt.id]?.balance || ''}
                onChange={(e) => handleAmountChange(opt.id, 'balance', e.target.value)}
                onClick={() => setSelectedOptionId(opt.id)}
              />
            </div>
          </label>
        ))}
      </div>

      <div className="input-group">
        <label htmlFor="customerName" className="input-label">පාරිභෝගිකයාගේ නම</label>
        <input
          id="customerName"
          type="text"
          placeholder="උදා. නිමල් පෙරේරා"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          aria-label="Customer name"
          className="text-input"
        />
      </div>

      <button 
        type="submit" 
        disabled={!isFormValid}
        className="primary-button"
      >
        බිල්පත සාදන්න
      </button>
    </form>
  );
};
