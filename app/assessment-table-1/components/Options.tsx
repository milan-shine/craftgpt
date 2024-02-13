"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useEffect, useState } from "react";

interface OptionsProps {
  label: string;
  value: string;
  selectOption: (value: string) => void;
  selectedOption: string;
}

type ColorValues = {
  orange: string;
  yellow: string;
  green: string;
};

const COLOR_VALUES: ColorValues = {
  orange: "bg-orange-400",
  yellow: "bg-yellow-200",
  green: "bg-green-200",
};

export const Options = ({
  label,
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
    <td className="mx-2 my-2">
      <Button
        variant={"outline"}
        className={`justify-start items-start text-left ${bgColor} hover:${bgColor} w-full h-full text-wrap`}
        value={value}
        onClick={() => selectOption(value)}
      >
        {label}
      </Button>
    </td>
  );
};
