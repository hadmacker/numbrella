export class NumberFormatter {
    
    public static formatNumberWithBreaks(input: string): string {
        const cleanedInput = input.replace(/,/g, ''); // Remove any existing commas
        const numberLength = cleanedInput.length;
        const breakEvery = 3; // Insert a break every 'breakEvery' digits
    
        let formattedNumber = '';
    
        for (let i = 0; i < numberLength; i += breakEvery) {
        const startIndex = Math.max(numberLength - i - breakEvery, 0);
        const chunk = cleanedInput.slice(startIndex, numberLength - i);
        formattedNumber = chunk + (formattedNumber ? ',' + formattedNumber : '');
        }

        if (formattedNumber.startsWith('-,'))
            formattedNumber = formattedNumber.replace('-,', '-');
    
        return formattedNumber;
    }
}