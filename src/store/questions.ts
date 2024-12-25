import { create } from 'zustand';
import { QuestionData } from '@/types/questions';
import { Topic } from '@/types/topic';
import { Answers } from '@/types/answer';

interface QuestionStoreProps {
  randomQuestion: QuestionData | null; // Allow null for the initial state
  setRandomQuestion: (newQuestion: QuestionData | null) => void;
}

interface TopicStoreProps {
    selectedTopic: Topic | null; // Allow null for the initial state
    setSelectedTopic: (newTopic: Topic | null) => void;
}

interface AnswerStoreProps {
    answer: Answers | null // Allow null for the initial state
    setAnswer: (newAnswer: Answers| null) => void;
}

interface AnswerCorrectStoreProps {
    isAnswerCorrect: boolean | "none";
    setIsAnswerCorrect: (value: boolean | "none") => void;
}


// These are the stores (there are a lot)
export const useQuestionStore = create<QuestionStoreProps>((set) => ({
  randomQuestion: null, // Initialize with null
  setRandomQuestion: (newQuestion: QuestionData | null) =>
    set(() => ({ randomQuestion: newQuestion })),
}));

export const useTopicStore = create<TopicStoreProps>((set) => ({
    selectedTopic: null, // Initialize with null
    setSelectedTopic: (newTopic: Topic | null) =>
      set(() => ({ selectedTopic: newTopic })),
}));

export const useAnswerStore = create<AnswerStoreProps>((set) => ({
    answer: null, // Initialize with null
    setAnswer: (newAnswer: Answers | null) =>
      set(() => ({ answer: newAnswer })),
}));

export const useAnswerCorrectStore = create<AnswerCorrectStoreProps>((set) => ({
    isAnswerCorrect: "none",
    setIsAnswerCorrect: (value: boolean | "none") => set(() => ({ isAnswerCorrect: value })),
}));
