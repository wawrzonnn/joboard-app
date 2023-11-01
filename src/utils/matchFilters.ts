export const matchSeniority = (offerSeniority: string) => {
    const juniorKeywords = ['junio', 'lead', 'inter'];
    const midKeywords = ['mid', 'regula'];
    const seniorKeywords = ['senior', 'expert'];

    if (juniorKeywords.some(keyword => offerSeniority.toLowerCase().includes(keyword))) return 'Junior';
    if (midKeywords.some(keyword => offerSeniority.toLowerCase().includes(keyword))) return 'Mid';
    if (seniorKeywords.some(keyword => offerSeniority.toLowerCase().includes(keyword))) return 'Senior';
    return '';
}
