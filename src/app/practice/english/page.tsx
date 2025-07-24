"use client";

import { useEffect, useState, useMemo } from "react";
import parse from "html-react-parser";

import { TopicSidebar } from "@/components/features/Practice/TopicSidebar";
import { QuestionContent } from "@/components/features/Practice/QuestionContent";
import ScoreAndProgress from "@/components/features/Practice/ScoreAndProgress";

import {
  usePracticeSession,
  QuestionHistory,
} from "@/hooks/useEnglishPracticeSession";

import { subject, domainDisplayMapping } from "@/data/practice";
import axios from "axios";
import { encryptPayload } from "@/lib/cryptojs";

// Defines the shape of the user's interaction state with a question.
interface InteractionState {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  isSubmitted: boolean;
}

// Initial state for user interaction.
const INITIAL_INTERACTION: InteractionState = {
  selectedAnswer: null,
  isCorrect: null,
  showExplanation: false,
  isSubmitted: false,
};

export default function EnglishPracticePage() {
  const {
    difficulty,
    setDifficulty,
    selectedDomain,
    setSelectedDomain,
    englishDomains,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
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
  } = usePracticeSession();

  // State for the user's current interaction with the question.
  const [interaction, setInteraction] =
    useState<InteractionState>(INITIAL_INTERACTION);

  // --- Utility Functions ---
  // Resets the interaction state, optionally preserving the selected answer.
  const resetInteraction = (preserveAnswer = false) =>
    setInteraction((prev) => ({
      ...INITIAL_INTERACTION,
      selectedAnswer: preserveAnswer ? prev.selectedAnswer : null,
    }));

  useEffect(() => {
    const keepAnswer =
      currentHistoryIndex !== null &&
      questionHistory[currentHistoryIndex]?.isAnswered;

    resetInteraction(keepAnswer);
  }, [currentQuestion]);

  const currentQuestionStatus = useMemo(
    () => questionHistory.find((h) => h.question.id === currentQuestion?.id),
    [currentQuestion, questionHistory]
  );

  const isViewingAnsweredHistory = useMemo(
    () =>
      currentHistoryIndex !== null &&
      questionHistory[currentHistoryIndex]?.isAnswered,
    [currentHistoryIndex, questionHistory]
  );

  const renderedQuestionStem = useMemo(() => {
    if (!currentQuestion) return null;

    const rawStem =
      (currentQuestion.question as any).stemHtml ??
      (currentQuestion.question as any).stem ??
      (currentQuestion.question as any).prompt ??
      (currentQuestion.question as any).question ??
      "";

    return rawStem ? parse(rawStem) : null;
  }, [currentQuestion]);
  const handleSubmit = async () => {
    if (!interaction.selectedAnswer || !currentQuestion) return;

    // Check if the selected answer is correct.
    const correct =
      interaction.selectedAnswer === currentQuestion.question.correct_answer;

    // Send the submission result to the backend.
    try {
      const payload = { isCorrect: correct };
      const encryptedPayload = await encryptPayload(payload as unknown as JSON);

      await axios.post("/api/practice", {
        encryptedPayload,
      });
    } catch (error) {}

    // Update scores and streaks based on the answer's correctness.
    if (correct) {
      setCorrectCount((correctCount) => correctCount + 1);
      setEnglishCorrect((englishCorrect) => englishCorrect + 1);
      setCurrentStreak((streak) => {
        const next = streak + 1;
        setMaxStreak((maxStreak) => Math.max(maxStreak, next));
        return next;
      });
    } else {
      setWrongCount((count) => count + 1);
      setEnglishWrong((numWrong) => numWrong + 1);
      setCurrentStreak(0);
    }

    // Update the question history with the user's answer and result.
    setQuestionHistory((prev) => {
      const index = prev.findIndex((h) => h.question.id === currentQuestion.id);

      const updatedItem: QuestionHistory = {
        id: index !== -1 ? prev[index].id : prev.length + 1,
        question: currentQuestion,
        userAnswer: interaction.selectedAnswer,
        isCorrect: correct,
        isAnswered: true,
        isMarkedForLater: index !== -1 ? prev[index].isMarkedForLater : false,
      };

      if (index !== -1) {
        return prev.map((h, i) => (i === index ? updatedItem : h));
      }
      return [...prev, updatedItem];
    });

    // Update the interaction state to show the result and explanation.
    setInteraction((prev) => ({
      ...prev,
      isCorrect: correct,
      isSubmitted: true,
      showExplanation: true,
    }));
  };

  // Handles marking a question for later review.
  const handleMarkForLater = () => {
    if (!currentQuestion) return;

    setQuestionHistory((prev) => {
      const index = prev.findIndex((h) => h.question.id === currentQuestion.id);

      if (index !== -1) {
        return prev.map((h, i) =>
          i === index ? { ...h, isMarkedForLater: !h.isMarkedForLater } : h
        );
      }

      const newItem: QuestionHistory = {
        id: prev.length + 1,
        question: currentQuestion,
        userAnswer: null,
        isCorrect: null,
        isMarkedForLater: true,
        isAnswered: false,
      };

      return [...prev, newItem];
    });
  };

  // Handles clicking on a question in the progress tracker.
  const handleProgressBoxClick = (index: number) => {
    const historyItem = questionHistory[index];

    setCurrentHistoryIndex(index);
    setCurrentQuestion(historyItem.question);
    setInteraction({
      selectedAnswer: historyItem.userAnswer,
      isCorrect: historyItem.isCorrect,
      isSubmitted: historyItem.isAnswered,
      showExplanation: historyItem.isAnswered,
    });
  };

  const handleNext = () => {
    if (currentHistoryIndex !== null) setCurrentHistoryIndex(null);
    showNext();
  };

  return (
    <div className="flex gap-6 p-5">
      {/* Sidebar for topic and difficulty selection. */}
      <TopicSidebar
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        currentDomainNames={englishDomains}
        domainDisplayMapping={domainDisplayMapping}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        subject={subject}
      />

      {/* Main Pane  */}
      <div className="flex flex-1 gap-6">
        <section className="flex-1 overflow-y-auto rounded-lg bg-white p-5 text-black shadow max-h-[calc(100vh-64px)]">
          <QuestionContent
            isMarked={currentQuestionStatus?.isMarkedForLater || false}
            isLoading={isLoading}
            currentQuestion={currentQuestion}
            subject={subject}
            selectedDomain={
              domainDisplayMapping[selectedDomain] || selectedDomain
            }
            handleMarkForLater={handleMarkForLater}
            currentQuestionStatus={currentQuestionStatus || null}
            selectedAnswer={interaction.selectedAnswer}
            isSubmitted={interaction.isSubmitted}
            isViewingAnsweredHistory={isViewingAnsweredHistory}
            handleAnswerSelect={(answer: string) =>
              setInteraction((prev) => ({ ...prev, selectedAnswer: answer }))
            }
            isCorrect={interaction.isCorrect}
            handleSubmit={handleSubmit}
            showNext={handleNext}
            showExplanation={interaction.showExplanation}
          />
        </section>

        {/*  Stats Sidebar  */}
        <aside className="w-[250px]">
          <ScoreAndProgress
            correctCount={correctCount}
            wrongCount={wrongCount}
            currentStreak={currentStreak}
            maxStreak={maxStreak}
            predictedScore={predictedEnglishScore}
            questionHistory={questionHistory}
            onProgressBoxClick={handleProgressBoxClick}
            currentQuestion={currentQuestion}
          />
        </aside>
      </div>
    </div>
  );
}
