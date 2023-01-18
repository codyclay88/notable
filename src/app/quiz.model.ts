import {findNote, MusicNote, PitchClass} from "./music-stuff";

export type QuestionType =
  | 'MusicTheory'
  | 'Guitar';

export type QuestionPromptType =
  | 'SinglePitchClass'
  | 'SingleNote'
  | 'MultiplePitchClass'
  | 'MultipleNote'
  | 'SingleNoteFromFretboard';

export interface QuizQuestion {
  questionType: QuestionType
  promptType: QuestionPromptType
  questionText: string;
  answer: MusicNote | PitchClass
}

export type QuizSummary = {
  totalCorrect: number;
  totalIncorrect: number;
  totalQuestionCount: number;
  currentQuestionIndex: number;
}

export interface Quiz {
  questions: QuizQuestion[];
  summary: QuizSummary;
}

// const firstQuiz: Quiz = {
//   questions: [
//     {
//       questionType: 'MusicTheory',
//       promptType: 'SinglePitchClass',
//       questionText: "What is the 3rd scale degree in the G Major Scale?",
//       answer: 'B',
//     },
//   ]
// }

const musicTheoryQuestions: QuizQuestion[] = [
  {
    questionType: 'MusicTheory',
    promptType: 'SinglePitchClass',
    questionText: "What is the 3rd scale degree in the G Major Scale?",
    answer: 'B',
  },
];

const guitarQuestions: QuizQuestion[] = [
  {
    questionType: 'Guitar',
    promptType: 'SingleNote',
    questionText: "What name of the lowest open note in the standard tuning of guitar?",
    answer: findNote('E', 2),
  },
];

export type CompletedQuiz = { quiz: Quiz; summary: QuizSummary }

export type QuizRunner = (quiz: Quiz) => Quiz | CompletedQuiz;

export const showNextQuestion = (quiz: Quiz) => {
  const question = quiz.questions[quiz.summary.currentQuestionIndex];

  // We need to indicate what to do when question is completed.

  // Render a particular component depending on the question type
  if(question.promptType === 'SingleNote') {

  } else if(question.promptType === 'MultipleNote') {

  } else if(question.promptType === 'SingleNoteFromFretboard') {

  }
};

export const createQuiz = (questionTypes: QuestionType[], numberOfQuestions: number): Quiz => {
  let questions: QuizQuestion[] = [];
  let summary: QuizSummary = {
    currentQuestionIndex: 0, totalCorrect: 0, totalIncorrect: 0, totalQuestionCount: numberOfQuestions
  }
  let totalQuestionsPerType = numberOfQuestions / questionTypes.length;
  if(questionTypes.includes('MusicTheory')) {
    questions.concat(musicTheoryQuestions.slice(0, totalQuestionsPerType));
  }
  if(questionTypes.includes('Guitar')) {
    questions.concat(guitarQuestions.slice(0, totalQuestionsPerType));
  }
  return {
    questions,
    summary
  };
};

export const quizRunner = (quiz: Quiz) => {
  if(quiz.questions.length < quiz.summary.currentQuestionIndex) {
    return showNextQuestion(quiz);
  }
}
