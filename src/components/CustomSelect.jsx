import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getLabel = (val) => {
    if (!val) return placeholder;
    const opt = options.find(o => (typeof o === 'object' ? o.value === val : o === val));
    return typeof opt === 'object' ? opt.label : opt;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-3 px-4 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-between ${className}`}
      >
        <span className={`block truncate ${!value ? 'text-[#777777]' : 'text-[#777777]'}`}>
          {getLabel(value)}
        </span>
        <span className="pointer-events-none flex items-center">
           <svg className="w-3 h-3 text-[#777777] fill-current" viewBox="0 0 12 8">
              <path d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z" />
           </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div
             className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-[#777777] hover:bg-gray-100"
             onClick={() => handleSelect("")}
          >
             <span className="font-normal block truncate">{placeholder}</span>
             {value === "" && (
               <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#777777]">
                 <Check className="h-4 w-4" />
               </span>
             )}
          </div>

          {options.map((option, index) => {
             const optValue = typeof option === 'object' ? option.value : option;
             const optLabel = typeof option === 'object' ? option.label : option;
             const isSelected = value === optValue;
             
             return (
              <div
                key={index}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-[#777777] hover:bg-gray-100"
                onClick={() => handleSelect(optValue)}
              >
                <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
                  {optLabel}
                </span>
                {isSelected && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#777777]">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
