# Crypto Tracker

A real-time cryptocurrency dashboard built with React, Redux Toolkit, and the Binance WebSocket API.  
It displays live prices, market cap, supply, and 7-day sparkline charts for popular crypto assets.

## Features

- Live price, volume, and 24h change updates via Binance WebSocket
- Market cap, circulating supply, and max supply via Binance REST API
- 7-day sparkline charts for each asset
- Responsive UI with dark mode support
- Asset images and basic filtering

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
npm install
```

### Running the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  components/         # UI components (CryptoTable, Header, etc.)
  data/               # Initial asset data with images
  features/assets/    # Redux slice for assets
  services/           # Binance WebSocket & REST API logic
  App.jsx             # Main app component
  main.jsx            # Entry point
public/
  images/             # Asset logos (bitcoin.png, ethereum.png, etc.)
```

## Customization

- To add more assets, edit `src/data/initialAssets.js` and add the logo to `public/images/`.
- To change the tracked assets, update the `symbolMap` in `src/services/binanceWebSocket.js`.
