"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  phrases: readonly string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
};

const TypewriterText = ({
  phrases,
  className = "",
  typeSpeed = 72,
  deleteSpeed = 42,
  pauseAfterType = 2200,
  pauseAfterDelete = 480,
}: TypewriterTextProps) => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    const current = phrases[phraseIndex] ?? "";
    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && text === current) {
      delay = pauseAfterType;
    } else if (isDeleting && text === "") {
      delay = pauseAfterDelete;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
          return;
        }
        setIsDeleting(true);
        return;
      }

      if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return (
    <p className={`typewriter ${className}`}>
      <span aria-hidden="true">
        {text}
        <span className="typewriter-cursor" />
      </span>

      <span className="sr-only" aria-live="polite">
        {phrases[phraseIndex]}
      </span>
    </p>
  );
};

export default TypewriterText;
