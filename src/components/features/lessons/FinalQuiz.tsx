"use client";
import React from "react";
import { mathQuiz, readingWritingQuiz } from "@/data/finalquiz";

interface FinalQuizProps {
  quizType: "math" | "reading";
  onBack: () => void;
}

const FinalQuiz: React.FC<FinalQuizProps> = ({ quizType, onBack }) => {
  const quiz = quizType === "math" ? mathQuiz : readingWritingQuiz;
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [showResults, setShowResults] = React.useState(false);

  const handleSelect = (idx: number, option: string) => {
    if (answers[idx]) return;
    setAnswers((prev) => ({ ...prev, [idx]: option }));
  };

  const correctCount = quiz.filter((q, i) => answers[i] === q.correctAnswer).length;

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</button>
      <h2 className="text-2xl font-bold mb-4 text-center">{quizType === "math" ? "Math" : "Reading & Writing"} Final Quiz</h2>
      {quiz.map((q, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded bg-gray-100">
          <p className="font-medium mb-2">Q{idx + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const selected = answers[idx] === opt;
              const correct = q.correctAnswer === opt;
              const isAnswered = answers[idx];
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(idx, opt)}
                  className={`block w-full text-left px-4 py-2 rounded border ${
                    !isAnswered
                      ? "hover:bg-gray-200"
                      : correct
                      ? "bg-green-200 border-green-400"
                      : selected
                      ? "bg-red-200 border-red-400"
                      : "bg-white"
                  }`}
                  disabled={!!isAnswered}
                >
                  {opt}
                  {isAnswered && correct && <span className="ml-2 text-green-600 font-bold">✔</span>}
                  {isAnswered && selected && !correct && (
                    <span className="ml-2 text-red-600 font-bold">✖</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button
        onClick={() => setShowResults(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4 w-full"
        disabled={Object.keys(answers).length !== quiz.length}
      >
        Submit Quiz
      </button>

      {showResults && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Quiz Results</h3>
          <p className="text-lg mb-2">You got {correctCount} out of {quiz.length} correct!</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to Lessons
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalQuiz;
