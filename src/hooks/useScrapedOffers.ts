'use client'
import { useState, useEffect } from 'react';
import { JobOffer } from '@/types/frontend/types';

export const useScrapedOffers = () => {
    const [scrapedOffers, setScrapedOffers] = useState<JobOffer[]>([]);
    const jsonFile = '/results.json';
    
    // useEffect(() => {
    //     fetch(jsonFile)
    //         .then(res => res.json())
    //         .then(data => {
    //             const combinedData = [...data.frontend, ...data.backend, ...data.fullstack].map(offer => {
    //                 if (typeof offer.salaryMin === 'string') {
    //                     offer.salaryMin = parseFloat(offer.salaryMin);
    //                 }
    //                 return offer;
    //             })
    //             setScrapedOffers(combinedData);
    //         });
    // }, []);

    return scrapedOffers;
}
