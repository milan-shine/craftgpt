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
  const [minScore, setMinScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [score, setScore] = useState<undefined | number>(undefined);

  const selectAnswer = (value: string, index: number) => {
    console.log('risk value',value)
    setSelectedAnswer(value);
    setMinScore(OPTION_MINMAX[index].min);
    setMaxScore(OPTION_MINMAX[index].max);

    setStoredAnswers((prevAnswers: any) => {
      const index = prevAnswers.findIndex(
        (answer: any) => answer.question_id === question._id,
      );
      if (index !== -1) {
        // Update the existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[index] = {
          ...updatedAnswers[index],
          answer: value,
        };
        return updatedAnswers;
      } else {
        // Add a new answer
        return [
          ...prevAnswers,
          {
            question_id: question._id,
            answer: value,
          },
        ];
      }
    });
  };

  const handleChange = (e: any) => {
    if (e.target.value < minScore && e.target.value.toString().length >= 2) {
      setScore(minScore);
      // setScore(e.target.value);
    } else if (e.target.value > maxScore) {
      setScore(maxScore);
    } else {
      setScore(e.target.value);
    }
  };

  useEffect(() => {
    if (score !== undefined) {
      setStoredAnswers((prevAnswers: any) => {
        const index = prevAnswers.findIndex(
          (answer: any) => answer.question_id === question._id,
        );
        if (index !== -1) {
          // Update the existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[index] = {
            ...updatedAnswers[index],
            score: score,
          };
          return updatedAnswers;
        }
      });
    }
  }, [score]);

  return (
    <>
      {/* <td className="text-center mx-2">
        <strong>{question}</strong>
      </td> */}
      <td className="mx-2 pb-4 pt-4">
        <Input
          type="number"
          placeholder={
            selectedAnswer ? `Between ${minScore}-${maxScore}` : `Score...`
          }
          value={score}
          className="w-full rounded-md border-[1px] border-black px-2 py-1"
          onChange={handleChange}
        />
      </td>
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
