import { useEffect, useRef, useState } from "react";
import "./InitialLoader.css";

type InitialLoaderProps = {
  duration?: number;
  onComplete?: () => void;
};

const pad = (value: number) => String(value).padStart(3, "0");

export function InitialLoader({
  duration = 3200,
  onComplete,
}: InitialLoaderProps) {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("Building identity");
  const [isFinished, setIsFinished] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let startTime: number | null = null;

    const updateCounter = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * 100);

      setCounter(value);

      if (value < 30) {
        setStatus("Building identity");
      } else if (value < 67) {
        setStatus("Drawing the connection");
      } else if (value < 100) {
        setStatus("Optimizing conversion");
      } else {
        setStatus("Connection complete");
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCounter);
      }
    };

    frameRef.current = requestAnimationFrame(updateCounter);

    const finishTimer = window.setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = previousOverflow;

      window.setTimeout(() => {
        onComplete?.();
      }, 720);
    }, duration + 260);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`initial-loader${isFinished ? " is-finished" : ""}`}
      aria-hidden={isFinished}
    >
      <div className="initial-loader__top">
        <span>Post Click Lab</span>
        <span className="initial-loader__counter">
          {pad(counter)} — 100
        </span>
      </div>

      <div className="initial-loader__stage">
        <div className="initial-loader__orbital" />

        <div className="initial-loader__wordmark-block">
          <div className="initial-loader__wordmark" aria-label="PCL">
            <span className="initial-loader__letter initial-loader__p">P</span>

            <span className="initial-loader__c-wrap">
              <svg
                className="initial-loader__c-draw"
                viewBox="0 0 160 160"
                aria-hidden="true"
              >
                <circle cx="80" cy="80" r="56" />
                <path d="M126 43C111 24 89 16 68 21" />
              </svg>

              <span className="initial-loader__c-final">C</span>
              <span className="initial-loader__spark" />
            </span>

            <span className="initial-loader__letter initial-loader__l">L</span>
          </div>

          <p className="initial-loader__subtitle">Post Click Lab</p>
        </div>
      </div>

      <div className="initial-loader__bottom">
        <span>{status}</span>
        <span>Design · CRO · Development</span>
      </div>

      <div className="initial-loader__sweep" />

      <div className="initial-loader__progress">
        <div
          className="initial-loader__progress-bar"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
}
