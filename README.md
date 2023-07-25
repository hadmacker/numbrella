# Numbrella

> For my hypernumeric little professor and all others like him; those fascinated with interesting numbers, patterns, sequences, and mathematics beyond their age.

# Getting Started

## Prerequisites

* **PowerShell**
  * [Install PowerShell 7.3 or greater](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3)
    * Install using MSI.
    * Check the following install options in addition to any default options already selected for install:
      * Add 'Open here' context menus to Explorer
      * Add 'Run with PowerShell 7' context menu for PowerShell files
* **Node.js**
  * [Node LTS 18.17.0](https://nodejs.org/dist/v18.17.0/) [Windows x64 Installer](https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi)
  * Check the install option for Additional Node Tools.
* **Next.js**
  * [Installation](https://nextjs.org/docs/getting-started/installation)

## One-Time actions (already performed)

* $> `npm init`
* $> `npm install next@latest react@latest react-dom@latest`
* $> `npm install create-next-app@latest --save`
* $> `npx create-next-app@latest`
* $> `npm install decimal.js`

## To Run Locally

* `npn run dev`

# Technical Reference

## React

* [Starting a new project](https://react.dev/learn/start-a-new-react-project)

## Next.js

* :star: [Next.js Docs](https://nextjs.org/docs)
* [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
  > Since Next.js supports this static export, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets.
  * Unsupported Features:
    * rewrites in next.config.js
    * redirects in next.config.js
    * headers in next.config.js
    * Middleware
    * Incremental Static Regeneration
* Passing state between pages
  * Querystring: [useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
* Lessons Learned:
  * Avoid `next/router` and use `next/navigation` instead. See: [App Router Migration (from Pages to App)](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks)

## Tailwind CSS

* [Home](https://tailwindcss.com/)
* [Docs](https://tailwindcss.com/docs/installation)

## TypeScript

* [Iterators & Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)
* [Modules](https://www.geeksforgeeks.org/how-to-declare-a-module-in-typescript/)