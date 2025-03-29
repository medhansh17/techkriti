import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import hljs from "highlight.js/lib/core";
import markdown from "highlight.js/lib/languages/markdown";
import "highlight.js/styles/github.css";
import { Loader2 } from "lucide-react";
hljs.registerLanguage("markdown", markdown);

const FinancialRecordReport = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    hljs.highlightAll();

    // Simulate loading for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2
            className="mx-auto mb-4 animate-spin text-indigo-600 dark:text-indigo-400"
            size={64}
          />
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Loading financial insights for{" "}
            {location.state?.companyName || "the company"}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 px-12 py-16 text-gray-900 dark:text-white">
      <div className="w-full max-w-6xl text-left mb-10">
        <h1 className="text-5xl font-bold flex items-center gap-3">
          Financial Report: Reliance Industries Ltd.
        </h1>
      </div>

      <div className="w-full max-w-6xl space-y-8 leading-relaxed text-lg">
        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            Growth Overview
          </h2>
          <p className="mt-2 text-gray-800 dark:text-gray-200">
            The company maintains a **balanced growth trajectory** with a{" "}
            <span className="font-semibold text-green-500">score of 6.41</span>,
            reflecting stability and financial resilience.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            Key Performance Metrics
          </h2>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-800 dark:text-gray-200">
            <li>
              <span className="font-semibold">Net Interest Margin (NIM):</span>{" "}
              <span className="text-green-500">3.5%</span> (Above benchmark of{" "}
              <span className="font-semibold">3.0%</span>)
            </li>
            <li>
              <span className="font-semibold">Return on Assets (ROA):</span>{" "}
              <span className="text-green-500">1.6%</span> (Meets benchmark of{" "}
              <span className="font-semibold">1.5%</span>)
            </li>
            <li>
              <span className="font-semibold">Return on Equity (ROE):</span>{" "}
              <span className="text-green-500">15.3%</span> (Exceeds 15% target)
            </li>
            <li>
              <span className="font-semibold">Gross NPA Ratio:</span>{" "}
              <span className="text-green-500">2.5%</span> (Within safe limits)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            Market Position
          </h2>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-800 dark:text-gray-200">
            <li>
              <span className="font-semibold">Market Capitalization:</span>{" "}
              ₹320,366 Cr 📈 (Large-cap, industry leader)
            </li>
            <li>
              <span className="font-semibold">Revenue Growth:</span>{" "}
              <span className="text-green-500">14.5%</span> 🚀 (Strong
              expansion)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            Strengths & Weaknesses
          </h2>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-800 dark:text-gray-200">
            <li>
              <span className="font-semibold text-green-600">Strengths:</span>{" "}
              High profitability, strong cash flow, stable asset quality, low
              debt.
            </li>
            <li>
              <span className="font-semibold text-red-500">Weaknesses:</span>{" "}
              Slightly high P/E ratio, moderate growth compared to top peers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            Investment Considerations
          </h2>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-800 dark:text-gray-200">
            <li>Ideal for long-term investors seeking stable returns.</li>
            <li>Sector trends & economic conditions should be monitored.</li>
            <li>Further research into revenue diversification is advised.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            The Journey of Financial Resilience
          </h2>
          <p className="mt-2 text-gray-800 dark:text-gray-200">
            Our journey in the financial sector is a testament to strategic
            growth and financial prudence. With a market capitalization of
            ₹320,366 Cr, we stand as a large, stable entity in the banking and
            NBFC landscape. While a higher market cap typically suggests
            stability, we've carefully balanced size with the potential for
            continued expansion.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Revenue growth has been a key focus, with a robust 14.5% expansion
            that speaks to our effective market strategy. In a sector where
            economic conditions can significantly impact performance,
            maintaining a double-digit growth rate is no small feat. This growth
            isn't just about numbers – it's about our ability to adapt and
            thrive in changing economic environments.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Our financial strength is perhaps best illustrated by our net income
            of ₹8,574 Cr. This isn't just a figure on a balance sheet – it's a
            reflection of our commitment to profitability. By maintaining strong
            net income alongside significant revenue growth, we've demonstrated
            our ability to not just expand, but to do so efficiently and
            sustainably.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Cash flow has been a cornerstone of our financial strategy. With a
            Free Cash Flow of ₹5,200 Cr and an Operating Cash Flow of ₹9,500 Cr,
            we've shown remarkable ability to generate real cash beyond our net
            income. This provides us with the flexibility to invest in growth,
            return value to shareholders, and maintain financial resilience.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Our financial efficiency is further highlighted by an EBITDA of
            ₹12,000 Cr, which demonstrates our strong operational performance
            before non-operational expenses. A debt-to-equity ratio of 0.7 –
            significantly lower than the benchmark of 1.5 – underscores our
            conservative approach to financial leverage and risk management.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Profitability metrics tell a compelling story of financial prowess.
            Our Return on Equity (ROE) of 15.3% and Return on Assets (ROA) of
            1.6% both exceed industry benchmarks. These aren't just numbers –
            they represent our ability to efficiently use equity and assets to
            generate meaningful returns for our stakeholders.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Diving deeper into our valuation metrics reveals a nuanced financial
            picture. Our P/E Ratio of 22.5 and P/FCF Ratio of 18.2, while higher
            than some benchmarks, reflect investor confidence in our future
            growth potential. The EV/EBITDA of 12.5 indicates we're not
            overvalued, striking a balance between current performance and
            future prospects.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Financial stability is more than just growth – it's about
            consistent, reliable performance. Our Interest Coverage Ratio of 5.2
            demonstrates our ability to comfortably meet interest obligations. A
            dividend yield of 2.1% provides steady income for our investors,
            reflecting our commitment to shareholder value. Our Book Value per
            Share of 45.6 and a PEG Ratio of 1.2 further validate our financial
            health and reasonable valuation.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Risk management remains at the core of our strategy. Our Net
            Interest Margin (NIM) of 3.5% meets key benchmarks, showcasing our
            ability to generate profitable interest-based income. A Gross NPA
            ratio of 2.5% – better than the sector benchmark – indicates strong
            asset quality and minimal default risks. Our Capital Adequacy Ratio
            (CAR) of 13% provides a robust buffer against potential economic
            challenges.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Our growth score of 6.41 is more than just a number. It represents
            our balanced approach to expansion – significant enough to attract
            investors, yet measured to ensure sustainable progress. While we
            recognize our strengths – including strong profitability, manageable
            debt, and good asset quality – we're also transparent about
            potential challenges such as sensitivity to interest rate changes
            and moderate growth compared to the most aggressive peers.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Looking forward, we remain committed to continuous improvement. Our
            focus extends beyond current metrics to understanding deeper aspects
            of our business: diversifying income streams, managing interest rate
            risks, and carefully analyzing our geographic asset distribution. We
            aim to not just meet benchmarks, but to set new standards in the
            banking and NBFC sector.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            As we navigate the complex financial landscape, our message to
            investors is clear: we offer a balanced, well-managed investment
            opportunity. Our metrics speak to stability, profitability, and
            potential. Yet, we encourage potential investors to consider their
            individual risk tolerance, market conditions, and sector trends when
            making investment decisions.
          </p>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
            Conclusion
          </h2>
          <p className="mt-2 text-gray-800 dark:text-gray-200">
            The company showcases **strong financial fundamentals**, making it a
            solid investment choice for long-term stability. However,{" "}
            <span className="font-semibold text-yellow-500">
              market fluctuations and policy changes
            </span>{" "}
            should be carefully analyzed before making investment decisions.
          </p>
        </section>
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

export default FinancialRecordReport;
