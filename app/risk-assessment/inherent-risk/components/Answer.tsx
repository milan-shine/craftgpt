"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useEffect, useState } from "react";
import { AnswerType } from "./Question";

interface AnswerProps {
  index: number;
  answer: AnswerType;
  selectAnswer: (value: string, index: number) => void;
  selectedAnswer: string;
}

const COLOR_VALUES = [
  "bg-emerald-500",
  "bg-green-200",
  "bg-orange-300",
  "bg-orange-600 text-white hover:text-white",
  "bg-red-600 text-white hover:text-white",
];

export const Answer = ({
  index,
  answer,
  selectAnswer,
  selectedAnswer,
}: AnswerProps) => {
  const [bgColor, setBgColor] = useState<string>("");

  const btnColorHandler = () => {
    if (selectedAnswer === answer._id) {
      setBgColor(COLOR_VALUES[index]);
    }
  };

  useEffect(() => {
    setBgColor("");
    btnColorHandler();
  }, [selectedAnswer]);

  return (
    <td className="p-2">
      <Button
        variant={"outline"}
        className={`items-start justify-start text-left ${bgColor} hover:${bgColor} h-full w-full text-wrap`}
        onClick={() => selectAnswer(answer._id, index)}
      >
        {answer.content}
      </Button>
    </td>
  );
};
