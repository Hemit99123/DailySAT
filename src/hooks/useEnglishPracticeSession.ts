import { useState, useEffect, useRef } from "react";
// @ts-ignore
import { convert } from "html-to-text";
const DATA_URL =
  "https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5";
const QUESTION_LIST_URL =
  "https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-questions";
const QUESTION_DETAIL_URL =
  "https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-question";

export const usePracticeSession = () => {
  const [data, setData] = useState<Data | null>(null);
  const [difficulty, setDifficulty] = useState<
    "All" | "Easy" | "Medium" | "Hard"
  >("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [englishDomains, setEnglishDomains] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchQuestionTrigger, setFetchQuestionTrigger] = useState(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [englishCorrect, setEnglishCorrect] = useState<number>(0);
  const [englishWrong, setEnglishWrong] = useState<number>(0);
  const [predictedEnglishScore, setPredictedEnglishScore] =
    useState<number>(200);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([]);
  const questionHistoryRef = useRef(questionHistory);
  useEffect(() => {
    questionHistoryRef.current = questionHistory;
  }, [questionHistory]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number | null>(
    null
  );

  const domainApiMapping: Record<string, string> = {
    "Information and Ideas": "INI",
    "Craft and Structure": "CAS",
    "Expression of Ideas": "EOI",
    "Standard English Conventions": "SEC",
  };

  const domainFullNameMapping: Record<string, string> = {
    INI: "Information and Ideas",
    CAS: "Craft and Structure",
    EOI: "Expression of Ideas",
    SEC: "Standard English Conventions",
  };

  const difficultyApiMapping: Record<string, string> = {
    Easy: "E",
    Medium: "M",
    Hard: "H",
  };

  const difficultyFullNameMapping: Record<string, string> = {
    E: "Easy",
    M: "Medium",
    H: "Hard",
  };

  const fetchEnglishQuestionFromApi = async (
    domain: string,
    difficulty: "All" | "Easy" | "Medium" | "Hard"
  ): Promise<Question | null> => {
    const apiDomain =
      domain === "All" ? "INI,CAS,EOI,SEC" : domainApiMapping[domain];
    const questionListResponse = await fetch(QUESTION_LIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asmtEventId: 100, test: 1, domain: apiDomain }),
    });

    if (!questionListResponse.ok) {
      throw new Error("Failed to fetch question list from API");
    }

    let questionList = await questionListResponse.json();
    if (questionList.length === 0) {
      console.warn("API returned no questions for the given filters.");
      return null;
    }

    if (difficulty !== "All") {
      const apiDifficulty = difficultyApiMapping[difficulty];
      questionList = questionList.filter(
        (q: any) => q.difficulty === apiDifficulty
      );
    }

    if (questionList.length === 0) {
      console.warn(
        "No questions found after client-side difficulty filtering."
      );
      return null;
    }

    const randomQuestionInfo =
      questionList[Math.floor(Math.random() * questionList.length)];
    const externalId = randomQuestionInfo.external_id;

    const questionDetailResponse = await fetch(QUESTION_DETAIL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ external_id: externalId }),
    });

    if (!questionDetailResponse.ok) {
      throw new Error("Failed to fetch question detail from API");
    }

    const questionData = await questionDetailResponse.json();
    const choices: Record<string, string> = {};
    const optionLetters = ["A", "B", "C", "D"];

    questionData.answerOptions.forEach((option: any, index: number) => {
      choices[optionLetters[index]] = convert(option.content);
    });

    const domainFullName =
      domainFullNameMapping[randomQuestionInfo.domain] ||
      randomQuestionInfo.domain;
    const difficultyFullName =
      difficultyFullNameMapping[randomQuestionInfo.difficulty] ||
      randomQuestionInfo.difficulty;

    return {
      id: questionData.external_id,
      domain: domainFullName,
      visuals: { type: "none", svg_content: "" },
      question: {
        question: questionData.stem.replace(/<[^>]*>/g, ""),
        paragraph: questionData.stimulus,
        explanation:
          questionData.rationale ||
          questionData.explanation ||
          "Explanation not provided by this API.",
        correct_answer: questionData.correct_answer[0],
        choices: choices,
      },
      difficulty: difficultyFullName,
    };
  };
  const [loadError, setLoadError] = useState<string | null>(null);
  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData: Data = await response.json();
        setData(jsonData);
        const uniqueEnglishDomains = Array.from(
          new Set(jsonData.english.map((q) => q.domain))
        );
        setEnglishDomains(uniqueEnglishDomains);
      } catch (error) {
        setLoadError(
          "Failed to load practice questions. Please refresh the page."
        );
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
    setIsLoading(true);
    setCurrentQuestion(null);

    const loadQuestion = async () => {
      let newQuestion: Question | null = null;
      let allFilteredQuestions: Question[] = [];

      if (data && data.english.length > 0) {
        allFilteredQuestions = data.english.filter((q) => {
          const matchesDifficulty =
            difficulty === "All" || q.difficulty === difficulty;
          const matchesDomain =
            selectedDomain === "All" || q.domain === selectedDomain;
          return matchesDifficulty && matchesDomain;
        });
      }

      try {
        const apiQuestion = await fetchEnglishQuestionFromApi(
          selectedDomain,
          difficulty
        );
        if (apiQuestion) {
          newQuestion = apiQuestion;
        }
      } catch (error) {}

      if (
        !newQuestion ||
        questionHistoryRef.current.some(
          (item) => item.question.id === newQuestion?.id && item.isAnswered
        )
      ) {
        const attemptedQuestionIds = new Set(
          questionHistoryRef.current
            .filter((item) => item.isAnswered)
            .map((item) => item.question.id)
        );
        const unattemptedLocalQuestions = allFilteredQuestions.filter(
          (q) => !attemptedQuestionIds.has(q.id)
        );

        if (unattemptedLocalQuestions.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * unattemptedLocalQuestions.length
          );
          newQuestion = unattemptedLocalQuestions[randomIndex];
        } else if (allFilteredQuestions.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * allFilteredQuestions.length
          );
          newQuestion = allFilteredQuestions[randomIndex];
        } else {
          newQuestion = null;
        }
      }

      setCurrentQuestion(newQuestion);
      setIsLoading(false);
    };

    loadQuestion();
  }, [
    data,
    difficulty,
    selectedDomain,
    currentHistoryIndex,
    fetchQuestionTrigger,
  ]);

  // Update predicted score
  useEffect(() => {
    const englishTotal = englishCorrect + englishWrong;
    const englishPercentage =
      englishTotal === 0 ? 0 : englishCorrect / englishTotal;
    const newEnglishScore = Math.round(englishPercentage * 600 + 200);
    setPredictedEnglishScore(newEnglishScore);
  }, [englishCorrect, englishWrong]);

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
    englishDomains,
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
    englishCorrect,
    setEnglishCorrect,
    englishWrong,
    setEnglishWrong,
    predictedEnglishScore,
    questionHistory,
    setQuestionHistory,
    currentHistoryIndex,
    setCurrentHistoryIndex,
    showNext,
    fetchEnglishQuestionFromApi,
  };
};

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
