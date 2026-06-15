'use client';

import { useState, useEffect, useCallback } from 'react';
import { MCQSet, MCQ } from '@/data/dummy-mcq-data';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

interface QuizModalProps {
  set: MCQSet;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizModal({ set, isOpen, onClose }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = set.mcqs[currentQuestionIndex];
  const totalQuestions = set.mcqs.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const startTimer = useCallback(() => {
    setTimeRemaining(currentQuestion.timeLimit);
    setShowHint(false);
  }, [currentQuestion.timeLimit]);

  useEffect(() => {
    if (isOpen && !isAnswerSubmitted && !showResults) {
      startTimer();
    }
  }, [isOpen, currentQuestionIndex, isAnswerSubmitted, showResults, startTimer]);

  useEffect(() => {
    if (!isOpen || isAnswerSubmitted || showResults || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isAnswerSubmitted, showResults, timeRemaining]);

  const handleTimeUp = () => {
    if (!isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      const correctOption = currentQuestion.options.find(opt => opt.isCorrect);
      if (correctOption) {
        setSelectedAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: correctOption.id,
        }));
      }
    }
  };

  const handleAnswerSelectAndAutoSubmit = (optionId: string) => {
    if (isAnswerSubmitted) return;

    const option = currentQuestion.options.find(opt => opt.id === optionId);
    if (!option) return;

    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));

    if (option.isCorrect) {
      setIsAnswerSubmitted(true);
      setTimeout(() => {
        if (isLastQuestion) {
          setShowResults(true);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setIsAnswerSubmitted(false);
          setShowHint(false);
        }
      }, 1000);
    } else {
      setIsAnswerSubmitted(true);
      setShowHint(true);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIsAnswerSubmitted(false);
    setTimeRemaining(0);
    setShowHint(false);
  };

  const calculateScore = () => {
    let correct = 0;
    set.mcqs.forEach(mcq => {
      const selectedOptionId = selectedAnswers[mcq.id];
      const correctOption = mcq.options.find(opt => opt.isCorrect);
      if (correctOption && selectedOptionId === correctOption.id) {
        correct++;
      }
    });
    return correct;
  };

  const getCorrectAnswer = (mcq: MCQ) => {
    return mcq.options.find(opt => opt.isCorrect)?.text || '';
  };

  if (!isOpen) return null;

  const isCorrectAnswer = () => {
    const selectedOptionId = selectedAnswers[currentQuestion.id];
    const correctOption = currentQuestion.options.find(opt => opt.isCorrect);
    return correctOption && selectedOptionId === correctOption.id;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <Heading2>Quiz Results</Heading2>
          <Para style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>
            {score}/{totalQuestions}
          </Para>
          <Para style={{ fontSize: '24px', marginBottom: '20px' }}>{percentage}% Correct</Para>

          <div style={{ maxHeight: '300px', overflowY: 'auto', textAlign: 'left' }}>
            {set.mcqs.map((mcq, index) => {
              const selectedOptionId = selectedAnswers[mcq.id];
              const correctOption = mcq.options.find(opt => opt.isCorrect);
              const isCorrect = selectedOptionId === correctOption?.id;

              return (
                <div
                  key={mcq.id}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    border: `1px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
                    borderRadius: '4px',
                  }}
                >
                  <Para style={{ fontWeight: 'bold' }}>
                    Q{index + 1}: {mcq.question}
                  </Para>
                  <Para style={{ color: isCorrect ? '#28a745' : '#dc3545' }}>
                    Your answer:{' '}
                    {mcq.options.find(o => o.id === selectedOptionId)?.text || 'Not answered'}
                  </Para>
                  {!isCorrect && (
                    <Para style={{ color: '#28a745' }}>Correct: {getCorrectAnswer(mcq)}</Para>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleRestart} style={buttonStyle}>
              Restart Quiz
            </button>
            <button
              onClick={onClose}
              style={{ ...buttonStyle, marginLeft: '10px', backgroundColor: '#6c757d' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correct = isCorrectAnswer();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Heading2>{set.name}</Heading2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            color: '#666',
          }}
        >
          <span>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span
            style={{
              color: timeRemaining <= 5 ? '#dc3545' : timeRemaining <= 10 ? '#ffc107' : '#28a745',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            ⏱ {timeRemaining}s
          </span>
        </div>

        <div
          style={{
            height: '8px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#007bff',
              borderRadius: '4px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <Heading3 style={{ marginBottom: '20px' }}>{currentQuestion.question}</Heading3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
            const isCorrectOption = option.isCorrect;
            const isWrong = isAnswerSubmitted && isSelected && !option.isCorrect;

            let backgroundColor = '#f8f9fa';
            let borderColor = '#dee2e6';

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                backgroundColor = '#d4edda';
                borderColor = '#28a745';
              } else if (isWrong) {
                backgroundColor = '#f8d7da';
                borderColor = '#dc3545';
              }
            } else if (isSelected) {
              backgroundColor = '#cfe2ff';
              borderColor = '#007bff';
            }

            return (
              <div
                key={option.id}
                onClick={() => handleAnswerSelectAndAutoSubmit(option.id)}
                style={{
                  padding: '15px',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px',
                  cursor: isAnswerSubmitted ? 'default' : 'pointer',
                  backgroundColor,
                  transition: 'all 0.2s',
                }}
              >
                {option.text}
              </div>
            );
          })}
        </div>

        {showHint && currentQuestion.hint && (
          <div
            style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '6px',
              color: '#856404',
            }}
          >
            <strong>💡 Hint:</strong> {currentQuestion.hint}
          </div>
        )}

        {isAnswerSubmitted && !correct && (
          <div
            style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#d4edda',
              border: '1px solid #28a745',
              borderRadius: '6px',
              color: '#155724',
            }}
          >
            <strong>✓ Correct Answer:</strong>{' '}
            {currentQuestion.options.find(o => o.isCorrect)?.text}
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          {!isAnswerSubmitted ? (
            <div style={{ color: '#666', fontSize: '14px' }}>Select an answer to continue...</div>
          ) : correct ? (
            <div
              style={{
                color: '#28a745',
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '12px 24px',
                backgroundColor: '#d4edda',
                borderRadius: '6px',
              }}
            >
              ✓ Correct! Moving to next...
            </div>
          ) : (
            <button onClick={handleNext} style={buttonStyle}>
              {isLastQuestion ? 'See Results' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '600px',
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
};
