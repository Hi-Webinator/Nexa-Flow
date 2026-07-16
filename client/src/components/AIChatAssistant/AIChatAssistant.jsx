import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./_aiChatAssistant.scss";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const WELCOME_MESSAGE = {
  id: 1,
  role: "assistant",
  content:
    "Hi! I'm the NexaFlow AI Assistant. I can help you with tasks, answer questions, draft content, and more. What can I do for you?",
  timestamp: new Date(),
};

const SUGGESTED_PROMPTS = [
  "Generate a project plan",
  "Help me draft an email",
  "Create a task list",
  "What can NexaFlow do?",
];

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading || streaming) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = Date.now() + 1;

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);
      setStreaming(true);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.text }
                    : m,
                ),
              );
            }
          } catch (err) {
            if (err instanceof SyntaxError) continue; // partial JSON chunk
            throw err;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        // Drop an empty assistant placeholder if the stream failed early
        ...prev.filter((m) => m.role !== "assistant" || m.content !== ""),
        {
          id: Date.now() + 2,
          role: "assistant",
          content:
            "Sorry, I couldn't reach the assistant right now. Please try again in a moment.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setStreaming(false);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, timestamp: new Date() }]);
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatWidget"
            role="dialog"
            aria-label="NexaFlow AI Assistant"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="header">
              <div className="headerContent">
                <div className="title">
                  <div className="aiIcon" aria-hidden="true">✨</div>
                  <div>
                    <h3>NexaFlow Assistant</h3>
                    <span className="status">Always online</span>
                  </div>
                </div>
              </div>
              <div className="headerActions">
                <button
                  className="iconBtn"
                  onClick={clearChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  🔄
                </button>
                <button
                  className="iconBtn"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="messagesContainer" aria-live="polite">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`message ${msg.role} ${msg.isError ? "error" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="avatar" aria-hidden="true">
                      {msg.role === "user" ? "👤" : "🤖"}
                    </div>
                    <div className="messageContent">
                      <div className="bubble">{msg.content}</div>
                      <span className="time">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {streaming && (
                <motion.div
                  className="message assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="avatar" aria-hidden="true">🤖</div>
                  <div className="messageContent">
                    <div className="bubble">
                      <span className="typingDot"></span>
                      <span className="typingDot"></span>
                      <span className="typingDot"></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length === 1 && !streaming && (
              <motion.div
                className="suggestedPrompts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>Quick suggestions:</p>
                <div className="promptButtons">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      className="promptBtn"
                      onClick={() => {
                        setInput(prompt);
                        setTimeout(() => inputRef.current?.focus(), 100);
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="inputArea">
              <div className="inputWrapper">
                <textarea
                  ref={inputRef}
                  className="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything... (Shift+Enter for new line)"
                  aria-label="Message the NexaFlow assistant"
                  disabled={loading || streaming}
                  rows={1}
                />
                <motion.button
                  className={`sendBtn ${input.trim() ? "active" : ""}`}
                  onClick={handleSendMessage}
                  disabled={loading || streaming || !input.trim()}
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading || streaming ? <span className="spinner" /> : "→"}
                </motion.button>
              </div>
              <p className="disclaimer">
                AI responses are suggestions. Always verify important
                information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        className={`aiFloatingBtn ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI assistant chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="icon" aria-hidden="true">✨</span>
        <span className="badge">AI</span>
      </motion.button>
    </>
  );
};

export default AIChatAssistant;
