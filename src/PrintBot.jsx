import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, FileText, Send } from 'lucide-react';

export default function PrintBot() {
  const [messages, setMessages] = useState([
    { text: "Welcome! Please upload your PDF or document for printing.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState('');
  const [color, setColor] = useState('');
  const [step, setStep] = useState(0);
  const [showQR, setShowQR] = useState(false);
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
    if (inputValue.trim() !== '') {
      addMessage(inputValue, 'user');
      setInputValue('');
      
      if (step === 1) {
        setPages(inputValue);
        setStep(2);
        setTimeout(() => addMessage("Would you like color or black and white copies?", 'bot'), 1000);
      } else if (step === 2) {
        setColor(inputValue);
        setStep(3);
        setTimeout(() => {
          addMessage(`Great! I'll print ${pages} pages of your document "${file?.name}" in ${color}. Is that correct?`, 'bot');
        }, 1000);
      } else if (step === 3) {
        if (inputValue.toLowerCase().includes('yes')) {
          setTimeout(() => addMessage("Perfect! Your print job has been sent. You can pick it up at the counter.", 'bot'), 1000);
        } else {
          setTimeout(() => addMessage("I'm sorry, let's start over. Please upload your document again.", 'bot'), 1000);
          setStep(0);
          setFile(null);
          setPages('');
          setColor('');
        }
      }
    }
  };

  const addMessage = (text, sender, isFile = false) => {
    setMessages(prev => [...prev, { text, sender, isFile }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">PrintBot</h1>
        <button onClick={() => setShowQR(!showQR)} className="p-2 bg-blue-700 rounded-full">
          <QrCode className="h-4 w-4" />
        </button>
      </div>
      {showQR && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-md">
          <QRCodeSVG value={window.location.href} size={128} />
        </div>
      )}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'bot' ? 'text-left' : 'text-right'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'bot'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.isFile ? (
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  {message.text}
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white">
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
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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
              className="flex-grow mr-2 p-2 border rounded-md"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
              <Send className="h-4 w-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}