import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";

const category = [
  {
    id: "reactjs",
    label: "ReactJS",
  },
  {
    id: "nextjs",
    label: "NextJS",
  },

  {
    id: "data science",
    label: "Data Science",
  },

  {
    id: "frontend development",
    label: "Frontend Development",
  },

  {
    id: "backend development",
    label: "Backend Development",
  },

  {
    id: "fullstack development",
    label: "Fulllstack Development",
  },

  {
    id: "mern stack development",
    label: "MERN Stack Development",
  },

  {
    id: "javascript",
    label: "Javascript",
  },

  {
    id: "python",
    label: "Python",
  },

  {
    id: "docker",
    label: "Docker",
  },

  {
    id: "mongodb",
    label: "MongoDB",
  },

  {
    id: "php development",
    label: "PHP Development",
  },
];

const SeachFilter = ({ handleFilterChange }) => {
  // console.log("handleFilterchange", handleFilterChange);

  const [sortByPrice, setSortByPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategory) => {
      const newCategories = prevCategory.includes(categoryId)
        ? prevCategory.filter(id !== categoryId)
        : [...prevCategory, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-semibold text-lg md:text-2xl">Filter Option</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Separator className="my-4" />
        <div>
          <h1 className="font-semibold mb-2 ">Category</h1>
          {category.map((category) => (
            <div className="flex flex-center space-x-2 my-2" key={category.id}>
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeachFilter;
