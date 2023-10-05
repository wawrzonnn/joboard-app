import { JobOffer, suggestionType } from "../api/types";

export const removeDuplicatesSuggestion = (array: JobOffer[], type: suggestionType): JobOffer[] => {
    const uniqueKeys = new Set();
    return array.filter(item => {
        const key = item[type as keyof JobOffer]; 
        if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            return true;
        }
        return false;
    });
 }