"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Answer } from "./Answer";

export interface AnswerType {
  _id: string;
  question_id: string;
  content: string;
  score: number;
  level_name: string;
  level: number;
}

interface QuestionProps {
  question: any;
  storedAnswer: { answer: string; score: number };
  setStoredAnswers: React.Dispatch<any>;
}

const OPTION_MINMAX = [
  {
    min: 0,
    max: 20,
  },
  {
    min: 20,
    max: 40,
  },
  {
    min: 40,
    max: 60,
  },
  {
    min: 60,
    max: 80,
  },
  {
    min: 80,
    max: 100,
  },
];

export const Question = ({
  question,
  storedAnswer: { answer, score: currentScore },
  setStoredAnswers,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const selectAnswer = (value: string, index: number) => {
    console.log('objedct value',value)
    setSelectedAnswer(value);
    setStoredAnswers((prevAnswers: any) => {
      const index = prevAnswers.findIndex(
        (answer: any) => answer.question_id === question._id,
      );
      if (index !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[index] = {
          ...updatedAnswers[index],
          current_level_answer_id: value,
        };
        return updatedAnswers;
      } else {
        return [
          ...prevAnswers,
          {
            question_id: question._id,
            current_level_answer_id: value,
          },
        ];
      }
    });
  };

  return (
    <>
      {question.answers.map((answer: AnswerType, index: number) => (
        <Answer
          key={answer._id}
          index={index}
          answer={answer}
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
        />
      ))}
    </>
  );
};
