import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { searchCompanies } from "../api/modalSearch";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      navigate("/dashboard", {
        state: {
          companyUrl: selectedCompany.url,
          companyName: selectedCompany.name,
        },
      });
    }
  }, [selectedCompany, navigate]);

  // Debounced API Call
  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      setIsLoading(true);
      try {
        const apiResponse = await searchCompanies(query);
        const results = apiResponse.results || [];

        // Remove items where isSearchEverywhere is true
        const filteredResults = results.filter(
          (item) => !item.isSearchEverywhere
        );

        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Search failed", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300), // Adjust debounce time (300ms)
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);

    if (value.trim()) {
      fetchSearchResults(value); // Call debounced function
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    setSelectedCompany(result);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      <div className="relative z-10 w-full max-w-xl px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Uncover the Real Financial Story
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          AI-Powered Insights Beyond Media Hype: Decode Company Financials with
          Precision
        </p>

        <div ref={searchContainerRef} className="relative">
          <input
            type="text"
            placeholder="Enter company name (e.g., Reliance, TCS)"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />

          {isDropdownOpen && (searchTerm || searchResults.length > 0) && (
            <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Searching...
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between"
                    >
                      <span>{result.name}</span>
                      {result.url ? (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-500 underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-500">No URL</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!searchTerm && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Start typing to search for companies...
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        .animate-wave-delayed {
          animation: wave 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
