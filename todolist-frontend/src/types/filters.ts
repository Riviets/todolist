export type filtersType = {
  title: string;
  dueStatus: "all" | "future" | "overdue";
};

export type filterProps = {
  filters: filtersType;
  setFilters: React.Dispatch<React.SetStateAction<filtersType>>;
};
