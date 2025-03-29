// api/searchService.js
const searchCompanies = async (query) => {
  if (!query || query.trim() === "") return [];

  try {
    const response = await fetch(
      `http://localhost:3000/search/${encodeURIComponent(query)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export { searchCompanies };
