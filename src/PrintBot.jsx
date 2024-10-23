import React, { useState, useRef, useEffect } from 'react';
import { FileText, Send } from 'lucide-react';

export default function PrintBot() {
  const [messages, setMessages] = useState([
    { text: "Welcome! Please upload your PDF or document for printing.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState('');
  const [color, setColor] = useState('');
  const [step, setStep] = useState(0);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      addMessage(uploadedFile.name, 'user', true);
      setStep(1);
      setTimeout(() => addMessage("Great! How many pages would you like to print?", 'bot'), 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') {
      addMessage("Please provide a valid response.", 'bot');
      return;
    }

    addMessage(inputValue, 'user');
    setInputValue('');

    if (step === 1) {
      const pagesInput = parseInt(inputValue, 10);
      if (isNaN(pagesInput) || pagesInput <= 0) {
        addMessage("Please enter a valid number of pages.", 'bot');
      } else {
        setPages(pagesInput);
        setStep(2);
        setTimeout(() => addMessage("Would you like color or black and white copies?", 'bot'), 1000);
      }
    } else if (step === 2) {
      const colorInput = inputValue.toLowerCase();
      if (colorInput !== 'color' && colorInput !== 'black and white') {
        addMessage("Please specify either 'Color' or 'black and white' Copies.", 'bot');
      } else {
        setColor(colorInput);
        setStep(3);
        setTimeout(() => {
          addMessage(`Great! I'll print ${pages} pages of your document "${file?.name}" in ${color}. Is that correct?`, 'bot');
        }, 1000);
      }
    } else if (step === 3) {
      if (inputValue.toLowerCase().includes('yes')) {
        setTimeout(() => addMessage("Perfect! Your print job has been sent. You can pick it up at the counter.", 'bot'), 1000);
      } else {
        setTimeout(() => addMessage("I'm sorry, let's start over. Please upload your document again.", 'bot'), 1000);
        resetConversation();
      }
    }
  };

  const resetConversation = () => {
    setStep(0);
    setFile(null);
    setPages('');
    setColor('');
    setMessages([{ text: "Welcome! Please upload your PDF or document for printing.", sender: 'bot' }]);
  };

  const addMessage = (text, sender, isFile = false) => {
    setMessages(prev => [...prev, { text, sender, isFile }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 md:max-w-lg shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-violet-600 text-white w-full">
        <h1 className="text-lg sm:text-xl font-bold">Ezprints 2.0</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] md:max-w-[70%] ${
                message.sender === 'bot' ? 'bg-gray-200 text-gray-800' : 'bg-violet-600 text-white'
              }`}
            >
              {message.isFile ? (
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  <span className="text-sm md:text-base">{message.text}</span>
                </div>
              ) : (
                <span className="text-sm md:text-base">{message.text}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="p-4 bg-white w-full flex-shrink-0">
        {step === 0 ? (
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-violet-600 text-white py-3 px-4 rounded-md hover:bg-violet-700 transition-colors text-center"
            >
              Upload Document
            </button>
          </div>
        ) : (
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-2 p-3 border rounded-md text-sm md:text-base"
            />
            <button type="submit" className="bg-violet-600 text-white p-3 rounded-md">
              <Send className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
