'use client'

import React, { useEffect, useState } from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import { PrettyChar } from '../../prettyChar'

const pretty = PrettyChar.allCharacters();

const days: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getRandomDay(excludeday?: string): string {
  // Create a new array containing days other than the excluded day
  const availabledays = excludeday
    ? days.filter((day) => day !== excludeday)
    : days;

  // Get a random index between 0 and availabledays.length - 1
  const randomIndex = Math.floor(Math.random() * availabledays.length);

  // Return the randomly selected day
  return availabledays[randomIndex];
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
  let excludedday = useQueryString("last", "unset");
  let nextday = useQueryString("next", "unset");
  let currentday = "";
  let nextHref = "";
  let prettyClass = "";

  const router = useRouter();
  
  if(nextday == "unset") {
    nextday = getRandomDay(excludedday);
    router.push(`/words/days?next=${nextday}`)
  } else {
    currentday = nextday;
    nextday = getRandomDay(currentday);
    nextHref = `?last=${currentday}&next=${nextday}&bw=false`
    prettyClass = pretty.filter(f=> f.id == currentday)[0].prettyStyle!
  }
  
  return (
    <>
      <div className="text-center m-5 tracking-wide font-mono font-black text-5xl">
        <a href={nextHref} key={currentday+"_href"}>
          <div className={prettyClass} key={currentday}>
            {currentday}
          </div>
        </a>
      </div>
    </>
    )
}