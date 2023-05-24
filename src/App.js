import React, { useState } from 'react';
import './style.css';
import { Data } from './Data';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showData, setShowData] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});


  const currentQuestion = Data[currentIndex];
  const isOptionSelected = selectedOptions[currentIndex] !== undefined;
  const isLastQuestion = currentIndex === Data.length - 1;

  const handleOptionChange = (optionId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentIndex]: optionId,
    }));

    if (
      currentQuestion.options.find((option) => option.id === optionId)
        ?.isCorrect
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    
  };

  const handleSubmit = () => {
    if (isLastQuestion) {
      setShowData(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOptions({});
      
    }
  };

  return (
    <div>
      <h2>Quiz questions</h2>

      {showData ? (
        <h3 className="score">Score: {score}</h3>
      ) : (
        <div>
          <p>
            Q{currentIndex+1}). {currentQuestion.question}
          </p>
          {currentQuestion.options.map((option, index) => (
            <ol key={option.id}>
              <label>
                <input
                  type="radio"
                  name={`option-${currentIndex}`}
                  value={option.id}
                  checked={selectedOptions[currentIndex] === option.id}
                  onChange={() => handleOptionChange(option.id)}
                />
               {option.text}
              </label>
            </ol>
          ))}
          {isOptionSelected && (
            <button onClick={handleSubmit}>
              {isLastQuestion ? 'Submit' : 'Next'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
