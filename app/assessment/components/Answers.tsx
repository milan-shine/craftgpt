"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useEffect, useState } from "react";
import { AnswerType } from "./Question";

interface OptionsProps {
  answer: AnswerType;
  selectAnswer: (level: number) => void;
  selectedAnswers: {
    currentAnswer: number;
    desiredAnswer: number;
  };
}

type ColorValues = {
  initial: string;
  developing: string;
  defined: string;
  managed: string;
  optimized: string;
};

const COLOR_VALUES: ColorValues = {
  initial: "bg-orange-400",
  developing: "bg-yellow-200",
  defined: "bg-green-200",
  managed: "bg-emerald-500",
  optimized: "bg-cyan-300",
};

export const Answers = ({
  answer,
  selectAnswer,
  selectedAnswers,
}: OptionsProps) => {
  const [bgColor, setBgColor] = useState<string>("");
  const { currentAnswer, desiredAnswer } = selectedAnswers;
  const { level, level_name } = answer;

  const btnColorHandler = () => {
    if (level === currentAnswer || level === desiredAnswer) {
      setBgColor(COLOR_VALUES[level_name.toLowerCase() as keyof ColorValues]);
    } else {
      if (bgColor !== "") setBgColor("");
    }
  };

  const computeDisabled = (): boolean => {
    let isDisabled = false;

    if (
      currentAnswer !== 0 &&
      desiredAnswer !== 0 &&
      level !== currentAnswer &&
      level !== desiredAnswer
    ) {
      isDisabled = true;
    }

    return isDisabled;
  };

  useEffect(() => {
    setBgColor("");
    btnColorHandler();
  }, [selectedAnswers]);

  return (
    <td className="mx-2">
      <Button
        variant={"outline"}
        className={`items-start justify-start text-left ${bgColor} hover:${bgColor} h-full w-full text-wrap`}
        onClick={() => selectAnswer(answer.level)}
        disabled={computeDisabled()}
      >
        {answer.content}
      </Button>
    </td>
  );
};
