export const formatAddedAtStringPracuj = (dateStr: string): string => {
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

export const formatSalaryStringPracuj = (salaryString: string): string => {
    const indexOfDot = salaryString.indexOf('.');
    if (indexOfDot !== -1) {
      return salaryString.slice(0, indexOfDot + 1);
    } else
    return salaryString;
  }

  export const formatSeniorityStringPracuj = (seniorityString: string): string => {
    const match = seniorityString.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      return match[1];
    } else
    return seniorityString;
  }

  export const removeStringAfterComma = (cityString: string): string => {
    const index = cityString.indexOf(',');
    if (index !== -1) {
      return cityString.substring(0, index).trim();
    } else
    return cityString;
  }

  export const filterContract = (employmentTypes: string[]): string => {
    for (let type of employmentTypes) {
      if (type.toLowerCase().includes('contract')) {
        return 'Contract';
      }
    }
    return 'B2B/Contract';
  }

  export const extractSalaryMinNoFluffJobs = (salary: string): string => {
    const parts = salary.split('–');
    if (parts.length >= 1) {
      return parts[0].trim().replace(/\s+/g, ''); 
    }
    return '';
  }

  export const extractSalaryMaxNoFluffJobs = (salary: string): string => {
    const parts = salary.split('–');
    if (parts.length >= 2) {
      return parts[1].trim().replace(/\s+/g, '');
    }
    return '';
  }