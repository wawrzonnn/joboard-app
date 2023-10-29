export const formatAddedDatePracuj = (dateStr: string): string => {
    const months: { [key: string]: string } = {
        stycznia: '01',
        lutego: '02',
        marca: '03',
        kwietnia: '04',
        maja: '05',
        czerwca: '06',
        lipca: '07',
        sierpnia: '08',
        września: '09',
        października: '10',
        listopada: '11',
        grudnia: '12',
    };
    const parts = dateStr.replace('Opublikowana: ', '').split(' ');
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1] as keyof typeof months];
    const year = parts[2];
    return `added at ${day}.${month}.${year}`;
}