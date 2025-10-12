import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
  padding: "40px 20px",
  fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  position: "relative"
};

const backgroundAnimationStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%)
  `,
  zIndex: 0
};

const contentWrapperStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  position: "relative",
  zIndex: 1
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "40px",
  color: "white"
};

const titleStyle = {
  fontSize: "3rem",
  fontWeight: "800",
  marginBottom: "16px",
  background: "linear-gradient(135deg, #ffffff 0%, #a8b9ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "white",
  backgroundClip: "text",
  letterSpacing: "-0.02em"
};

const backButtonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease",
  marginBottom: "20px"
};

const controlSectionStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px",
  flexWrap: "wrap"
};

const labelStyle = {
  color: "#e0e0e0",
  fontSize: "16px",
  fontWeight: "500"
};

const selectStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const buttonStyle = {
  padding: "12px 32px",
  fontSize: "16px",
  fontWeight: "600",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
};

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
  backdropFilter: "blur(10px)"
};

const textareaStyle = {
  width: "100%",
  padding: "16px",
  fontSize: "15px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "white",
  resize: "vertical",
  fontFamily: "'Fira Code', 'Courier New', monospace",
  lineHeight: "1.6"
};

const resultCardStyle = {
  backgroundColor: "rgba(76, 175, 80, 0.1)",
  border: "1px solid rgba(76, 175, 80, 0.3)",
  borderRadius: "12px",
  padding: "24px",
  color: "#b2fab4"
};

export default function Frontend() {
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctness, setCorrectness] = useState(null);
  const [corrections, setCorrections] = useState('');
  const [correctCode, setCorrectCode] = useState('');
  const [showCorrectCode, setShowCorrectCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleGenerateQuestion = async () => {
    setLoading(true);
    try {
      const prompt = `Assume I am a fresher who has just joined an IT company in a frontend developer role. I want to get familiar with the typical tasks and coding questions I am likely to face in this role at a multinational company (MNC). Please provide a sample coding question related to frontend design that a front end developer would commonly be assigned in an MNC, along with clear and detailed specifications that follow industry practices. The difficulty level should be ${difficulty}. Return only the question and specifications, without any explanations or answers. The question should be suitable for implementation in any programming language or framework, based on the user's preference.`;

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';

      setQuestion(generatedText);
      setCorrectness(null);
      setCorrections('');
      setCorrectCode('');
      setShowCorrectCode(false);
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      alert('Something went wrong!');
    }
    setLoading(false);
  };

  const handleSubmitAnswer = async () => {
    if (!question) {
      alert('Please generate a question first!');
      return;
    }
    if (!userAnswer.trim()) {
      alert('Please enter your answer before submitting.');
      return;
    }

    setLoading(true);

    try {
      const prompt = `You are a frontend code reviewing assistant. Evaluate the following answer to the given question. Only check for major logic or syntax errors and neglect very minute errors. Return the correctness percentage as a number, a list of corrections as descriptive words (not code), and the fully correct code separately.

Question:
${question}

User's answer:
${userAnswer}

Respond in the following JSON format ONLY:
{
  "correctness_percentage": <number>,
  "corrections": "<descriptive text corrections>",
  "correct_code": "<fully corrected code>"
}`;

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      let jsonResponse = null;
      try {
        jsonResponse = JSON.parse(rawText);
      } catch {
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) {
          jsonResponse = JSON.parse(match[0]);
        } else {
          alert('Failed to parse response from API.');
          setLoading(false);
          return;
        }
      }

      setCorrectness(jsonResponse.correctness_percentage);
      setCorrections(jsonResponse.corrections);
      setCorrectCode(jsonResponse.correct_code);
      setShowCorrectCode(false);
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      alert('Something went wrong!');
    }

    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundAnimationStyle} />
      <div style={contentWrapperStyle}>
        <Link 
          to="/" 
          style={backButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.transform = "translateX(-5px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.transform = "translateX(0)";
          }}
        >
          ← Back to Home
        </Link>

        <div style={headerStyle}>
          <h1 style={titleStyle}>Frontend Development</h1>
          <p style={{ fontSize: "1.1rem", color: "#e0e0e0", opacity: 0.85 }}>
            Master UI/UX design and modern frontend frameworks
          </p>
        </div>

        <div style={controlSectionStyle}>
          <label htmlFor="difficulty" style={labelStyle}>
            Select Difficulty:
          </label>
          <select 
            id="difficulty" 
            value={difficulty} 
            onChange={handleDifficultyChange}
            style={selectStyle}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button 
            onClick={handleGenerateQuestion} 
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => !loading && (e.target.style.transform = "translateY(0)")}
          >
            {loading ? 'Loading...' : 'Generate Question'}
          </button>
        </div>

        {question && (
          <div style={cardStyle}>
            <h3 style={{ color: "white", marginBottom: "16px", fontSize: "1.2rem" }}>
              Generated Question & Specifications:
            </h3>
            <div style={{ color: "#e0e0e0", lineHeight: "1.8" }}>
              <ReactMarkdown>{question}</ReactMarkdown>
            </div>
          </div>
        )}

        {question && (
          <>
            <textarea
              placeholder="Enter your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              rows={12}
              style={textareaStyle}
            />

            <button
              onClick={handleSubmitAnswer}
              disabled={loading}
              style={{
                ...buttonStyle,
                marginTop: "20px",
                width: "100%",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => !loading && (e.target.style.transform = "translateY(0)")}
            >
              {loading ? 'Submitting...' : 'Submit Answer'}
            </button>
          </>
        )}

        {correctness !== null && (
          <div style={resultCardStyle}>
            <h3 style={{ marginBottom: "20px", fontSize: "1.4rem" }}>Evaluation Result</h3>
            <p style={{ fontSize: "1.1rem", marginBottom: "12px" }}>
              <strong>Correctness Percentage:</strong> {correctness}%
            </p>
            <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
              <strong>Corrections:</strong> {corrections}
            </p>

            {!showCorrectCode && correctCode && (
              <button
                onClick={() => setShowCorrectCode(true)}
                style={{
                  ...buttonStyle,
                  background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              >
                REVEAL Correct Code
              </button>
            )}

            {showCorrectCode && (
              <pre
                style={{
                  marginTop: "20px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  borderRadius: "8px",
                  overflowX: "auto",
                  color: "#dcdcdc",
                  whiteSpace: "pre-wrap",
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  fontSize: "14px",
                  lineHeight: "1.6"
                }}
              >
                {correctCode}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}