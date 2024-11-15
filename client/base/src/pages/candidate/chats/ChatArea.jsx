import React, { useState } from 'react';

export default function ChatArea() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', sender: 'received' },
    { text: "I'm good, thanks!", sender: 'sent' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'sent' }]);
      setInputValue('');
    }
  };

  return (
    <div className='flex-1 bg-gray-400'>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white border-b border-gray-200 flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-800">User Name</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start ${message.sender === 'sent' ? 'justify-end' : ''}`}>
                {message.sender === 'received' && <div className="w-8 h-8 bg-gray-300 rounded-full"></div>}
                <div className={`ml-3 p-3 ${message.sender === 'sent' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'} rounded-lg`}>
                  <p>{message.text}</p>
                </div>
                {message.sender === 'sent' && <div className="w-8 h-8 bg-gray-300 rounded-full"></div>}
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="ml-4 p-2 bg-[#0049AD] text-white rounded-lg hover:bg-blue-600"
              onClick={handleSendMessage}
            >
              <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}