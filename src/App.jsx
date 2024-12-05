import React, { useState } from "react";

const App = () => {
  const [fileText, setFileText] = useState("");
  const [manualText, setManualText] = useState("");
  const [summary, setSummary] = useState("");

  // Function to handle file input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileText(e.target.result); // Read file contents
        setManualText(""); // Clear manual text when file is uploaded
      };
      reader.readAsText(file);
    }
  };

  // Function to generate summary
  const generateSummary = () => {
    const inputText = fileText || manualText; // Prioritize file text over manual text
    if (!inputText) {
      alert("Please provide text via file upload or manual input.");
      return;
    }

    // Placeholder logic for summarization
    const summarizedText =
      inputText.length > 100
        ? `${inputText.slice(0, 100)}... [Summarized]`
        : inputText;
    setSummary(summarizedText);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Input Area */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Summarization of Legal Document
          </h1>
          {/* File Upload */}
          <label className="block text-sm font-medium mb-2">
            Upload a Text File:
          </label>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="block w-full text-sm text-blue-600 bg-white 
                       file:py-2 file:px-4 file:mr-4 file:border-0 file:rounded-lg
                       file:font-semibold file:bg-blue-100 hover:file:bg-blue-200"
          />
          <div className="text-center my-4">OR</div>
          {/* Manual Text Input */}
          <label className="block text-sm font-medium mb-2">
            Enter Text Manually:
          </label>
          <textarea
            value={manualText}
            onChange={(e) => {
              setManualText(e.target.value);
              setFileText(""); // Clear file text when manual input is used
            }}
            placeholder="Type your text here..."
            className="w-full h-28 p-3 border border-gray-300 rounded-lg bg-gray-50 
                       text-sm text-gray-800 focus:outline-none"
          ></textarea>
        </div>

        {/* File Content & Summary Area */}
        <div className="p-6 space-y-6">
          {/* Display File or Manual Text */}
          {(fileText || manualText) && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Input Content:
              </h2>
              <textarea
                value={fileText || manualText}
                readOnly
                className="w-full h-40 p-3 mt-2 border border-gray-300 rounded-lg bg-gray-50 
                           text-sm text-gray-800 focus:outline-none"
              ></textarea>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={generateSummary}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                         py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              Generate Summary
            </button>
          </div>

          {/* Display Summary */}
          {summary && (
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">Summary:</h2>
              <p className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-800">
                {summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
