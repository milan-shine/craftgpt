"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useEffect, useState } from "react";

interface OptionsProps {
  label: string;
  index: number;
  value: string;
  selectOption: (value: string, index: number) => void;
  selectedOption: string;
}

type ColorValues = {
  lightOrange: string;
  darkOrange: string;
  criticalRed: string;
  lightGreen: string;
  darkGreen: string;
};

const COLOR_VALUES: ColorValues = {
  lightOrange: "bg-orange-300",
  darkOrange: "bg-orange-600 text-white hover:text-white",
  criticalRed: "bg-red-600 text-white hover:text-white",
  lightGreen: "bg-green-200",
  darkGreen: "bg-emerald-500",
};

export const Options = ({
  label,
  index,
  value,
  selectOption,
  selectedOption,
}: OptionsProps) => {
  const [bgColor, setBgColor] = useState<string>("");

  const btnColorHandler = () => {
    if (selectedOption === value) {
      setBgColor(COLOR_VALUES[selectedOption as keyof ColorValues]);
    }
  };

  const computeDisabled = (): boolean => {
    let isDisabled = false;

    if (selectedOption.length >= 2) {
      isDisabled = true;
    }

    for (const option of selectedOption) {
      if (option === value) {
        isDisabled = false;
      }
    }

    return isDisabled;
  };

  useEffect(() => {
    setBgColor("");
    btnColorHandler();
  }, [selectedOption]);

  return (
    <td className="p-2">
      <Button
        variant={"outline"}
        className={`items-start justify-start text-left ${bgColor} hover:${bgColor} h-full w-full text-wrap`}
        value={value}
        onClick={() => selectOption(value, index)}
      >
        {label}
      </Button>
    </td>
  );
};
