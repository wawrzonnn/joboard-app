/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from 'react'
import styles from './OffersContainer.module.scss'
import { SearchInput } from '../SearchInput/SearchInput'
import { SearchIcon } from '../../assets/icons/Search'
import { MarkerIcon } from '../../assets/icons/Marker'
import { OffersList } from './OffersList/OffersList'
import { JobOffer, suggestionType } from '@/types/frontend/types'
import { removeDuplicatesSuggestion } from '../../utils/removeDuplicateSuggestion'
import { useFilters } from '../../contexts/FilterContext'
import { matchSeniority } from '../../utils/matchFilters';
import { useScrapedOffers } from '../../hooks/useScrapedOffers';

export const OffersContainer = () => {
    const { selectedJobTypes, selectedSeniority, selectedLocation, selectedSalary } = useFilters();
    const scrapedOffers = useScrapedOffers();
    
    const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
    const [searchForJobTitle, setSearchForJobTitle] = useState('');
    const [searchForLocation, setSearchForLocation] = useState('');
    const [titleSuggestions, setTitleSuggestions] = useState<JobOffer[]>([]);
    const [locationSuggestions, setLocationSuggestions] = useState<JobOffer[]>([]);

    const filterOffers = (title: string, location: string) => {
        const matchedOffers = scrapedOffers.filter(
            offer =>
                (!title || offer.title.toLowerCase().includes(title.toLowerCase())) &&
                (!location || offer.city.toLowerCase().includes(location.toLowerCase())) &&
                (!selectedJobTypes.length || selectedJobTypes.includes(offer.jobType)) &&
                (!selectedSeniority.length || selectedSeniority.includes(matchSeniority(offer.seniority))) &&
                (!selectedLocation.length || selectedLocation.includes(offer.location)) &&
                (!selectedSalary || selectedSalary <= offer.salaryMin)
        )
        setFilteredOffers(matchedOffers);
    }

	const handleSearchByJobTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setSearchForJobTitle(inputValue)

		if (!inputValue) {
			setTitleSuggestions([])
		} else if (scrapedOffers) {
			const matchedOffers = scrapedOffers.filter(offer => offer.title.toLowerCase().includes(inputValue.toLowerCase()))
			setTitleSuggestions(removeDuplicatesSuggestion(matchedOffers, suggestionType.TITLE))
		} else {
			setTitleSuggestions([])
		}

		filterOffers(inputValue, searchForLocation)
	}

	const handleSearchByLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setSearchForLocation(inputValue)

		if (!inputValue) {
			setLocationSuggestions([])
		} else if (scrapedOffers) {
			const matchedOffers = scrapedOffers.filter(offer => offer.city.toLowerCase().includes(inputValue.toLowerCase()))
			setLocationSuggestions(removeDuplicatesSuggestion(matchedOffers, suggestionType.CITY))
		} else {
			setLocationSuggestions([])
		}

		filterOffers(searchForJobTitle, inputValue)
	}

	const handleTitleSuggestionClick = (title: string) => {
		setSearchForJobTitle(title)
		setTitleSuggestions([])
		filterOffers(title, searchForLocation)
	}

	const handleLocationSuggestionClick = (city: string) => {
		setSearchForLocation(city)
		setLocationSuggestions([])
		filterOffers(searchForJobTitle, city)
	}

	const handleClearFilters = () => {
		setSearchForJobTitle('')
		setSearchForLocation('')
		setTitleSuggestions([])
		setLocationSuggestions([])
		setFilteredOffers(scrapedOffers || [])
	}

	useEffect(() => {
		filterOffers(searchForJobTitle, searchForLocation)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrapedOffers, selectedJobTypes, selectedSeniority, selectedLocation, selectedSalary])

	return (
		<div className={styles.container}>
			<div className={styles.inputs_wrapper}>
				<SearchInput
					placeholder={'Search for'}
					onChange={handleSearchByJobTitle}
					onSuggestionClick={handleTitleSuggestionClick}
					suggestions={titleSuggestions}
					value={searchForJobTitle}
					icon={<SearchIcon />}
					typeOfSuggestion={suggestionType.TITLE}
				/>
				<SearchInput
					placeholder={'Search location'}
					onChange={handleSearchByLocation}
					onSuggestionClick={handleLocationSuggestionClick}
					suggestions={locationSuggestions}
					value={searchForLocation}
					icon={<MarkerIcon />}
					typeOfSuggestion={suggestionType.CITY}
				/>
			</div>
			<OffersList
				offers={filteredOffers}
				searchForJobTitle={searchForJobTitle}
				searchForLocation={searchForLocation}
				onClearFilters={handleClearFilters}
			/>
		</div>
	)
}
