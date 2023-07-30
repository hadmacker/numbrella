export class PrettyChar {
    id?: string;
    prettyStyle?: string;
    
    constructor(id: string, prettyStyle: string) {
        this.id = id;
        this.prettyStyle = prettyStyle;
    }

    public static getPretty(language: PrettyChar[], value: string, bw: boolean) {
        const words = (bw.toString() == "true")
            ? language.filter(n=> n.id == "0")
            : language.filter(n=> n.id == value);
    }

    public static allCharacters() {
        let pretty: Array<PrettyChar> = [];
        pretty.push(new PrettyChar(",","text-gray-300 m-0"));
        pretty.push(new PrettyChar("0","text-gray-400"));
        pretty.push(new PrettyChar("1","text-pink-500"));
        pretty.push(new PrettyChar("2","text-amber-500"));
        pretty.push(new PrettyChar("3","text-lime-500"));
        pretty.push(new PrettyChar("4","text-emerald-500"));
        pretty.push(new PrettyChar("5","text-blue-400"));
        pretty.push(new PrettyChar("6","text-indigo-600"));
        pretty.push(new PrettyChar("7","text-fuchsia-500"));
        pretty.push(new PrettyChar("8","text-rose-500"));
        pretty.push(new PrettyChar("9","text-cyan-400"));

        pretty.push(new PrettyChar("January", "text-green-300"));
        pretty.push(new PrettyChar("February", "text-green-400"));
        pretty.push(new PrettyChar("March", "text-pink-500"));
        pretty.push(new PrettyChar("April", "text-amber-500"));
        pretty.push(new PrettyChar("May", "text-lime-500"));
        pretty.push(new PrettyChar("June", "text-emerald-500"));
        pretty.push(new PrettyChar("July", "text-blue-400"));
        pretty.push(new PrettyChar("August", "text-indigo-600"));
        pretty.push(new PrettyChar("September", "text-fuchsia-500"));
        pretty.push(new PrettyChar("October", "text-rose-500"));
        pretty.push(new PrettyChar("November", "text-cyan-400"));
        pretty.push(new PrettyChar("December", "text-yellow-200"));

        pretty.push(new PrettyChar("Monday", "text-indigo-500"));
        pretty.push(new PrettyChar("Tuesday", "text-fuchsia-500"));
        pretty.push(new PrettyChar("Wednesday", "text-pink-500"));
        pretty.push(new PrettyChar("Thursday", "text-amber-500"));
        pretty.push(new PrettyChar("Friday", "text-lime-500"));
        pretty.push(new PrettyChar("Saturday", "text-emerald-500"));
        pretty.push(new PrettyChar("Sunday", "text-blue-400"));

        return pretty;
    }
}