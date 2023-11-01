export const matchSeniority = (offerSeniority: string) => {
    const juniorKeywords = ['junio', 'lead', 'inter'];
    const midKeywords = ['mid', 'regula'];
    const seniorKeywords = ['senior', 'expert'];

    if (juniorKeywords.some(keyword => offerSeniority.toLowerCase().includes(keyword))) return 'Junior';
    if (midKeywords.some(keyword => offerSeniority.toLowerCase().includes(keyword))) return 'Mid';
    if (seniorKeywords.some(keyword => offerSeniority.toLowerCase().includes(keyword))) return 'Senior';
    return '';
}

export const matchPosition = (offerPosition: string) => {
    const frontendKeywords = ['front'];
    const backendKeywords = ['back'];
    const fullstackKeywords = ['full'];

    if (frontendKeywords.some(keyword => offerPosition.toLowerCase().includes(keyword))) return 'Frontend';
    if (backendKeywords.some(keyword => offerPosition.toLowerCase().includes(keyword))) return 'Backend';
    if (fullstackKeywords.some(keyword => offerPosition.toLowerCase().includes(keyword))) return 'Fullstack';
    return '';
}

export const matchEmploymentType = (offerEmploymentType: string) => {
    const contractKeywords = ['umowa', 'etat', 'kontrakt', 'contract', 'permanent'];
    const b2bKeywords = ['b2b', 'kontrakt b2b', 'b2b kontrakt', 'b2b contract'];

    const lowercasedOffer = offerEmploymentType.toLowerCase();

    if (b2bKeywords.some(keyword => lowercasedOffer.includes(keyword))) return 'B2B';
    if (contractKeywords.some(keyword => lowercasedOffer.includes(keyword))) return 'Contract';
    return '';
}



export const matchLocation = (offerLocation: string) => {
    const remoteKeywords = ['zdalna', 'remote', 'home'];
    const hybridKeywords = ['hybryd', 'hybrid'];

    if (remoteKeywords.some(keyword => offerLocation.toLowerCase().includes(keyword))) return 'Remote';
    if (hybridKeywords.some(keyword => offerLocation.toLowerCase().includes(keyword))) return 'Hybrid';
    return '';
}

