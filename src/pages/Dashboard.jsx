import React, { useEffect, useState } from "react";
import { Loader2, Info, ChevronDown, ChevronUp } from "lucide-react";

const FinancialRecordReport = () => {
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [financialData, setFinancialData] = useState(null);
  const [infoTooltip, setInfoTooltip] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [error, setError] = useState(null);
  
  // Analysis story from the document
  const analysisStory = `Okay, so I need to provide a comprehensive stock analysis for a company in the Banks and NBFC sector based on the given financial data. Let me start by understanding all the provided information and then break it down step by step.

First, let's look at the Market Cap of 320,366. Hmm, that seems pretty high. I'm not exactly sure what the average market cap is for banks or NBFCs in this region, but I know that a higher market cap usually means it's a larger company, which might be more stable but could also mean less growth potential.

Next, Revenue Growth is 14.5%. That sounds pretty good. I think in the banking sector, revenue growth can vary, especially depending on economic conditions. A double-digit growth rate is positive and indicates that the company is expanding its revenues effectively.

Net Income of 8,574 – this is the profit after all expenses. Comparing it to revenue growth, a solid net income shows that the company isn't just growing in terms of revenue but also maintaining profitability. I wonder how this compares to peers in the sector.

Free Cash Flow (FCF) is 5,200. This is important because cash flow indicates the actual money coming into the company. High FCF is good as it shows the company can generate cash beyond its net income, which is essential for paying dividends or investing in growth.

EBITDA of 12,000 – this measures the company's operating performance without considering non-operational expenses like interest and taxes. A higher EBITDA suggests stronger operational efficiency.

Debt-to-Equity ratio is 0.7. This is a key metric for financial leverage. A lower DE ratio means less debt relative to equity, which is safer. The benchmark seems to be around 1.5, so this company is in a better position regarding debt.

ROE of 15.3% and ROA of 1.6%. Both are above their benchmarks (15% and 1.5%). ROE shows how well the company uses equity to generate profit, while ROA indicates how efficiently assets are used to produce earnings. These ratios suggest good profitability.

Operating Cash Flow is 9,500. This is another positive sign as it reflects the company's ability to generate cash from its operations, which is crucial for sustainability and expansion.

Looking at valuation metrics: P/E Ratio of 22.5 and P/FCF Ratio of 18.2. These are higher than some benchmarks but not too bad. A high P/E might indicate that investors expect future growth, while a lower P/FCF suggests the stock is reasonably priced relative to its free cash flow.

EV/EBITDA of 12.5 is within a reasonable range, indicating that the company is not overvalued based on its earnings before interest, taxes, depreciation, and amortization.

Interest Coverage Ratio of 5.2 shows that the company can comfortably meet its interest obligations with its earnings. A ratio above 5 is usually considered good.

Dividend Yield of 2.1% provides a decent return for investors seeking income, though it's lower than some other sectors but acceptable in banking where dividends are often reliable.

Book Value per Share of 45.6 indicates the value of the company's assets on the balance sheet. It's positive that this is being met against benchmarks, suggesting the company isn't overvalued based on book value.

PEG Ratio of 1.2 suggests that the stock is reasonably priced relative to its earnings growth. A PEG ratio below 2 is generally considered good, so this is a positive sign.

NIM (Net Interest Margin) of 3.5 meets the benchmark of 3.0. NIM is crucial for banks as it reflects their profitability on interest-generating assets. This shows that the company is managing its interest margins effectively.

Gross NPA (Non-Performing Assets) ratio is 2.5%, which is better than the benchmark of 3.0%. Lower NPAs indicate stronger asset quality and less risk of defaults, which is positive for investors.

CAR (Capital Adequacy Ratio) of 13% meets the benchmark of 12.0%. CAR is important as it measures a bank's ability to absorb losses and maintain stability during tough economic times. Being above the benchmark shows that the company has sufficient capital buffers.

P/B Ratio of 2.8 is slightly below the benchmark of 3.0, which means the stock is undervalued relative to its book value, offering potential long-term returns.

Now, interpreting the Growth Score of 6.41 out of presumably 10 or another scale isn't clear, but higher scores usually indicate better growth prospects. If 6.41 is above average, that's a positive sign for investors looking for growth.

For key analysis points: The company meets most benchmarks in its financial ratios, which suggests it's performing well compared to peers. However, I need to consider sector-specific contexts because banking and NBFCs might have different standards.

Investment insights: A beginner investor should note that the company has strong profitability metrics (ROE, ROA) and good cash flow, indicating stability and potential for dividends or buybacks. The low debt level is also a plus in volatile markets as it reduces risk. However, the P/E ratio being on the higher side might mean it's not as attractive if growth slows down.

Strengths include strong profitability, manageable debt levels, good asset quality, and a solid capital base. Weaknesses could be the high P/E ratio (though still reasonable), moderate revenue growth compared to faster-growing peers, and potential sensitivity to interest rate changes affecting NIM.

Areas for further investigation: How does the company's revenue growth compare to sector averages? What is the breakdown of its income streams – retail banking, corporate loans, etc.? Interest rate risk management could be another area, as changes in rates can impact both NIM and asset quality. Also, understanding the geographic concentration of assets might reveal risks if they are heavily exposed to certain regions with economic downturns.  

In conclusion, while the company seems well-positioned with many metrics meeting or exceeding benchmarks, potential investors should consider market conditions, sector trends, and their own risk tolerance before making investment decisions.`;

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get company name from local storage
        const selectedCompany = localStorage.getItem("selectedCompany") || "Banks and NBFC";
        setCompanyName(selectedCompany);
        
        // Make API call to scraper endpoint
        const response = await fetch('http://localhost:3000/scrapper', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: selectedCompany }),
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch financial data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Descriptions for financial parameters
  const parameterDescriptions = {
    "Market Cap": "Total market value of a company's outstanding shares of stock.",
    "Current Price": "The latest trading price of the company's stock.",
    "High / Low": "Highest and lowest stock price over a specific period.",
    "Stock P/E": "Price-to-Earnings ratio, a valuation metric comparing share price to earnings per share.",
    "Book Value": "Net asset value of a company, calculated by total assets minus intangible assets and liabilities.",
    "Dividend Yield": "Annual dividend payment expressed as a percentage of the stock price.",
    "ROCE": "Return on Capital Employed, measures company's profitability and efficiency with its capital.",
    "ROE": "Return on Equity, measures financial performance by dividing net income by shareholders' equity.",
    "Face Value": "The nominal value of a security stated by the issuer.",
    "Sales": "Total revenue generated by the company.",
    "OPM": "Operating Profit Margin, percentage of sales left after covering operating expenses.",
    "Profit after tax": "Net income after all taxes have been paid.",
    "Piotroski score": "A 9-point scale evaluating a company's financial strength.",
    "G Factor": "A metric to assess growth potential.",
    "Altman Z Score": "A formula for predicting bankruptcy, higher values indicate better financial health.",
    "Debt": "Total outstanding loans and borrowings.",
    "Debt to equity": "Ratio comparing a company's total debt to its shareholders' equity.",
    "Return on equity": "Profitability relative to shareholders' equity.",
    "Price to book value": "Ratio of market price per share to book value per share.",
    "Return on assets": "How efficiently a company uses its assets to generate profit.",
    "Sales growth": "Year-over-year percentage increase in revenue.",
    "Profit growth": "Year-over-year percentage increase in profit.",
    "CMP / FCF": "Current Market Price to Free Cash Flow ratio.",
    "Inven TO": "Inventory Turnover, how many times inventory is sold and replaced.",
    "Int Coverage": "Interest Coverage Ratio, ability to pay interest on outstanding debt.",
    "Revenue Growth": "Year-over-year percentage increase in a company's revenue.",
    "Net Income": "A company's total earnings or profit after deducting all expenses and taxes.",
    "Free Cash Flow": "Cash a company generates after accounting for cash outflows to support operations and maintain capital assets.",
    "EBITDA": "Earnings Before Interest, Taxes, Depreciation, and Amortization, a measure of a company's overall financial performance.",
    "Debt-to-Equity": "Ratio indicating the relative proportion of shareholders' equity and debt used to finance a company's assets.",
    "Operating Cash Flow": "Amount of cash generated by a company's regular business operations.",
    "P/E Ratio": "Price-to-Earnings ratio, a valuation ratio of a company's current share price compared to its per-share earnings.",
    "P/FCF Ratio": "Price to Free Cash Flow ratio, measures a company's market capitalization relative to its free cash flow.",
    "EV/EBITDA": "Enterprise Value to EBITDA, a ratio used to determine the value of a company.",
    "Interest Coverage Ratio": "Ratio measuring a company's ability to pay interest on outstanding debt.",
    "Book Value per Share": "Per-share value of equity on a company's balance sheet.",
    "PEG Ratio": "Price/Earnings to Growth ratio, a stock's price-to-earnings ratio divided by its expected earnings growth rate.",
    "NIM": "Net Interest Margin, difference between interest income and interest expenses relative to assets.",
    "Gross NPA": "Gross Non-Performing Assets, percentage of loans that are in default or close to default.",
    "CAR": "Capital Adequacy Ratio, measures a bank's available capital as a percentage of its risk-weighted credit exposures.",
    "Growth Score": "A composite metric evaluating overall growth potential of a company."
  };

  // Group financial parameters into categories
  const financialCategories = {
    "Valuation Metrics": ["Market Cap", "Current Price", "High / Low", "Stock P/E", "Price to book value", "CMP / FCF", "P/E Ratio", "P/FCF Ratio", "EV/EBITDA", "PEG Ratio", "P/B Ratio"],
    "Profitability": ["OPM", "Profit after tax", "ROCE", "ROE", "Return on equity", "Return on assets", "Net Income", "EBITDA", "NIM"],
    "Growth": ["Sales growth", "Profit growth", "G Factor", "Revenue Growth", "Growth Score"],
    "Financial Health": ["Book Value", "Debt", "Debt to equity", "Altman Z Score", "Piotroski score", "Int Coverage", "Debt-to-Equity", "Interest Coverage Ratio", "CAR", "Gross NPA"],
    "Cash Flow": ["Free Cash Flow", "Operating Cash Flow"],
    "Shareholder Returns": ["Dividend Yield", "Face Value", "Book Value per Share"]
  };

  // Split categories into left and right columns
  const leftCategories = Object.fromEntries(
    Object.entries(financialCategories).slice(0, 3)
  );
  
  const rightCategories = Object.fromEntries(
    Object.entries(financialCategories).slice(3)
  );

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };

  // Handle showing info tooltip
  const showInfo = (param) => {
    setInfoTooltip(param);
  };

  // Handle hiding info tooltip
  const hideInfo = () => {
    setInfoTooltip(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2
            className="mx-auto mb-4 animate-spin text-indigo-600 dark:text-indigo-400"
            size={64}
          />
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Loading financial insights...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Function to render ratio category panel
  const renderRatioPanel = (categories) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="bg-indigo-600 dark:bg-indigo-800 px-4 py-3">
        <h2 className="text-xl font-semibold text-white">Financial Ratios</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(categories).map(([category, params]) => (
          <div key={category}>
            <button
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => toggleCategory(category)}
            >
              <span className="text-lg font-medium text-gray-800 dark:text-white">{category}</span>
              {expandedCategories[category] ? 
                <ChevronUp className="text-gray-500" size={20} /> : 
                <ChevronDown className="text-gray-500" size={20} />
              }
            </button>
            {expandedCategories[category] && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700">
                <table className="w-full">
                  <tbody>
                    {params.map(param => (
                      financialData?.ratios && financialData.ratios[param] ? (
                        <tr key={param} className="border-b dark:border-gray-600 last:border-0">
                          <td className="py-3 pr-2 relative">
                            <div className="flex items-center">
                              <span className="text-gray-700 dark:text-gray-300">{param}</span>
                              <button
                                className="ml-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                                onMouseEnter={() => showInfo(param)}
                                onMouseLeave={hideInfo}
                              >
                                <Info size={16} />
                              </button>
                              {infoTooltip === param && (
                                <div className="absolute z-10 left-0 top-10 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                                  {parameterDescriptions[param]}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 pl-2 text-right font-medium text-indigo-700 dark:text-indigo-300">
                            {financialData.ratios[param]}
                          </td>
                        </tr>
                      ) : null
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{companyName}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Financial Analysis Report</p>
        </div>

        {financialData && (
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left Column - 15% width */}
            <div className="lg:w-5/20 lg:pr-4 mb-6 lg:mb-0">
              {renderRatioPanel(leftCategories)}
            </div>
            
            {/* Middle Column - 70% width */}
            <div className="lg:w-7/10 lg:px-4 mb-6 lg:mb-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
                <div className="bg-indigo-600 dark:bg-indigo-800 px-4 py-3">
                  <h2 className="text-xl font-semibold text-white">Detailed Analysis</h2>
                </div>
                <div className="p-6 overflow-auto max-h-screen">
                  <div className="prose prose-indigo max-w-none dark:prose-invert">
                    {analysisStory.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - 15% width */}
            <div className="lg:w-5/20 lg:pl-4">
              {renderRatioPanel(rightCategories)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialRecordReport;