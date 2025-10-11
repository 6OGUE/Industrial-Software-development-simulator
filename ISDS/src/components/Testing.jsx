import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


export default function Testing() {
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
      const prompt = `Assume I am a fresher who has just joined an IT company in a tester role. I want to get familiar with the typical tasks and coding questions I am likely to face in this role at a multinational company (MNC). Please provide a sample coding question related to testing that a tester would commonly be assigned in an MNC, along with clear and detailed specifications that follow industry practices. The difficulty level should be ${difficulty}. Return only the question and specifications, without any explanations or answers. The question should be suitable for implementation in any programming language or testing tool, based on the user’s preference.`;

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
      const prompt = `You are a testing assistant. Evaluate the following answer to the given question. Only check for major logic or syntax errors and neglect very minute errors. Return the correctness percentage as a number, a list of corrections as descriptive words (not code), and the fully correct code separately.

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
    <div
      style={{
        color: 'white',
        textAlign: 'center',
        marginTop: '50px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2>This is Testing</h2>

      <label htmlFor="difficulty" style={{ marginRight: 10 }}>
        Select Difficulty:
      </label>
      <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleGenerateQuestion} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Question'}
        </button>
      </div>

      {question && (
  <div
    style={{
      marginTop: 30,
      padding: 15,
      border: '1px solid #ccc',
      borderRadius: 5,
      backgroundColor: '#222',
      whiteSpace: 'pre-wrap',
      textAlign: 'left',
    }}
  >
    <strong>Generated Question & Specifications:</strong>
    <ReactMarkdown>{question}</ReactMarkdown>
  </div>
)}

      {question && (
        <>
          <textarea
            placeholder="Enter your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={10}
            style={{
              width: '100%',
              marginTop: 20,
              padding: 10,
              fontSize: 16,
              borderRadius: 5,
              border: '1px solid #888',
              backgroundColor: '#111',
              color: 'white',
              resize: 'vertical',
            }}
          />

          <button
            onClick={handleSubmitAnswer}
            disabled={loading}
            style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}
          >
            {loading ? 'Submitting...' : 'Submit Answer'}
          </button>
        </>
      )}

      {correctness !== null && (
        <div
          style={{
            marginTop: 30,
            padding: 15,
            border: '1px solid #4caf50',
            borderRadius: 5,
            backgroundColor: '#163522',
            color: '#b2fab4',
            textAlign: 'left',
          }}
        >
          <h3>Evaluation Result:</h3>
          <p>
            <strong>Correctness Percentage:</strong> {correctness}%
          </p>
          <p>
            <strong>Corrections:</strong> {corrections}
          </p>

          {!showCorrectCode && correctCode && (
            <button
              onClick={() => setShowCorrectCode(true)}
              style={{ marginTop: 15, padding: '8px 16px', fontSize: 16 }}
            >
              REVEAL Correct Code
            </button>
          )}

          {showCorrectCode && (
            <pre
              style={{
                marginTop: 20,
                backgroundColor: '#111',
                padding: 15,
                borderRadius: 5,
                overflowX: 'auto',
                color: '#dcdcdc',
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
              }}
            >
              {correctCode}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
