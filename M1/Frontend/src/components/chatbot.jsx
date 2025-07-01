/*global console */
/*global alert */

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip } from "lucide-react";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Your actual Gemini AI API configuration
  const API_KEY = "AIzaSyDtf7JlHI60LvUFsEpOBnJcRlJIhCqIBRs";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      // Initialize with welcome message
      setMessages([
        {
          id: 1,
          text: "Hi! I'm your AI study assistant. How can I help you today?",
          isBot: true,
          timestamp: new Date(),
        },
      ]);

      // Load mock user profile (in real app, fetch from your API)
      setUserProfile({
        learning_style: "",
        mbti: "",
      });
    }
  }, [isChatOpen, messages.length]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Please select a file under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result.split(",")[1];
      setSelectedFile({
        data: base64String,
        mime_type: file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const generateBotResponse = async (userMessage, fileData = null) => {
    const requestParts = [{ text: userMessage }];

    if (fileData) {
      requestParts.push({
        inline_data: {
          mime_type: fileData.mime_type,
          data: fileData.data,
        },
      });
    }

    // Build conversation history for context
    const recentHistory = messages.slice(-5).map((msg) => ({
      role: msg.isBot ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    let requestBody = {
      contents: [...recentHistory, { role: "user", parts: requestParts }],
    };

    // Apply personalization based on user profile
    const taskKeywords = [
      "study plan",
      "quiz",
      "motivate",
      "summarize",
      "feedback",
      "explain",
      "help",
    ];
    const hasTask = taskKeywords.some((keyword) =>
      userMessage.toLowerCase().includes(keyword)
    );

    if (hasTask && userProfile) {
      const mbtiTraits = {
        ISTJ: "prefers structured, step-by-step explanations",
        ISTP: "enjoys hands-on problem-solving",
        ESTP: "thrives on action-oriented advice",
        ESTJ: "values clear, organized plans",
        ISFJ: "appreciates supportive, detail-oriented guidance",
        ISFP: "responds to creative, flexible advice",
        ESFP: "loves engaging, lively tips",
        ESFJ: "prefers warm, community-focused guidance",
        INFJ: "seeks deep, meaningful insights",
        INFP: "responds to inspirational suggestions",
        ENFP: "thrives on creative, big-picture ideas",
        ENFJ: "values empathetic, motivating advice",
        INTJ: "prefers strategic, long-term planning",
        INTP: "enjoys theoretical exploration",
        ENTP: "loves innovative, debate-friendly ideas",
        ENTJ: "seeks bold, goal-oriented strategies",
      };

      const learningStyles = {
        Visual: "use visual metaphors and suggest diagrams",
        Auditory: "explain verbally with stories and examples",
        Kinesthetic:
          "incorporate hands-on activities and practical applications",
        "Reading/Writing": "provide detailed notes and written explanations",
      };

      const personalizedPrompt = `You are assisting a ${
        userProfile.learning_style
      }-${userProfile.mbti} user. For ${userProfile.mbti} personality, they ${
        mbtiTraits[userProfile.mbti] || "have unique preferences"
      }. For ${userProfile.learning_style} learners, ${
        learningStyles[userProfile.learning_style] ||
        "adapt your approach accordingly"
      }. Tailor your response to their learning style and personality: `;

      requestBody.contents[requestBody.contents.length - 1].parts.unshift({
        text: personalizedPrompt,
      });
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove markdown bold
        .trim();

      return botResponse;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
      file: selectedFile,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const botResponseText = await generateBotResponse(
        inputMessage,
        selectedFile
      );

      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 ${
          isChatOpen ? "rotate-180" : ""
        }`}
      >
        {isChatOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Chatbot Popup */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[500px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-40 flex flex-col overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Study Assistant</h3>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                } opacity-100 transform translate-y-0 transition-all duration-300`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    message.isBot
                      ? message.isError
                        ? "bg-red-100 text-red-800 rounded-bl-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md"
                  }`}
                >
                  {message.text}
                  {message.file && (
                    <div className="mt-2">
                      <img
                        src={`data:${message.file.mime_type};base64,${message.file.data}`}
                        alt="Uploaded file"
                        className="max-w-full h-auto rounded"
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-3 py-2 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            {selectedFile && (
              <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate">
                  📎 {selectedFile.name}
                </span>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 resize-none max-h-20"
                  rows={1}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={(!inputMessage.trim() && !selectedFile) || isTyping}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
