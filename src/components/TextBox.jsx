const TextBox = ({ value, onChange, onFocus }) => {
  return (
    <input
      onFocus={onFocus}
      type="text"
      placeholder="Search for a user"
      value={value}
      onChange={onChange}
      className="mb-6 p-3 rounded-xl shadow-md bg-white dark:bg-gray-800 focus:ring-2"
    />
  );
};

export default TextBox;
