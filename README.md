# SteelPulse

SteelPulse is a real-time steel pricing and quotation platform. It provides live price updates for rebar, beams, sheets, pipes,
and profiles, along with historical charts and instant quotation requests for suppliers and buyers in the steel market.

## Website

The repository contains a minimal static website prototype for the SteelPulse MVP. It includes:

- A product list with sample prices.
- A price history chart rendered with [Chart.js](https://www.chartjs.org/).
- A bilingual interface that supports both **English** and **Persian**. Users can switch languages via the buttons on the page, and
  the layout adjusts for right-to-left text when Persian is selected.

To view the site, open `index.html` in a modern web browser.

## Development

Install Node.js and run:

```
npm test
```

No tests are defined yet; the command exists to support CI.

## Continuous Deployment

This repository uses GitHub Actions to deploy the static site to GitHub Pages.
Every pull request builds the site and provides a preview link in the PR checks.
