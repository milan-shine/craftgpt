"use client";

import React, { useEffect, useState } from "react";
import { Answers } from "./Answers";

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
  storedAnswer: { currentAnswer: number; desiredAnswer: number };
  setStoredAnswers: React.Dispatch<any>;
}

export const Question = ({
  question,
  storedAnswer: { currentAnswer, desiredAnswer },
  setStoredAnswers,
}: QuestionProps) => {
  // const [selectedAnswers, setSelectedAnswers] = useState<{
  //   currentAnswer: number;
  //   desiredAnswer: number;
  // }>({ currentAnswer: 0, desiredAnswer: 0 });

  const selectAnswer = (level: number) => {
    let newCurrent = currentAnswer;
    let newDesired = desiredAnswer;

    if (newCurrent === 0) {
      newCurrent = level;
    } else if (newDesired === 0) {
      if (level < newCurrent) {
        newDesired = newCurrent;
        newCurrent = level;
      } else if (level !== newCurrent) {
        newDesired = level;
      } else {
        newCurrent = 0;
      }
    } else if (level === newCurrent) {
      newCurrent = newDesired;
      newDesired = 0;
    } else {
      newDesired = 0;
    }

    // setSelectedAnswers({
    //   currentAnswer: newCurrent,
    //   desiredAnswer: newDesired,
    // });

    setStoredAnswers((prevAnswers: any) => {
      const index = prevAnswers.findIndex(
        (answer: any) => answer.question_id === question._id,
      );
      if (index !== -1) {
        // Update the existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[index] = {
          question_id: question._id,
          current_level_answer_id: newCurrent,
          desired_level_answer_id: newDesired,
        };
        return updatedAnswers;
      } else {
        // Add a new answer
        return [
          ...prevAnswers,
          {
            question_id: question._id,
            current_level_answer_id: newCurrent,
            desired_level_answer_id: newDesired,
          },
        ];
      }
    });
  };

  return (
    <>
      <td className="mx-2 text-center">
        <strong>{question.content}</strong>
      </td>
      {question.answers.map((answer: AnswerType) => (
        <Answers
          key={answer._id}
          answer={answer}
          selectAnswer={selectAnswer}
          selectedAnswers={{ currentAnswer, desiredAnswer }}
        />
      ))}
    </>
  );
};
