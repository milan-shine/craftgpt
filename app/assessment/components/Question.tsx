"use client";

import React, { useState } from "react";
import { Answers } from "./Answers";

export interface AnswerType {
  content: string;
  score: string;
  level_name: string;
}

interface QuestionProps {
  question: string;
  answers: AnswerType[];
}

export const Question = ({ question, answers }: QuestionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const selectAnswer = (level_name: string) => {
    const filteredAnswers = selectedAnswers.filter(
      (option) => option !== level_name,
    );

    if (filteredAnswers.length === selectedAnswers.length) {
      setSelectedAnswers([...selectedAnswers, level_name]);
    } else {
      setSelectedAnswers(filteredAnswers);
    }
  };

  return (
    <>
      <td className="mx-2 text-center">
        <strong>{question}</strong>
      </td>
      {answers.map(({ content, level_name }) => (
        <Answers
          key={content}
          content={content}
          level_name={level_name}
          selectAnswer={selectAnswer}
          selectedAnswers={selectedAnswers}
        />
      ))}
    </>
  );
};
