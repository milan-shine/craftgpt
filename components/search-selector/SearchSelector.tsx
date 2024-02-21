import React, { useState } from "react";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { Trash } from "lucide-react";
import { ScrollArea } from "../shadcn/ui/scroll-area";

export type SelectorListItem = {
  name: string;
  value: string;
};

type SearchSelectorProps = {
  itemList: SelectorListItem[];
  selectedModels: SelectorListItem[];
  setFieldValue: Function;
  name: string;
};

const SearchSelector: React.FC<SearchSelectorProps> = ({
  itemList,
  selectedModels,
  setFieldValue,
  name,
}) => {
  const [modelName, setModelName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const handleSelectItem = (item: { name: string; value: string }) => {
  //   setFieldValue(name, [...selectedModels, item]);
  // };

  const handleSelectItem = (item: { name: string; value: string }) => {
    if (name === "type") {
      setFieldValue(name, [item]);
    } else {
      setFieldValue(name, [...selectedModels, item]);
    }
  };

  const handleDeleteItem = (value: string) => {
    const filteredItems = selectedModels.filter((item) => item.value !== value);
    setFieldValue(name, filteredItems);
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
        {selectedModels.map(({ name, value }) => (
          <li
            key={value}
            className="my-2 flex w-full items-center justify-between rounded-xl bg-card px-8 py-2"
          >
            <span>{name}</span>
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
          <div className="absolute top-11 w-full">
            <ScrollArea className="flex max-h-[40vh] flex-col rounded-lg bg-background p-2 shadow-xl">
              <ul className="flex flex-col gap-1">
                {itemList?.filter(({ name }) => name.includes(modelName))
                  .length > 0 ? (
                  itemList
                    ?.filter(({ name }) => name.includes(modelName))
                    .map(({ name, value }) => (
                      <li key={value}>
                        <Button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          variant={"ghost"}
                          className="w-full"
                          onClick={() => handleSelectItem({ name, value })}
                          disabled={handleDisabled(value)}
                        >
                          {name}
                        </Button>
                      </li>
                    ))
                ) : (
                  <li className="flex justify-center">Model not found</li>
                )}
              </ul>
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchSelector;
