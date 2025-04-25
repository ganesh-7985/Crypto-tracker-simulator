import { useEffect, useState } from "react"
import SparklineChart from "./SparklineChart"

const CryptoTableRow = ({ asset }) => {
  const [priceClass, setPriceClass] = useState("")

  useEffect(() => {
    if (asset.priceChangeDirection === "up") {
      setPriceClass("price-up")
      const timer = setTimeout(() => setPriceClass(""), 1000)
      return () => clearTimeout(timer)
    } else if (asset.priceChangeDirection === "down") {
      setPriceClass("price-down")
      const timer = setTimeout(() => setPriceClass(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [asset.price, asset.priceChangeDirection])


  const formatNumber = (num) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`
    }
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return `$${num.toLocaleString()}`
  }

  // Format price with appropriate decimal places
  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
    }
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}`
  }

  // Format percentage
  const formatPercentage = (percentage) => {
    return `${percentage > 0 ? "+" : ""}${percentage.toFixed(2)}%`
  }

  // Determine color class based on percentage
  const getPercentageColorClass = (percentage) => {
    return percentage >= 0 ? "text-green-500" : "text-red-500"
  }


  const formatSupply = (supply) => {
    if (supply === null) return "∞"
    if (supply >= 1000000000) {
      return `${(supply / 1000000000).toFixed(2)}B`
    }
    if (supply >= 1000000) {
      return `${(supply / 1000000).toFixed(2)}M`
    }
    return supply.toLocaleString()
  }

  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${priceClass}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {/* <img className="h-10 w-10 rounded-full" src={asset.logo || "/placeholder.svg"} alt={asset.name} /> */}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{asset.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
        {formatPrice(asset.price)}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${getPercentageColorClass(asset.oneHourChange)}`}
      >
        {formatPercentage(asset.oneHourChange)}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${getPercentageColorClass(asset.twentyFourHourChange)}`}
      >
        {formatPercentage(asset.twentyFourHourChange)}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${getPercentageColorClass(asset.sevenDayChange)}`}
      >
        {formatPercentage(asset.sevenDayChange)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatNumber(asset.marketCap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatNumber(asset.volume)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatSupply(asset.circulatingSupply)} {asset.symbol}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatSupply(asset.maxSupply)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <SparklineChart data={asset.sparklineData} change={asset.sevenDayChange} />
      </td>
    </tr>
  )
}

export default CryptoTableRow
