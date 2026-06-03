"use client";

import { useEffect, useRef } from "react";

const ProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateProgress() {
      if (!progressBarRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const height = scrollHeight - clientHeight;
      if (height === 0) return;

      const percentage = (scrollTop / height) * 100;
      progressBarRef.current.style.width = `${percentage}%`;
    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="fixed top-0 left-0 h-1 progress-gradient transition-[width] duration-150 ease-linear z-50 rounded-full"
    />
  );
};

export default ProgressBar;
