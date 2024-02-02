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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const selectOption = (value: string) => {
    const filteredOptions = selectedOptions.filter(
      (option) => option !== value
    );

    if (filteredOptions.length === selectedOptions.length) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(filteredOptions);
    }
  };

  return (
    <>
      <td className="text-center mx-2">
        <strong>{question}</strong>
      </td>
      {options.map(({ label, value }) => (
        <Options
          key={label}
          label={label}
          value={value}
          selectOption={selectOption}
          selectedOptions={selectedOptions}
        />
      ))}
    </>
  );
};
