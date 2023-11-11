import React, { useState } from 'react'
import styles from './FiltersContainer.module.scss'
import { Logo } from '../Logo/Logo'
import { FilterSection } from './FilterSection/FilterSection'
import { FilterSectionSalary } from './FilterSectionSalary/FilterSectionSalary'
import { ClearButton } from '../ClearButton/ClearButton'
import FiltersButton from './FiltersButton/FiltersButton'
import { EmploymentType, Position, Seniority, Location } from '@/types/frontend/types'
import { useFilters } from '../../contexts/FilterContext'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const employmentType = Object.values(EmploymentType)
const seniority = Object.values(Seniority)
const location = Object.values(Location)
const position = Object.values(Position)

export const FiltersContainer = () => {
	const {
		setSelectedEmploymentType,
		setSelectedSeniority,
		setSelectedLocation,
		setSelectedSalary,
		setSelectedPosition,
		clearAllFilters,
	} = useFilters()

	const [clearFiltersCount, setClearFiltersCount] = useState<number>(0)
	const [openMenu, setOpenMenu] = useState<boolean>(false)


	const handleCloseMenu = () => {
		setOpenMenu(false);
	 };

	const handleClearFilters = () => {
		clearAllFilters()
		setClearFiltersCount(prev => prev + 1)
	}

	const getMobileMenuClasses = cx({
		[styles.filters_wrapper]: true,
		[styles.hidden]: !openMenu
	})

	const getMobileHeaderClasses = cx({
		[styles.header_mobile]: true,
		[styles.header_mobile_padding]: openMenu,
	})

	return (
			<div className={styles.container}>
				<div className={getMobileHeaderClasses}>
					<Logo />
					<FiltersButton isOpen={openMenu} setOpenMenu={setOpenMenu} />
				</div>
				<div className={getMobileMenuClasses}>
					<header className={styles.header}>
						<p className={styles.header_title}>Filter offers</p>
						<ClearButton onClick={handleClearFilters}>Clear filters</ClearButton>
					</header>
					<section className={styles.open_filters}>
						<FilterSection
							title='Employment type'
							filters={employmentType}
							onFilterChange={setSelectedEmploymentType}
							clearFiltersCount={clearFiltersCount}
						/>
						<FilterSection
							title='Seniority'
							filters={seniority}
							onFilterChange={setSelectedSeniority}
							clearFiltersCount={clearFiltersCount}
						/>
						<FilterSection
							title='Location'
							filters={location}
							onFilterChange={setSelectedLocation}
							clearFiltersCount={clearFiltersCount}
						/>
						<FilterSection
							title='Position'
							filters={position}
							onFilterChange={setSelectedPosition}
							clearFiltersCount={clearFiltersCount}
						/>
						<FilterSectionSalary setSelectedSalary={setSelectedSalary} clearFiltersCount={clearFiltersCount} />
						<button className={styles.xmark} onClick={handleCloseMenu}>Close</button>
					</section>
				</div>
			</div>
	)
}
