import React, { useEffect, useState } from 'react';

interface LiveRegionProps {
  message: string;
  isError?: boolean;
  timeout?: number;
}

const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  isError = false,
  timeout = 5000
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [message, timeout]);

  if (!show) return null;

  return (
    <div
      className="sr-only"
      role="status"
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default LiveRegion;