export class PrettyChar {
    id?: string;
    prettyStyle?: string;
    
    constructor(id: string, prettyStyle: string) {
        this.id = id;
        this.prettyStyle = prettyStyle;
    }

    public static allCharacters() {
        let numbers: Array<PrettyChar> = [];
        numbers.push(new PrettyChar(",","text-gray-400 m-0"));
        numbers.push(new PrettyChar("0","text-gray-500"));
        numbers.push(new PrettyChar("1","text-pink-500"));
        numbers.push(new PrettyChar("2","text-amber-500"));
        numbers.push(new PrettyChar("3","text-lime-500"));
        numbers.push(new PrettyChar("4","text-emerald-500"));
        numbers.push(new PrettyChar("5","text-blue-400"));
        numbers.push(new PrettyChar("6","text-indigo-600"));
        numbers.push(new PrettyChar("7","text-fuchsia-500"));
        numbers.push(new PrettyChar("8","text-rose-500"));
        numbers.push(new PrettyChar("9","text-cyan-400"));

        return numbers;
    }
}