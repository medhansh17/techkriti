import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import { searchCompanies } from "../api/modalSearch";

// Recommended companies list
const recommendedCompanies = [
  {
    id: 1,
    name: "Reliance Industries Limited",
    url: "/company/RELIANCE/consolidated/",
  },
  { id: 2, name: "Indian Oil Corporation", url: "/company/IOC/consolidated/" },
  {
    id: 3,
    name: "Life Insurance Corporation of India (LIC)",
    url: "/company/LICI/consolidated/",
  },
  {
    id: 4,
    name: "Oil and Natural Gas Corporation (ONGC)",
    url: "/company/ONGC/consolidated/",
  },
  {
    id: 5,
    name: "State Bank of India (SBI)",
    url: "/company/SBIN/consolidated/",
  },
  { id: 6, name: "Tata Motors", url: "/company/TATAMOTORS/consolidated/" },
  { id: 7, name: "Tata Steel", url: "/company/TATASTEEL/consolidated/" },
  {
    id: 8,
    name: "Tata Consultancy Services (TCS)",
    url: "/company/TCS/consolidated/",
  },
  { id: 9, name: "HDFC Bank", url: "/company/HDFCBANK/consolidated/" },
  { id: 10, name: "Infosys", url: "/company/INFY/consolidated/" },
];

// Local storage key for recent searches
const RECENT_SEARCHES_KEY = "recentSearches";

function ModalSearch({ id, searchId, modalOpen, setModalOpen }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load recent searches from local storage
  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Focus search input when modal opens
  useEffect(() => {
    if (modalOpen) {
      searchInput.current.focus();
      setSearchTerm("");
      setSearchResults([]);
    }
  }, [modalOpen]);

  // Handle search input change
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      setIsLoading(true);
      const results = await searchCompanies(value);
      setSearchResults(results);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  // Add to recent searches and save selected company
  const addToRecentSearches = (company) => {
    const newRecentSearches = [
      company,
      ...recentSearches.filter((item) => item.id !== company.id),
    ].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(newRecentSearches)
    );
    // Save selected company name to local storage
    localStorage.setItem("selectedCompany", company.name);
    setModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      addToRecentSearches(searchResults[0]);
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900/30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          {/* Search form */}
          <form
            className="border-b border-gray-200 dark:border-gray-700/60"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full dark:text-gray-300 bg-white dark:bg-gray-800 border-0 focus:ring-transparent placeholder-gray-400 dark:placeholder-gray-500 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search companies..."
                ref={searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-4 mr-2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          <div className="py-4 px-2">
            {/* Search results */}
            {searchTerm && (
              <div className="mb-3 last:mb-0">
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">
                  {isLoading ? "Searching..." : "Search Results"}
                </div>
                {!isLoading && searchResults.length > 0 && (
                  <ul className="text-sm">
                    {searchResults.map((result) => (
                      <li key={result.id || `search-${result.name}`}>
                        <Link
                          className="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                          to="/dashboard"
                          onClick={() => addToRecentSearches(result)}
                        >
                          <svg
                            className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                          </svg>
                          <span>{result.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {!isLoading && searchResults.length === 0 && searchTerm && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 px-2">
                    No results found
                  </p>
                )}
              </div>
            )}

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="mb-3 last:mb-0">
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">
                  Recent searches
                </div>
                <ul className="text-sm">
                  {recentSearches.map((search) => (
                    <li key={`recent-${search.id || search.name}`}>
                      <Link
                        className="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                        to="/dashboard"
                        onClick={() => {
                          localStorage.setItem("selectedCompany", search.name);
                          setModalOpen(false);
                        }}
                      >
                        <svg
                          className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                        </svg>
                        <span>{search.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended companies */}
            {!searchTerm && (
              <div className="mb-3 last:mb-0">
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">
                  Recommended companies
                </div>
                <ul className="text-sm">
                  {recommendedCompanies.map((company) => (
                    <li key={`rec-${company.id}`}>
                      <Link
                        className="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                        to="/dashboard"
                        onClick={() => addToRecentSearches(company)}
                      >
                        <svg
                          className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                        </svg>
                        <span>{company.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
