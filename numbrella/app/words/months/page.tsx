'use client'

import React, { useEffect, useState } from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import { PrettyChar } from '../../prettyChar'

const pretty = PrettyChar.allCharacters();

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getRandomMonth(excludeMonth?: string): string {
  // Create a new array containing months other than the excluded month
  const availableMonths = excludeMonth
    ? months.filter((month) => month !== excludeMonth)
    : months;

  // Get a random index between 0 and availableMonths.length - 1
  const randomIndex = Math.floor(Math.random() * availableMonths.length);

  // Return the randomly selected month
  return availableMonths[randomIndex];
}

function useQueryString(key: string, defaultValue: string) {
  const searchParams = useSearchParams()
  const value = searchParams.get(key);

  if (value === undefined || value === null) {
    return defaultValue;
  }

  return Array.isArray(value) ? value[0] : value;
}

export default function Page() {
  const bw = useQueryString("bw", "unset");
  let excludedMonth = useQueryString("last", "unset");
  let nextMonth = useQueryString("next", "unset");
  let currentMonth = "";
  let nextHref = "";
  let prettyClass = "";

  const router = useRouter();
  
  if(nextMonth == "unset") {
    nextMonth = getRandomMonth(excludedMonth);
    router.push(`/words/months?next=${nextMonth}`)
  } else {
    currentMonth = nextMonth;
    nextMonth = getRandomMonth(currentMonth);
    nextHref = `?last=${currentMonth}&next=${nextMonth}&bw=false`
    prettyClass = pretty.filter(f=> f.id == currentMonth)[0].prettyStyle!
  }
  
  return (
    <>
      <div className="text-center m-5 tracking-wide font-mono font-black text-5xl">
        <a href={nextHref} key={currentMonth+"_href"}>
          <div className={prettyClass} key={currentMonth}>
            {currentMonth}
          </div>
        </a>
      </div>
    </>
    )
}