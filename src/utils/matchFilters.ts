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
