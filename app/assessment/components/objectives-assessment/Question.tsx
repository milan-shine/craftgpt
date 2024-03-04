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
  storedAnswer: { answer: AnswerType; score: number };
  setStoredAnswers: React.Dispatch<any>;
}

export const Question = ({
  question,
  storedAnswer: { answer, score: currentScore },
  setStoredAnswers,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const filledAns = answer;

  const selectAnswer = (value: string, index: number) => {
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
          selectedAnswer={
            (filledAns?.level ? filledAns.level.toString() : "") ||
            selectedAnswer
          }
        />
      ))}
    </>
  );
};
