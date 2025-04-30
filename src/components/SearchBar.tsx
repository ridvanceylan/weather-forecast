import React, { useState } from "react";
import { useIntl } from "react-intl";

type SearchBarProps = {
  onSearch: (city: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const intl = useIntl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={intl.formatMessage({
            id: "searchCityPlaceholder",
            defaultMessage: "Search city...",
          })}
          className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-gray-200"
      >
        {intl.formatMessage({ id: "searchButton", defaultMessage: "Search" })}
      </button>
    </form>
  );
};

export default SearchBar;
