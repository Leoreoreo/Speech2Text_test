import React, { useState } from 'react';
import SpeechToText from 'speech-to-text';

const SpeechRecognition = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState(null);
  let listener = null;

  const handlePress = () => {
    if (!listener) {
      try {
        const onAnythingSaid = (text) => {
          setRecognizedText(text);
        };

        const onEndEvent = () => {
          listener = null;
        };

        listener = new SpeechToText(onAnythingSaid, onEndEvent);
        listener.startListening();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleRelease = () => {
    if (listener) {
      listener.stopListening();
      listener = null;
    }
  };

  return (
    <div>
      <button onMouseDown={handlePress} onMouseUp={handleRelease} onTouchStart={handlePress} onTouchEnd={handleRelease} disabled={error}>
        Record
      </button>
      {error && <p>Error: {error}</p>}
      {recognizedText && <p>{recognizedText}</p>}
    </div>
  );
};

export default SpeechRecognition;
