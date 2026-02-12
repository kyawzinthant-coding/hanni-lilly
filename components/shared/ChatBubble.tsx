"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  side: "left" | "right";
  delay?: number;
  showTyping?: boolean;
}

export default function ChatBubble({
  message,
  side,
  delay = 0,
  showTyping = false,
}: ChatBubbleProps) {
  const [showMessage, setShowMessage] = useState(!showTyping);
  const [typedText, setTypedText] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    if (showTyping) {
      const typingTimer = setTimeout(() => setShowMessage(true), 800);
      return () => clearTimeout(typingTimer);
    }
  }, [visible, showTyping]);

  useEffect(() => {
    if (!showMessage || !visible) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setTypedText(message.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [showMessage, message, visible]);

  if (!visible) return null;

  const isRight = side === "right";

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`flex w-full ${isRight ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
          isRight
            ? "rounded-2xl rounded-br-none bg-[var(--rose)] text-[var(--ivory)]"
            : "rounded-2xl rounded-bl-none bg-[var(--ivory)] text-[var(--burgundy)]"
        }`}
      >
        {!showMessage ? (
          <div className="flex items-center gap-1 py-1">
            <span className="typing-dot opacity-60" />
            <span className="typing-dot opacity-60" />
            <span className="typing-dot opacity-60" />
          </div>
        ) : (
          <span>{typedText}</span>
        )}
      </div>
    </motion.div>
  );
}
