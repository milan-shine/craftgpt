"use client";

import React, { useEffect, useState } from "react";
import { Options } from "./Options";
import { Input } from "@/components/shadcn/ui/input";

interface OptionsType {
  label: string;
  value: string;
}

interface QuestionProps {
  question: string;
  options: OptionsType[];
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

export const Question = ({ question, options }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [minScore, setMinScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [score, setScore] = useState<undefined | number>(undefined);

  const selectOption = (value: string, index: number) => {
    setSelectedOption(value);
    setMinScore(OPTION_MINMAX[index].min);
    setMaxScore(OPTION_MINMAX[index].max);
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

  return (
    <>
      {/* <td className="text-center mx-2">
        <strong>{question}</strong>
      </td> */}
      <td className="mx-2 pb-4 pt-4">
        <Input
          type="number"
          placeholder={
            selectedOption ? `Between ${minScore}-${maxScore}` : `Score...`
          }
          min={0}
          max={20}
          value={score}
          className="w-full rounded-md border-[1px] border-black px-2 py-1"
          onChange={handleChange}
        />
      </td>
      {options.map(({ label, value }, index) => (
        <Options
          key={label}
          index={index}
          label={label}
          value={value}
          selectOption={selectOption}
          selectedOption={selectedOption}
        />
      ))}
    </>
  );
};
