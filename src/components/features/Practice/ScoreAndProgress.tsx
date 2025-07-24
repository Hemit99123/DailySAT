"use client";

import React, { useState } from "react";
import {
  Target,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Flame,
  Trophy,
  ListChecks,
} from "lucide-react";

import { Question, QuestionHistory } from "@/hooks/usePracticeSession";

interface ScoreAndProgressProps {
  correctCount: number;
  wrongCount: number;
  currentStreak: number;
  maxStreak: number;
  predictedScore: number;
  questionHistory: QuestionHistory[];
  onProgressBoxClick: (index: number) => void;
  currentQuestion: Question | null;
}

interface CardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  expandable?: boolean;
  expanded?: boolean;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  children,
  onClick,
  expandable = false,
  expanded = false,
}) => (
  <div className="rounded-lg bg-blue-50 shadow">
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full rounded-t-lg items-center justify-between bg-blue-200 px-4 py-2 text-left text-sm font-bold text-slate-900 ${
        expandable ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {title}
      </span>
      {expandable &&
        (expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
    </button>
    {children}
  </div>
);

const ScoreAndProgress: React.FC<ScoreAndProgressProps> = ({
  correctCount,
  wrongCount,
  currentStreak,
  maxStreak,
  questionHistory,
  onProgressBoxClick,
  currentQuestion,
}) => {
  const [isAccuracyExpanded, setIsAccuracyExpanded] = useState(false);

  const totalAttempts = correctCount + wrongCount;
  const accuracy =
    totalAttempts === 0 ? 0 : (correctCount / totalAttempts) * 100;

  return (
    <div className="flex w-[250px] flex-col gap-5">
      {/* Accuracy */}
      <Card
        title="Accuracy"
        icon={<Target size={16} className="text-blue-800" />}
        onClick={() => setIsAccuracyExpanded(!isAccuracyExpanded)}
        expandable
        expanded={isAccuracyExpanded}
      >
        <div className="space-y-4 px-4 py-4 text-slate-900">
          <div className="text-center text-3xl font-bold text-blue-600">
            {accuracy.toFixed(1)}%
          </div>

          {isAccuracyExpanded && (
            <>
              {/* Stats row */}
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" /> Correct:
                  <strong>{correctCount}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-red-500" /> Incorrect:
                  <strong>{wrongCount}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-600" /> Streak:
                  <strong>{currentStreak}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-indigo-600" /> Max Streak:
                  <strong>{maxStreak}</strong>
                </span>
              </div>

              {/* Accuracy bar */}
              {totalAttempts === 0 ? (
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-300 shadow-inner" />
              ) : (
                <div className="h-4 w-full overflow-hidden rounded-full bg-red-500 shadow-inner">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              )}

              <div className="text-center text-xs">
                Questions Answered: <strong>{totalAttempts}</strong>
              </div>
            </>
          )}
        </div>
      </Card>

      {/*  Progress  */}
      <Card
        title="Progress"
        icon={<ListChecks size={16} className="text-blue-800" />}
      >
        <div
          className="flex max-h-[125px] flex-wrap gap-2 overflow-y-auto p-4"
          role="group"
          aria-label="Question progress tracker"
        >
          {questionHistory.length === 0 && (
            <span className="text-xs text-gray-500">
              Answer questions to see your progress.
            </span>
          )}

          {questionHistory.map((item, index) => {
            let bgColor = "bg-gray-400";
            if (item.isMarkedForLater) bgColor = "bg-yellow-400";
            else if (item.isAnswered)
              bgColor = item.isCorrect ? "bg-green-500" : "bg-red-500";

            const isCurrent =
              currentQuestion && item.question.id === currentQuestion.id;

            return (
              <button
                key={item.id}
                onClick={() => onProgressBoxClick(index)}
                title={`Question ${index + 1}`}
                className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold text-white shadow transition-all hover:opacity-90 ${bgColor} ${
                  isCurrent
                    ? "ring-2 ring-blue-800 ring-offset-2 ring-offset-blue-100"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ScoreAndProgress;
