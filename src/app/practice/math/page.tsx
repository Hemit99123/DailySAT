"use client";

import { useEffect, useState, useMemo } from "react";
import { CalculatorOptions } from "@/components/features/Practice/CalculatorOption";
import { TopicSidebar } from "@/components/features/Practice/TopicSidebar";
import { QuestionContent } from "@/components/features/Practice/QuestionContent";
import ScoreAndProgress from "@/components/features/Practice/ScoreAndProgress";

import {
  usePracticeSession,
  QuestionHistory,
} from "@/hooks/usePracticeSession";

import { subject2, domainDisplayMapping2 } from "@/data/practice";
import axios from "axios";
import { encryptPayload } from "@/lib/cryptojs";

interface InteractionState {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  isSubmitted: boolean;
}

const INITIAL_INTERACTION: InteractionState = {
  selectedAnswer: null,
  isCorrect: null,
  showExplanation: false,
  isSubmitted: false,
};

export default function MathPracticePage() {
  const {
    difficulty,
    setDifficulty,
    selectedDomain,
    setSelectedDomain,
    mathDomains,
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
  } = usePracticeSession();

  const [interaction, setInteraction] =
    useState<InteractionState>(INITIAL_INTERACTION);

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

  const handleSubmit = async () => {
    if (!interaction.selectedAnswer || !currentQuestion) return;

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

    if (correct) {
      setCorrectCount((count) => count + 1);
      setMathCorrect((mathCorrect) => mathCorrect + 1);
      setCurrentStreak((streak) => {
        const next = streak + 1;
        setMaxStreak((maxStreak) => Math.max(maxStreak, next));
        return next;
      });
    } else {
      setWrongCount((c) => c + 1);
      setMathWrong((c) => c + 1);
      setCurrentStreak(0);
    }

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

    setInteraction((prev) => ({
      ...prev,
      isCorrect: correct,
      isSubmitted: true,
      showExplanation: true,
    }));
  };

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
      {/*  Sidebar  */}
      <TopicSidebar
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        currentDomainNames={mathDomains}
        domainDisplayMapping={domainDisplayMapping2}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        subject={subject2}
      />

      {/* Main Pane */}
      <div className="flex flex-1 gap-6">
        <section className="flex-1 overflow-y-auto rounded-lg bg-white p-5 text-black shadow max-h-[calc(100vh-64px)]">
          <QuestionContent
            isMarked={currentQuestionStatus?.isMarkedForLater || false}
            isLoading={isLoading}
            currentQuestion={currentQuestion}
            subject={subject2}
            selectedDomain={
              (domainDisplayMapping2 as Record<string, string>)[
                selectedDomain
              ] || selectedDomain
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

        {/* Stats Sidebar  */}
        <aside className="w-[250px]">
          <ScoreAndProgress
            correctCount={correctCount}
            wrongCount={wrongCount}
            currentStreak={currentStreak}
            maxStreak={maxStreak}
            predictedScore={predictedMathScore}
            questionHistory={questionHistory}
            onProgressBoxClick={handleProgressBoxClick}
            currentQuestion={currentQuestion}
          />
        </aside>

        {/* The Calculator modal */}
        <CalculatorOptions />
      </div>
    </div>
  );
}
