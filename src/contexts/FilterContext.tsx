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
   selectedEmploymentType: string[];
   setSelectedEmploymentType: SetState<string[]>;
   selectedSeniority: string[];
   setSelectedSeniority: SetState<string[]>;
   selectedLocation: string[];
   setSelectedLocation: SetState<string[]>;
   selectedSalary: number;
   setSelectedSalary: (value: number) => void;
   selectedPosition: string[];
   setSelectedPosition: SetState<string[]>;
   clearAllFilters: () => void;
}

const FilterContext = createContext<FilterContextState | undefined>(undefined);

export const FilterProvider = ({ children }: PropsWithChildren) => {
   const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
   const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
   const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
   const [selectedSalary, setSelectedSalary] = useState<number>(0);
   const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
   
   const clearAllFilters = () => {
      setSelectedEmploymentType([]);
      setSelectedSeniority([]);
      setSelectedLocation([]);
      setSelectedSalary(0);
      setSelectedPosition([]);
   };

   return (
      <FilterContext.Provider
         value={{
            selectedEmploymentType,
            setSelectedEmploymentType,
            selectedSeniority,
            setSelectedSeniority,
            selectedLocation,
            setSelectedLocation,
            selectedSalary,
            setSelectedSalary,
            selectedPosition,
            setSelectedPosition,
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
