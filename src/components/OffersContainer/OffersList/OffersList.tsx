/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './OffersList.module.scss'
import { ClearButton } from '../../ClearButton/ClearButton'
import { JobOffer } from '@/types/frontend/types'
import { JobOfferModal } from '../../JobOfferModal/JobOfferModal'

interface OffersListProps {
	offers: JobOffer[]
	searchForJobTitle: string
	searchForLocation: string
	onClearFilters: () => void
}

export const OffersList = ({ offers, searchForJobTitle, onClearFilters, searchForLocation }: OffersListProps) => {
	const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null)
	const [showJobOfferModal, setShowJobOfferModal] = useState<boolean>(false)

	// const handleScrapeOffers = async () => {
    //     try {
    //         const response = await fetch('/api/scrape', { method: 'POST' });
    //         const data = await response.text();
    //         console.log(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

	const handleShowJobOfferModal = (offer: JobOffer) => {
		setSelectedOffer(offer)
		setShowJobOfferModal(true)
		document.body.style.overflow = 'hidden'
	}

	const handleCloseJobOfferModal = () => {
		setShowJobOfferModal(false)
		document.body.style.overflow = 'auto'
	}

	return (
		<div className={styles.container}>
			<span className={styles.offers_counter}>
				{offers.length || 0} offers found
				{searchForJobTitle && <> for &quot;{searchForJobTitle}&quot; </>}
				{searchForLocation && <> in &quot;{searchForLocation}&quot; </>}
				{(searchForJobTitle || searchForLocation) && onClearFilters && (
					<ClearButton onClick={onClearFilters}>Clear search</ClearButton>
				)}
			</span>
			{/* <button onClick={handleScrapeOffers}>Run Scraping Script</button> */}
			<ul className={styles.list}>
				{offers.map((offer, index) => (
					<li key={index} className={styles.list_element} onClick={() => handleShowJobOfferModal(offer)}>
						<div className={styles.job_title_wrapper}>
							<img className={styles.company_logo_desktop} src={offer.image} alt='company logo' />
							<div>
								<span className={styles.job_title}>{offer.title}</span>
								<div className={styles.info_wrapper}>
									<img className={styles.company_logo_mobile} src={offer.image} alt='company logo' />
									<div className={styles.mobile_info_wrapper}>
										<div className={styles.mobile_info_box}>
											<p className={` ${styles.company_name} ${styles.single_info_mobile}`}>{offer.company}</p>
											<p className={styles.single_info}>{offer.city}</p>
										</div>
										<div className={styles.mobile_info_box}>
											<p className={` ${styles.single_info} ${styles.single_info_mobile}`}>
												{offer.location !== 'Remote' ? 'On-Site' : offer.location}
											</p>
											<p className={styles.single_info}>{offer.seniority}</p>
										</div>
									</div>
									<p className={styles.salary}>{offer.salary}</p>
								</div>
							</div>
						</div>
						<span className={styles.offer_date}>{offer.addedAt}</span>
					</li>
				))}
			</ul>
			{showJobOfferModal && <JobOfferModal offer={selectedOffer} onClick={handleCloseJobOfferModal} />}
		</div>
	)
}
