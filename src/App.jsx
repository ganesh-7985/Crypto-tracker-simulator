"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startWebSocketSimulation, stopWebSocketSimulation } from "./services/webSocketSimulation"
import { selectAllAssets } from "./features/assets/assetsSlice"
import CryptoTable from "./components/CryptoTable"
import Header from "./components/Header"

function App() {
  const dispatch = useDispatch()
  const assets = useSelector(selectAllAssets)

  useEffect(() => {
    // Start the WebSocket simulation when the component mounts
    startWebSocketSimulation(dispatch)

    // Clean up the WebSocket simulation when the component unmounts
    return () => {
      stopWebSocketSimulation()
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Market Overview</h2>
          <CryptoTable assets={assets} />
        </div>
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
        <p>Crypto Tracker</p>
      </footer>
    </div>
  )
}

export default App
