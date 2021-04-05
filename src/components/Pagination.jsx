import Button from "./Button";

const Pagination = ({ nextPage, prevPage }) => {
  return (
    <div className="flex flex-row mt-4 rounded-xl shadow-md overflow-hidden divide-x dark:divide-gray-600">
      <Button 
        text="< Previous" 
        onClick={prevPage} 
        disabled={!prevPage} 
      />
      <Button 
        text="Next >" 
        onClick={nextPage} 
        disabled={!nextPage} 
      />
    </div>
  );
};

export default Pagination;
