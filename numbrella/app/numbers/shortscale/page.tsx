import React, { useEffect, useState } from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const pretty = PrettyChar.allCharacters();


let names = new Map<string, string>();
names.set("One"                     ,"10^0");
names.set("Ten"                     ,"10^1");
names.set("Hundred"                 ,"10^2");
names.set("Thousand"                ,"10^3");
names.set("Million"                 ,"10^6");
names.set("Billion"                 ,"10^9");
names.set("Trillion"                ,"10^12");
names.set("Quadrillion"             ,"10^15");
names.set("Quintillion"             ,"10^18");
names.set("Sextillion"              ,"10^21");
names.set("Septillion"              ,"10^24");
names.set("Octillion"               ,"10^27");
names.set("Nonillion"               ,"10^30");
names.set("Decillion"               ,"10^33");
names.set("Undecillion"             ,"10^36");
names.set("Duodecillion"            ,"10^39");
names.set("Tredecillion"            ,"10^42");
names.set("Quattuordecillion"       ,"10^45");
names.set("Quindecillion"           ,"10^48");
names.set("Sexdecillion"            ,"10^51");
names.set("Septendecillion"         ,"10^54");
names.set("Octodecillion"           ,"10^57");
names.set("Novemdecillion"          ,"10^60");
names.set("Vigintillion"            ,"10^63");
names.set("Unvigintillion"          ,"10^66");
names.set("Duovigintillion"         ,"10^69");
names.set("Trevigintillion"         ,"10^72");
names.set("Quattuorvigintillion"    ,"10^75");
names.set("Quinvigintillion"        ,"10^78");
names.set("Sexvigintillion"         ,"10^81");
names.set("Septenvigintillion"      ,"10^84");
names.set("Octovigintillion"        ,"10^87");
names.set("Novemvigintillion"       ,"10^90");
names.set("Trigintillion"           ,"10^93");
names.set("Untrigintillion"         ,"10^96");
names.set("Duotrigintillion"        ,"10^99");
names.set("Googol"                  ,"10^100");
names.set("Trestrigintillion"       ,"10^102");
names.set("Quarttourtrigintillion"  ,"10^105");
names.set("Quinquatrigintillion"    ,"10^108");
names.set("Sestrigintillion"        ,"10^111");
names.set("Septemtrigintillion"     ,"10^114");
names.set("Octotrigintillion"       ,"10^117");
names.set("Novemtrigintillion"      ,"10^120");
names.set("Quadragintillion"        ,"10^123");
names.set("Unquadragintillion"      ,"10^153");
names.set("Duoquadragintillion"     ,"10^303");

function formatted(expanded: string, bw: boolean): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(expanded).split("");

  // Create an array of <div> elements to hold each digit
  const elements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = (bw.toString() == "true")
      ? pretty.filter(n=> n.id == "0")[0].prettyStyle
      : pretty.filter(n=> n.id == digit)[0].prettyStyle;
    const combinedClasses = `${prettyStyle}`;
    return (
      <span className={combinedClasses} key={index}>
        {digit}
      </span>
    );
  });

  return elements;
}

export default function Page() {
  const elements: React.ReactElement[] = [];

  names.forEach((v, k) => {
    elements.push(
      <tr className="m-5 p-5">
        {Formula(k, v, false)}
      </tr>
    );
  });

  return (
  <>
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="text-left">Notation</th>
          <th className="text-left">Short Scale Name</th>
          <th className="text-left">Number</th>
        </tr>
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  </>
  )
}

function Formula(key: string, value: string, bw: boolean) {
  const zeroes = parseInt(value.replace("10^",""));

  const valueExpanded = `1${'0'.repeat(zeroes)}`;
  return (
      <>
        <td className="text-left m-5 tracking-wide font-mono text-3xl font-black text-gray-500">{value}</td>
        <td className="text-left m-5 tracking-wide font-mono text-3xl font-black">{key}</td>
        <td className="text-left tracking-wide font-mono text-3xl font-black">{formatted(valueExpanded, bw)}</td>
      </>
    )
}