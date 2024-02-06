"use client";

import React, { useState } from "react";
import { Options } from "./Options";

interface OptionsType {
  label: string;
  value: string;
}

interface QuestionProps {
  question: string;
  options: OptionsType[];
}

export const Question = ({ question, options }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const selectOption = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <>
      {/* <td className="text-center mx-2">
        <strong>{question}</strong>
      </td> */}
      {options.map(({ label, value }) => (
        <Options
          key={label}
          label={label}
          value={value}
          selectOption={selectOption}
          selectedOption={selectedOption}
        />
      ))}
    </>
  );
};
