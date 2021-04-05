const Button = ({ text, onClick, extraClasses, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 flex justify-center items-center select-none bg-white dark:bg-gray-800 transition-colors duration-100 ${
        disabled
          ? "cursor-default opacity-50"
          : "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
      } ${extraClasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
