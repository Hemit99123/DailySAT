"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  SquareSigma,
  ArrowRight,
  List as ListIcon,
} from "lucide-react";

interface TopicSidebarProps {
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
  currentDomainNames: string[];
  domainDisplayMapping: Record<string, string>;
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  setDifficulty: (diff: "All" | "Easy" | "Medium" | "Hard") => void;
  subject: "Math" | "English";
}

const DIFFICULTY_META: Record<
  TopicSidebarProps["difficulty"],
  { bg: string; emoji: string; tooltip: string }
> = {
  All: {
    bg: "bg-gray-200",
    emoji: "⚪",
    tooltip: "All difficulties",
  },
  Easy: {
    bg: "bg-green-200",
    emoji: "😄",
    tooltip: "Select Easy questions",
  },
  Medium: {
    bg: "bg-amber-200",
    emoji: "🤨",
    tooltip: "Select Medium questions",
  },
  Hard: {
    bg: "bg-red-200",
    emoji: "😫",
    tooltip: "Select Hard questions",
  },
};

export const TopicSidebar: React.FC<TopicSidebarProps> = ({
  selectedDomain,
  setSelectedDomain,
  currentDomainNames,
  domainDisplayMapping,
  difficulty,
  setDifficulty,
  subject,
}) => {
  const otherSubject = subject === "Math" ? "English" : "Math";
  const switchHref = `/practice/${otherSubject.toLowerCase()}`;

  const renderTopicButton = (displayName: string, key: string) => {
    const isActive = selectedDomain === displayName;
    return (
      <button
        key={key}
        onClick={() => setSelectedDomain(displayName)}
        className={`flex items-center text-left gap-2 rounded border px-3 py-2 text-sm shadow transition-colors ${
          isActive
            ? "border-blue-600 bg-blue-50 text-blue-800"
            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        {key === "all" ? <ListIcon size={14} /> : null}
        {displayName}
      </button>
    );
  };

  return (
    <aside className="w-[250px] space-y-6 rounded-lg bg-slate-50 p-5 shadow">
      {/*  Subject Heading  */}
      {subject === "English" && (
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <BookOpen className="h-5 w-5" /> {subject}
        </h2>
      )}
      {subject === "Math" && (
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <SquareSigma className="h-5 w-5" /> {subject}
        </h2>
      )}

      {/* Subject Switch */}
      <Link
        href={switchHref}
        className="flex items-center justify-center gap-1 rounded border border-blue-600 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 shadow hover:bg-blue-100"
      >
        Go to {otherSubject}
        <ArrowRight size={12} />
      </Link>

      <hr className="border-slate-300" />

      {/* Topics */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-600">Topics:</h3>
        <div className="flex flex-col gap-2">
          {renderTopicButton("All", "all")}
          {currentDomainNames.map((domainName) => {
            const mapped = domainDisplayMapping[domainName] || domainName;
            return renderTopicButton(mapped, domainName);
          })}
        </div>
      </section>

      {/* Difficulty */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-600">
          Choose Difficulty:
        </h3>
        <div className="flex gap-3">
          {(
            Object.keys(DIFFICULTY_META) as TopicSidebarProps["difficulty"][]
          ).map((diff) => {
            const meta = DIFFICULTY_META[diff];
            const isActive = difficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                title={meta.tooltip}
                className={`flex h-10 w-10 items-center justify-center rounded-full border font-medium shadow transition-all ${
                  isActive ? "border-blue-600" : "border-slate-300"
                } ${meta.bg}`}
              >
                <span className="text-lg">{meta.emoji}</span>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
};
