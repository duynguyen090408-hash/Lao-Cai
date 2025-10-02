import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Sẽ tạo file CSS sau

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là Chatbot Lào Cai. Tôi có thể cung cấp thông tin về địa lý, khoáng sản và kinh tế của tỉnh Lào Cai. Bạn muốn biết điều gì?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      handleBotResponse(inputValue.toLowerCase());
      setIsTyping(false);
    }, 1000);
  };

  const handleBotResponse = (userInput) => {
    let responseText = "";

    if (userInput.includes("vị trí") || userInput.includes("địa lý") || userInput.includes("diện tích") || userInput.includes("dân số")) {
      responseText = "Lào Cai thuộc vùng biên giới phía Bắc, giáp Trung Quốc, nằm ở trung tâm vùng Đông Bắc – Tây Bắc. Diện tích khoảng 6.383 km², dân số hơn 750.000 người (2023). (Nguồn: Cổng thông tin điện tử tỉnh Lào Cai – laocai.gov.vn)";
    } 
    else if (userInput.includes("khoáng sản") || userInput.includes("tài nguyên") || userInput.includes("apatit") || userInput.includes("đồng") || userInput.includes("sắt") || userInput.includes("đất hiếm")) {
      responseText = "Các loại khoáng sản chính của Lào Cai:\n- Apatit: trữ lượng 2,5 tỷ tấn\n- Đồng Sin Quyền: trữ lượng khoảng 53 triệu tấn\n- Sắt Quý Xa: trữ lượng khoảng 120 triệu tấn\n- Đất hiếm: trữ lượng lớn, tiềm năng chiến lược\n- Ngoài ra còn có graphit, molipden, vàng, đá vôi, cát sỏi...\n(Nguồn: Báo Lào Cai, 2023)";
    }
    else if (userInput.includes("khai thác") || userInput.includes("thực trạng") || userInput.includes("sản xuất")) {
      responseText = "Thực trạng khai thác khoáng sản tại Lào Cai:\n- Apatit: Khai thác để sản xuất phân bón hóa học (DAP, lân)\n- Đồng Sin Quyền: Sản xuất tinh quặng đồng\n- Sắt Quý Xa: Phục vụ sản xuất gang thép\n- Đất hiếm: Đang nghiên cứu khai thác, có ý nghĩa chiến lược\n(Nguồn: VietnamPlus, Báo Lào Cai, ANTV, 2022-2023)";
    }
    else if (userInput.includes("kinh tế") || userInput.includes("gdp") || userInput.includes("việc làm") || userInput.includes("giá trị")) {
      responseText = "Giá trị kinh tế từ khai thác khoáng sản:\n- Đóng góp khoảng 25-30% GDP của tỉnh\n- Tạo việc làm cho hàng chục nghìn lao động\n- Thông qua các công ty: Apatit, Nhà máy luyện đồng Lào Cai, Nhà máy DAP\n(Nguồn: Báo Lào Cai, Cổng thông tin tỉnh Lào Cai, 2023)";
    }
    else if (userInput.includes("hạn chế") || userInput.includes("tồn tại") || userInput.includes("ô nhiễm") || userInput.includes("thất thoát")) {
      responseText = "Tồn tại và hạn chế trong khai thác khoáng sản:\n- Bãi thải đất đá khổng lồ gây lãng phí và ô nhiễm\n- Một số dự án khai thác chưa hiệu quả\n- Tình trạng thất thoát và khai thác trái phép\n(Nguồn: VietnamPlus, ANTV, 2022)";
    }
    else if (userInput.includes("xin chào") || userInput.includes("hello") || userInput.includes("hi")) {
      responseText = "Xin chào! Tôi có thể giúp gì cho bạn về tỉnh Lào Cai?";
    }
    else {
      responseText = "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về: vị trí địa lý, khoáng sản, thực trạng khai thác, giá trị kinh tế hoặc các hạn chế của tỉnh Lào Cai.";
    }

    const botMessage = {
      id: messages.length + 2,
      text: responseText,
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSendMessage(fakeEvent);
    }, 100);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 font-bold text-xl mr-3">
              LS
            </div>
            <div>
              <h1 className="text-xl font-semibold">Chatbot Lào Cai</h1>
              <p className="text-sm opacity-90">Thông tin địa lý và khoáng sản</p>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="p-4 bg-gray-100 border-b">
          <p className="text-sm text-gray-600 mb-2">Câu hỏi nhanh:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Vị trí địa lý Lào Cai?",
              "Khoáng sản chính?",
              "Tình hình khai thác?",
              "Giá trị kinh tế?",
              "Hạn chế khai thác?"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-line">{message.text}</div>
                <div className={`text-xs mt-1 opacity-70 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white text-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs shadow-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 opacity-70 animate-bounce mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 opacity-70 animate-bounce mr-1" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 opacity-70 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="Gửi tin nhắn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 text-center text-xs text-gray-600">
          <p>Thông tin được tổng hợp từ các nguồn chính thức của tỉnh Lào Cai</p>
        </div>
      </div>
    </div>
  );
}

export default App;
