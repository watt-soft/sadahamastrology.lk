import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { serviceOptions } from '../data/serviceOptions';
import type { BillData } from '../types';

interface BillFormProps {
  onGenerate: (data: BillData) => void;
}

export const BillForm: React.FC<BillFormProps> = ({ onGenerate }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  // 4 constant variables for the total amount of each option
  const TOTAL_AMOUNT_JANMA = 2500;  // Total for 1st option
  const TOTAL_AMOUNT_PALAPALA = 1000;  // Total for 2nd option
  const TOTAL_AMOUNT_MANGALA_NAKATH = 5500;  // Total for 3rd option
  const TOTAL_AMOUNT_NIWASA = 25000; // Total for 4th option

  // Track custom advance and balance for each option
  const [amounts, setAmounts] = useState<Record<string, { advance: string, balance: string }>>(() => {
    const initialAmounts: Record<string, { advance: string, balance: string }> = {};
    serviceOptions.forEach(opt => {
      initialAmounts[opt.id] = { advance: opt.advance ? opt.advance.toString() : '', balance: opt.balance ? opt.balance.toString() : '' };
    });
    return initialAmounts;
  });

  const handleAmountChange = (optionId: string, field: 'advance' | 'balance', value: string) => {

    // Only numbers are accepted, remove any non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    setAmounts(prev => {
      let updatedAdvance = field === 'advance' ? numericValue : prev[optionId].advance;
      let updatedBalance = field === 'balance' ? numericValue : prev[optionId].balance;

      // Automatically calculate balance when advance is typed
      if (field === 'advance') {
        // Match 4 constant variables
        const optionIndex = serviceOptions.findIndex(opt => opt.id === optionId);

        let totalAmount = 0;
        if (optionIndex === 0) totalAmount = TOTAL_AMOUNT_JANMA;
        else if (optionIndex === 1) totalAmount = TOTAL_AMOUNT_PALAPALA;
        else if (optionIndex === 2) totalAmount = TOTAL_AMOUNT_MANGALA_NAKATH;
        else if (optionIndex === 3) totalAmount = TOTAL_AMOUNT_NIWASA;

        const advanceNum = parseFloat(numericValue);
        if (!isNaN(advanceNum)) {
          const calculatedBalance = totalAmount - advanceNum;
          updatedBalance = calculatedBalance.toString()
        } else {
          updatedBalance = '';
        }
      }

      return {
        ...prev,
        [optionId]: {
          advance: updatedAdvance,
          balance: updatedBalance
        }
      };
    });

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
          <span className="col-service">සේවාව</span>
          <span className="col-advance">අත්තිකාරම්</span>
          <span className="col-balance">ශේෂය</span>
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
              <span className="radio-indicator" aria-hidden="true"></span>
              <span className="option-text">{opt.label}</span>
            </div>

            <div className="number-input-wrapper">
              <span className="currency-symbol" aria-hidden="true">රු.</span>
              <input
                type="text"
                inputMode="numeric"
                className="number-input"
                placeholder="0"
                aria-label={`${opt.label} අත්තිකාරම්`}
                value={amounts[opt.id]?.advance || ''}
                onChange={(e) => handleAmountChange(opt.id, 'advance', e.target.value)}
                onClick={() => setSelectedOptionId(opt.id)}
              />
            </div>

            <div className="number-input-wrapper">
              <span className="currency-symbol" aria-hidden="true">රු.</span>
              <input
                type="text"
                inputMode="numeric"
                className="number-input"
                placeholder="0"
                aria-label={`${opt.label} ශේෂය`}
                value={amounts[opt.id]?.balance || ''}
                onChange={(e) => handleAmountChange(opt.id, 'balance', e.target.value)}
                onClick={() => setSelectedOptionId(opt.id)}
              />
            </div>
          </label>
        ))}
      </div>

      <div className="input-group">
        <label htmlFor="customerName" className="input-label">
          <span>පාරිභෝගිකයාගේ නම</span>
          <span className="required-marker" aria-hidden="true">*</span>
        </label>
        <div className="text-input-wrapper">
          <input
            id="customerName"
            type="text"
            placeholder="උදා: නිමල් පෙරේරා"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            autoComplete="name"
            enterKeyHint="done"
            spellCheck="false"
            aria-label="පාරිභෝගිකයාගේ නම"
            required
            className="text-input"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="primary-button generate-button"
      >
        <span className="button-inner">
          <FileText size={19} />
          <span>බිල්පත සාදන්න</span>
        </span>
      </button>
    </form>
  );
};