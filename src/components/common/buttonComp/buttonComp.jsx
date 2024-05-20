import React from 'react';

const PrimaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  btnStyle = {},
  text='button',
  btnClass='w-full h-8 rounded-md'

}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={btnStyle}
      className={`
        px-4 py-2 font-bold
        hover:scale-105 disabled:hover:scale-100
        transition-opacity duration-300
        text-white flex justify-center items-center
        bg-[#5C218B]
         
        ${btnClass}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
    >
      <div className={`flex gap-x-1 justify-center`}>
        {loading && (
          <div className="animate-spin rounded-full border-4 border-t-transparent w-6 h-6"></div>
        )}
        <div className={`${loading ? '' :'flex-1'}`}>{text}</div>
      </div>
    </button>
  );
};

export default PrimaryButton;
