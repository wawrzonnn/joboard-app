import React, { useState } from 'react'
import Image from 'next/image'
import styles from './OffersList.module.scss'
import { ClearButton } from '../../ClearButton/ClearButton'
import { JobOffer } from '../../../api/types'
import { formatDistanceToNow } from 'date-fns'
import { JobOfferModal } from '../../JobOfferModal/JobOfferModal'
import { useQuery } from 'react-query'
import { fetchJobOffers } from '../../../api/jobOffers'

interface OffersListProps {
	offers: JobOffer[]
	searchForJobTitle: string
	searchForLocation: string
	onClearFilters: () => void
}

export const OffersList = ({ offers, searchForJobTitle, onClearFilters, searchForLocation }: OffersListProps) => {
	const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null)
	const [showJobOfferModal, setShowJobOfferModal] = useState<boolean>(false)
	const { data: jobOffers, isLoading } = useQuery('jobOffers', fetchJobOffers)

	if (isLoading) {
		return <span>Loading...</span>
	}
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
			<ul className={styles.list}>
				{offers.map(offer => (
					<li key={offer._id} className={styles.list_element} onClick={() => handleShowJobOfferModal(offer)}>
						<div className={styles.job_title_wrapper}>
							<Image
								className={styles.company_logo_desktop}
								src='/src/assets/images/companyLogo.jpg'
								alt='company logo'
								width={100}
								height={100}
							/>
							<div>
								<span className={styles.job_title}>{offer.title}</span>
								<div className={styles.info_wrapper}>
									<Image
										className={styles.company_logo_mobile}
										src='/src/assets/images/companyLogo.jpg'
										alt='company logo'
										width={100}
										height={100}
									/>
									<div className={styles.mobile_info_wrapper}>
										<div className={styles.mobile_info_box}>
											<p className={` ${styles.company_name} ${styles.single_info_mobile}`}>{offer.companyName}</p>
											<p className={styles.single_info}>
												{offer.city}, {offer.country}
											</p>
										</div>
										<div className={styles.mobile_info_box}>
											<p className={` ${styles.single_info} ${styles.single_info_mobile}`}>{offer.workLocation}</p>
											<p className={styles.single_info}>{offer.seniority}</p>
										</div>
									</div>
									<p className={styles.salary}>
										{offer.salaryFrom} – {offer.salaryTo} {offer.currency} net
									</p>
								</div>
							</div>
						</div>
						<span className={styles.offer_date}>
							{formatDistanceToNow(new Date(offer.createdAt), { addSuffix: true })}
						</span>
					</li>
				))}
			</ul>
			{showJobOfferModal && <JobOfferModal offer={selectedOffer} onClick={handleCloseJobOfferModal} />}
		</div>
	)
}
