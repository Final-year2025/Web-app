import React, { useState } from 'react';
import { Printer, Upload, List, Check } from 'lucide-react';
import PrintBot from './PrintBot';

export default function PrintBotLanding() {
  const [showPrintBot, setShowPrintBot] = useState(false);

  if (showPrintBot) {
    return <PrintBot />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to Ezprints 2.0</h2>
        <p className="text-center text-gray-600 mb-6">Where efficiency meets innovation</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <p>Upload your document easily</p>
          </div>
          <div className="flex items-center space-x-2">
            <List className="w-5 h-5 text-blue-600" />
            <p>Specify printing options</p>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-blue-600" />
            <p>Confirm and send your print job</p>
          </div>
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <p>Pick up your prints at the counter</p>
          </div>
        </div>
        <button
          className="w-full bg-violet-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-violet-700 transition-colors"
          onClick={() => setShowPrintBot(true)}
        >
          Start Printing
        </button>
      </div>
    </div>
  );
}
