import React, { useEffect, useState } from 'react';
import './Center.css';
import apiClient from '../../../lib/apiClient';
import { useAuth } from '../../../auth/AuthContext';

function Center() {
  const { refreshUser } = useAuth();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);

  const loadQuestion = async () => {
    try {
      setSelected('');
      setResult(null);
      const resp = await apiClient.get('/quiz/next?topic=cpp');
      setQuestion(resp.data.question);
    } catch (error) {
      console.error('Failed to load question:', error);
      // You could show an error message to the user here
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const submit = async (key) => {
    if (!question) return;
    setSelected(key);
    try {
      const resp = await apiClient.post('/quiz/answer', { selectedKey: key, correct: question.correct });
      setResult({ 
        correct: resp.data.correct, 
        explanation: question.explanation,
        newPoints: resp.data.newPoints,
        pointsChange: resp.data.pointsChange
      });
      
      // Refresh user data to update points in profile and other components
      if (resp.data.newPoints !== null) {
        await refreshUser();
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
      // You could show an error message to the user here
    }
  };

  return (
    <div className="center_body">
      <div className="center_card glass">
        {!question ? (
          <>
            <h2 className="center_title">Loading question…</h2>
          </>
        ) : (
          <>
            <h2 className="center_title">MCQ — C++</h2>
            <p className="center_subtitle">{question.text}</p>
            <div style={{ 
              display: 'grid', 
              gap: 16, 
              marginTop: '30px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {question.answers.map((a) => {
                let buttonStyle = {
                  borderRadius: '16px',
                  padding: '18px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'left',
                  width: '100%'
                };
                
                if (result) {
                  if (a.key === question.correct) {
                    buttonStyle = {
                      ...buttonStyle,
                      background: 'linear-gradient(135deg, var(--success), var(--success-light))',
                      color: 'white',
                      borderColor: 'var(--success)',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                    };
                  } else if (a.key === selected && !result.correct) {
                    buttonStyle = {
                      ...buttonStyle,
                      background: 'linear-gradient(135deg, var(--error), var(--error-light))',
                      color: 'white',
                      borderColor: 'var(--error)',
                      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                    };
                  } else {
                    buttonStyle = {
                      ...buttonStyle,
                      background: '#f5f5f5',
                      color: '#737373',
                      borderColor: '#e5e5e5'
                    };
                  }
                } else {
                  buttonStyle = {
                    ...buttonStyle,
                    background: 'white',
                    color: 'var(--text-ink)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  };
                }
                
                return (
                  <button
                    key={a.key}
                    disabled={!!result}
                    onClick={() => submit(a.key)}
                    style={buttonStyle}
                    className="animate-fadeInUp"
                  >
                    <span style={{ 
                      fontWeight: '700', 
                      marginRight: '12px',
                      color: result ? 'inherit' : '#00af9b'
                    }}>
                      {a.key.toUpperCase()}.
                    </span>
                    {a.text}
                  </button>
                );
              })}
            </div>
            {result && (
              <div style={{ 
                marginTop: 30, 
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                animation: 'fadeInUp 0.6s ease-out',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    marginRight: '12px'
                  }}>
                    {result.correct ? '🎉' : '💡'}
                  </div>
                  <h3 style={{ 
                    margin: 0, 
                    fontWeight: 700, 
                    color: result.correct ? '#00af9b' : '#ff2d55',
                    fontSize: '1.5rem'
                  }}>
                    {result.correct ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                
                {result.newPoints !== null && (
                  <div style={{
                    background: result.correct 
                      ? 'linear-gradient(135deg, var(--success), var(--success-light))'
                      : 'linear-gradient(135deg, var(--error), var(--error-light))',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '1.1rem', 
                      color: 'white', 
                      fontWeight: 700 
                    }}>
                      {result.correct ? '🏆' : '📉'} {result.pointsChange > 0 ? '+' : ''}{result.pointsChange} points! Total: {result.newPoints}
                    </p>
                  </div>
                )}
                
                {!result.correct && (
                  <div style={{
                    background: 'rgba(244, 67, 54, 0.1)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    border: '1px solid rgba(244, 67, 54, 0.2)'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.95rem', 
                      color: '#d32f2f',
                      fontWeight: 600
                    }}>
                      Correct answer: <strong>{question.answers.find(a => a.key === question.correct)?.text}</strong>
                    </p>
                  </div>
                )}
                
                {question.explanation && (
                  <div style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e9ecef'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '1rem',
                      color: 'var(--text-ink)',
                      lineHeight: '1.6'
                    }}>
                      💡 <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
                
                <div style={{ 
                  display: 'flex', 
                  gap: 12, 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button 
                    className="primary_btn" 
                    onClick={loadQuestion}
                    style={{
                      background: '#00af9b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '12px 24px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0, 175, 155, 0.2)'
                    }}
                  >
                    Next Question
                  </button>
                  <a href="/leaderboard" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/leaderboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                    <button 
                      style={{
                        background: 'white',
                        color: 'var(--text-ink)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        padding: '12px 24px',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      View Leaderboard
                    </button>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Center;
