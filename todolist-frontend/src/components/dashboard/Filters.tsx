import { useState } from "react";
import FilterIcon from "../../assets/icons/filter";
import type { filterProps } from "../../types/filters";
import RadioButton from "../ui/RadioButton";

const Filters = ({ filters, setFilters }: filterProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setFiltersVisible(!filtersVisible)}
        className={`border-1 border-zinc-400 cursor-pointer py-2 px-3 rounded-sm hover:bg-zinc-200 transition-all duration-300 ${
          filtersVisible ? "bg-zinc-200" : "bg-white"
        }`}
      >
        <FilterIcon />
      </button>
      {filtersVisible && (
        <div className="p-3 border-1 border-zinc-400 shadow-lg rounded-sm bg-white absolute top-12 -right-12 md:top-3 md:right-12 z-20">
          <form className="flex flex-col gap-5">
            <div className="space-y-1">
              <RadioButton
                label="Overdue"
                id="overdue"
                name="assignment-state"
                onChange={() => {
                  setFilters((prev) => ({ ...prev, dueStatus: "overdue" }));
                }}
                checked={filters.dueStatus === "overdue"}
              />
              <RadioButton
                label="Future"
                id="future"
                name="assignment-state"
                onChange={() => {
                  setFilters((prev) => ({ ...prev, dueStatus: "future" }));
                }}
                checked={filters.dueStatus === "future"}
              />
            </div>
            <input
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
              value={filters.title}
              type="text"
              placeholder="Title..."
              className="border-1 border-zinc-400 px-3 py-0.5 rounded-sm placeholder-zinc-500"
            />
            <button
              onClick={() => {
                setFilters({ title: "", dueStatus: "all" });
              }}
              type="button"
              className="border-1 border-zinc-400 rounded-md py-0.5 font-semibold cursor-pointer hover:bg-zinc-200 transition-all duration-300"
            >
              Reset
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Filters;
