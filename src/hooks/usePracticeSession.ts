import { useState, useEffect, useRef } from "react";

const DATA_URL =
  "https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5";

// Keep type definitions here or move them to a central types file e.g., types/index.ts
export type Question = {
  id: string;
  domain: string;
  visuals: { type: string; svg_content: string };
  question: {
    choices: Record<string, string>;
    question: string;
    paragraph: string | null;
    explanation: string;
    correct_answer: string;
  };
  difficulty: "Easy" | "Medium" | "Hard" | string;
};

export type Data = {
  math: Question[];
  english: Question[];
};

export type QuestionHistory = {
  id: number;
  question: Question;
  userAnswer: string | null;
  isCorrect: boolean | null;
  isMarkedForLater: boolean;
  isAnswered: boolean;
};

export const usePracticeSession = () => {
  const [data, setData] = useState<Data | null>(null);
  const [difficulty, setDifficulty] = useState<
    "All" | "Easy" | "Medium" | "Hard"
  >("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [mathDomains, setMathDomains] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchQuestionTrigger, setFetchQuestionTrigger] = useState(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [mathCorrect, setMathCorrect] = useState<number>(0);
  const [mathWrong, setMathWrong] = useState<number>(0);
  const [predictedMathScore, setPredictedMathScore] = useState<number>(200);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([]);
  const questionHistoryRef = useRef(questionHistory);
  useEffect(() => {
    questionHistoryRef.current = questionHistory;
  }, [questionHistory]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setError(null);
        const response = await fetch(DATA_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData: Data = await response.json();
        setData(jsonData);
        const uniqueMathDomains = Array.from(
          new Set(jsonData.math.map((q) => q.domain))
        );
        setMathDomains(uniqueMathDomains);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Failed to fetch data")
        );
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Load a new question
  useEffect(() => {
    if (currentHistoryIndex !== null) {
      setIsLoading(false);
      return;
    }
    if (!data) return;

    setIsLoading(true);
    const questions = data.math;
    let allFilteredQuestions = questions.filter((q) => {
      const matchesDifficulty =
        difficulty === "All" || q.difficulty === difficulty;
      const matchesDomain =
        selectedDomain === "All" || q.domain === selectedDomain;
      return matchesDifficulty && matchesDomain;
    });

    const attemptedQuestionIds = new Set(
      questionHistoryRef.current
        .filter((item) => item.isAnswered)
        .map((item) => item.question.id)
    );
    const unattemptedQuestions = allFilteredQuestions.filter(
      (q) => !attemptedQuestionIds.has(q.id)
    );

    let newQuestion: Question | null = null;
    if (unattemptedQuestions.length > 0) {
      newQuestion =
        unattemptedQuestions[
          Math.floor(Math.random() * unattemptedQuestions.length)
        ];
    } else if (allFilteredQuestions.length > 0) {
      newQuestion =
        allFilteredQuestions[
          Math.floor(Math.random() * allFilteredQuestions.length)
        ];
    }

    setCurrentQuestion(newQuestion);
    setIsLoading(false);
  }, [
    data,
    difficulty,
    selectedDomain,
    fetchQuestionTrigger,
    currentHistoryIndex,
  ]);

  // Update predicted score
  useEffect(() => {
    const mathTotal = mathCorrect + mathWrong;
    const mathPercentage = mathTotal === 0 ? 0 : mathCorrect / mathTotal;
    const newMathScore = Math.round(mathPercentage * 600 + 200);
    setPredictedMathScore(newMathScore);
  }, [mathCorrect, mathWrong]);

  const showNext = () => {
    setCurrentHistoryIndex(null);
    setFetchQuestionTrigger((prev) => prev + 1);
  };

  return {
    data,
    difficulty,
    setDifficulty,
    selectedDomain,
    setSelectedDomain,
    mathDomains,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
    setIsLoading,
    correctCount,
    setCorrectCount,
    wrongCount,
    setWrongCount,
    currentStreak,
    setCurrentStreak,
    maxStreak,
    setMaxStreak,
    mathCorrect,
    setMathCorrect,
    mathWrong,
    setMathWrong,
    predictedMathScore,
    questionHistory,
    setQuestionHistory,
    currentHistoryIndex,
    setCurrentHistoryIndex,
    showNext,
  };
};
