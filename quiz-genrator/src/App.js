import React, { useState } from "react";
import axios from "axios";

function QuizApp() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/generate-quiz", {
        topic,
      });
      setQuiz(response.data.quiz);
      setSelectedAnswers({});
      setSubmitted(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, optionKey) => {
    if (!submitted) {
      setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionKey });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Gemini Quiz App</h1>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={fetchQuiz}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Quiz"}
          </button>
        </div>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        {quiz.length > 0 && (
          <div className="space-y-6 mt-4">
            {quiz.map((q, index) => (
              <div key={index}>
                <h3 className="font-medium mb-2">{index + 1}. {q.question}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(q.options).map(([key, value]) => {
                    const isSelected = selectedAnswers[index] === key;
                    const isCorrect = submitted && key === q.answer;
                    const isWrong = submitted && isSelected && key !== q.answer;

                    return (
                      <label
                        key={key}
                        className={`p-2 border rounded-md cursor-pointer flex items-center
                          ${isSelected ? "border-indigo-500" : ""}
                          ${isCorrect ? "bg-green-100 border-green-600" : ""}
                          ${isWrong ? "bg-red-100 border-red-600" : ""}
                        `}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={key}
                          disabled={submitted}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(index, key)}
                          className="mr-2"
                        />
                        {key}. {value}
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-1 text-sm text-green-600">
                    Correct Answer: {q.answer}
                  </p>
                )}
              </div>
            ))}
            {!submitted && (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Submit Answers
              </button>
            )}
            {submitted && (
              <p className="text-xl text-center font-semibold text-blue-600">
                Your Score: {getScore()} / {quiz.length}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizApp;
