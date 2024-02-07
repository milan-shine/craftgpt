"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useEffect, useState } from "react";

interface OptionsProps {
  content: string;
  level_name: string;
  selectAnswer: (value: string) => void;
  selectedAnswers: string[];
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
  content,
  level_name,
  selectAnswer,
  selectedAnswers,
}: OptionsProps) => {
  const [bgColor, setBgColor] = useState<string>("");

  const btnColorHandler = () => {
    if (selectedAnswers) {
      selectedAnswers.map((item) => {
        if (item === level_name) {
          setBgColor(COLOR_VALUES[item.toLowerCase() as keyof ColorValues]);
        }
        return item;
      });
    }
  };
  const computeDisabled = (): boolean => {
    let isDisabled = false;

    if (selectedAnswers.length >= 2) {
      isDisabled = true;
    }

    for (const option of selectedAnswers) {
      if (option === level_name) {
        isDisabled = false;
      }
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
        value={level_name}
        onClick={() => selectAnswer(level_name)}
        disabled={computeDisabled()}
      >
        {content}
      </Button>
    </td>
  );
};
