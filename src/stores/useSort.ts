import create from "zustand";

export interface SortDTO {
  fieldName: string;
  fieldLabel: string;
  direction: "ASC" | "DESC";
}

type UseSortProps = {
  sortBy: SortDTO[];
  resetSortBy: () => void;
  setSortBy: (fieldName: string, fieldLabel: string) => void;
  removeSortBy: (fieldName: string) => void;
  getDirection: (fieldName: string) => "ASC" | "DESC" | undefined;
  hasSort: (fieldName: string) => boolean;
};

const initialValues: UseSortProps = {
  sortBy: [],
  resetSortBy: () => {},
  setSortBy: () => {},
  removeSortBy: () => {},
  getDirection: () => undefined,
  hasSort: () => false,
};

export const useSort = create<UseSortProps>((set, get) => ({
  ...initialValues,
  setSortBy: (fieldName: string, fieldLabel: string) => {
    return set((state) => ({
      ...state,
      sortBy: state.sortBy.some((sort) => sort.fieldName === fieldName)
        ? state.sortBy.map((sort) =>
            sort.fieldName === fieldName
              ? {
                  ...sort,
                  direction: sort.direction === "ASC" ? "DESC" : "ASC",
                }
              : sort
          )
        : [{ fieldName, fieldLabel, direction: "ASC" }, ...state.sortBy],
    }));
  },
  removeSortBy: (fieldName: string) => {
    return set((state) => ({
      ...state,
      sortBy: state.sortBy.filter((sort) => sort.fieldName !== fieldName),
    }));
  },
  resetSortBy: () => {
    return set((state) => ({
      ...state,
      sortBy: [],
    }));
  },
  getDirection: (fieldName) => {
    let currentSort = get().sortBy;
    let idx = currentSort.findIndex((s) => s.fieldName === fieldName);
    if (idx > -1) {
      return currentSort[idx].direction;
    } else {
      return undefined;
    }
  },
  hasSort: (fieldName) => {
    return get().sortBy.some((s) => s.fieldName === fieldName);
  },
}));
