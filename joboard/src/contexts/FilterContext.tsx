import React, {
   createContext,
   useContext,
   useState,
   PropsWithChildren,
   Dispatch,
   SetStateAction,
} from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

interface FilterContextState {
   selectedJobTypes: string[];
   setSelectedJobTypes: SetState<string[]>;
   selectedSeniority: string[];
   setSelectedSeniority: SetState<string[]>;
   selectedLocation: string[];
   setSelectedLocation: SetState<string[]>;
   selectedSalary: number;
   setSelectedSalary: (value: number) => void;
   clearAllFilters: () => void
}

const FilterContext = createContext<FilterContextState | undefined>(undefined);

export const FilterProvider = ({ children }: PropsWithChildren) => {
   const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
   const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
   const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
   const [selectedSalary, setSelectedSalary] = useState<number>(0);
   const clearAllFilters = () => {
    setSelectedJobTypes([]);
    setSelectedSeniority([]);
    setSelectedLocation([]);
    setSelectedSalary(0);
 };

   return (
      <FilterContext.Provider
         value={{
            selectedJobTypes,
            setSelectedJobTypes,
            selectedSeniority,
            setSelectedSeniority,
            selectedLocation,
            setSelectedLocation,
            selectedSalary,
            setSelectedSalary,
            clearAllFilters
         }}
      >
         {children}
      </FilterContext.Provider>
   );
};

export const useFilters = (): FilterContextState => {
   const context = useContext(FilterContext);
   if (!context) {
      throw new Error('useFilters must be used within a FilterProvider');
   }
   return context;
};
