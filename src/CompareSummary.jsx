import React, { useState } from "react";

const CompareSummary = () => {
  const [actualSummary, setActualSummary] = useState("");
  const [generatedSummary, setGeneratedSummary] = useState("");
  const [insights, setInsights] = useState({
    commonWords: [],
    commonPhrases: [],
    wordCountActual: 0,
    wordCountGenerated: 0,
  });

  // Utility function to split summaries into words
  const splitIntoWords = (text) => text.toLowerCase().split(/\s+/);

  // Utility function to generate n-grams
  const generateNGrams = (words, n) => {
    const nGrams = [];
    for (let i = 0; i <= words.length - n; i++) {
      nGrams.push(words.slice(i, i + n).join(" "));
    }
    return nGrams;
  };

  // Function to find common phrases
  const findCommonPhrases = (actualWords, generatedWords) => {
    let maxLength = Math.min(actualWords.length, generatedWords.length);
    let commonPhrases = [];

    for (let n = 2; n <= maxLength; n++) {
      const actualNGrams = generateNGrams(actualWords, n);
      const generatedNGrams = generateNGrams(generatedWords, n);
      const commonNGrams = actualNGrams.filter((phrase) =>
        generatedNGrams.includes(phrase)
      );

      if (commonNGrams.length > 0) {
        commonPhrases = commonNGrams;
      }
    }
    return commonPhrases;
  };

  // Function to compare the two summaries
  const compareSummaries = () => {
    if (!actualSummary || !generatedSummary) {
      alert(
        "Please provide both the Actual Summary and the Generated Summary."
      );
      return;
    }

    const actualWords = splitIntoWords(actualSummary);
    const generatedWords = splitIntoWords(generatedSummary);

    // Calculate common words
    const commonWords = actualWords.filter((word) =>
      generatedWords.includes(word)
    );

    // Find common phrases
    const commonPhrases = findCommonPhrases(actualWords, generatedWords);

    // Calculate word counts
    const wordCountActual = actualWords.length;
    const wordCountGenerated = generatedWords.length;

    // Set the insights state
    setInsights({
      commonWords: Array.from(new Set(commonWords)), // Remove duplicates
      commonPhrases: Array.from(new Set(commonPhrases)), // Remove duplicates
      wordCountActual: wordCountActual,
      wordCountGenerated: wordCountGenerated,
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 text-center">
        Compare Summaries
      </h2>

      {/* Summary Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-none">
          <h4 className="text-lg font-semibold">Actual Summary:</h4>
          <textarea
            value={actualSummary}
            onChange={(e) => setActualSummary(e.target.value)}
            placeholder="Enter Actual Summary here..."
            className="w-full h-96 p-3 mt-2 border-b-2 border-blue-600 hover:border-black hover:border-b-4 bg-gray-50 text-sm text-gray-900 outline-none transition-all duration-100"
          ></textarea>
        </div>

        <div className="p-4 rounded-lg bg-none">
          <h4 className="text-lg font-semibold">Generated Summary:</h4>
          <textarea
            value={generatedSummary}
            onChange={(e) => setGeneratedSummary(e.target.value)}
            placeholder="Enter Generated Summary here..."
            className="w-full h-96 p-3 mt-2 border-b-2 border-blue-600 hover:border-black hover:border-b-4 bg-gray-50 text-sm text-gray-900 outline-none transition-all duration-100"
          ></textarea>
        </div>
      </div>

      {/* Compare Button */}
      <div className="p-0">
        <button
          onClick={compareSummaries}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
        >
          Compare
        </button>
      </div>

      {/* Insights */}
      {insights.commonWords.length > 0 && (
        <div className="pt-6 space-y-4">
          <div>
            <h5 className="font-semibold text-gray-700">Common Words:</h5>
            <div className="flex flex-wrap gap-1">
              {insights.commonWords.map((word, index) => (
                <span
                  key={index}
                  className="bg-black text-white px-2 p-2 rounded-sm text-[12px] transition-all duration-300"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-700">Common Phrases:</h5>
            <div className="flex flex-wrap gap-1">
              {insights.commonPhrases.map((phrase, index) => (
                <span
                  key={index}
                  className="bg-gray-600 hover:bg-blue-600 hover:cursor-pointer text-white px-4 p-2 rounded-sm text-[12px] transition-all duration-300"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-700">Word Counts:</h5>
            <p>
              Actual Summary: {insights.wordCountActual} words <br />
              Generated Summary: {insights.wordCountGenerated} words
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSummary;
