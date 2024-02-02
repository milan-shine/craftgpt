"use client";

import { Button } from "@/components/shadcn/ui/button";
import React, { useEffect, useState } from "react";

interface OptionsProps {
  label: string;
  value: string;
  selectOption: (value: string) => void;
  selectedOptions: string[];
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

export const Options = ({
  label,
  value,
  selectOption,
  selectedOptions,
}: OptionsProps) => {
  const [bgColor, setBgColor] = useState<string>("");

  const btnColorHandler = () => {
    if (selectedOptions) {
      selectedOptions.map((item) => {
        if (item === value) {
          setBgColor(COLOR_VALUES[item as keyof ColorValues]);
        }
        return item;
      });
    }
  };

  const computeDisabled = (): boolean => {
    let isDisabled = false;

    if (selectedOptions.length >= 2) {
      isDisabled = true;
    }

    for (const option of selectedOptions) {
      if (option === value) {
        isDisabled = false;
      }
    }

    return isDisabled;
  };

  useEffect(() => {
    setBgColor("");
    btnColorHandler();
  }, [selectedOptions]);

  return (
    <td className="mx-2">
      <Button
        variant={"outline"}
        className={`justify-start items-start text-left ${bgColor} hover:${bgColor} w-full h-full text-wrap`}
        value={value}
        onClick={() => selectOption(value)}
        disabled={computeDisabled()}
      >
        {label}
      </Button>
    </td>
  );
};
