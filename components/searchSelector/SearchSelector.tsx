import React, { useRef, useState } from "react";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { Trash } from "lucide-react";

type SearchSelectorProps = {
  itemList: {
    label: string;
    value: string;
  }[];
  selectedModels: {
    label: string;
    value: string;
  }[];
  setFieldValue: Function;
};

const SearchSelector: React.FC<SearchSelectorProps> = ({
  itemList,
  selectedModels,
  setFieldValue,
}) => {
  const [modelName, setModelName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSelectItem = (item: { label: string; value: string }) => {
    setFieldValue("maturity_models", [...selectedModels, item]);
  };

  const handleDeleteItem = (value: string) => {
    const filteredItems = selectedModels.filter((item) => item.value !== value);
    setFieldValue("maturity_models", filteredItems);
  };

  const handleDisabled = (value: string): boolean => {
    let disabled = false;
    for (const item of selectedModels) {
      if (item.value === value) {
        disabled = true;
      }
    }
    return disabled;
  };

  return (
    <>
      <ul>
        {selectedModels.map(({ label, value }) => (
          <li
            key={value}
            className="bg-card w-full px-8 py-2 my-2 rounded-xl flex justify-between items-center"
          >
            <span>{label}</span>
            <Trash
              className="h-[16px] w-[16px] cursor-pointer"
              onClick={(e) => handleDeleteItem(value)}
            />
          </li>
        ))}
      </ul>
      <div className="relative">
        <Input
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          placeholder="Search for model"
        />
        {isOpen && (
          <ul className="absolute bg-card flex flex-col max-h-[40vh] overflow-auto overflow-x-auto w-full rounded-xl gap-1 p-2 top-12">
            {itemList?.filter(({ label }) => label.includes(modelName)).length >
            0 ? (
              itemList
                ?.filter(({ label }) => label.includes(modelName))
                .map(({ label, value }) => (
                  <li key={value}>
                    <Button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      variant={"ghost"}
                      className="w-full"
                      onClick={() => handleSelectItem({ label, value })}
                      disabled={handleDisabled(value)}
                    >
                      {label}
                    </Button>
                  </li>
                ))
            ) : (
              <li className="flex justify-center">Model not found</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchSelector;
