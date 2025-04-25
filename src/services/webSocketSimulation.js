import {
  updateAssetPrice,
  updateAssetPercentages,
  updateAssetVolume,
  updateSparklineData,
} from "../features/assets/assetsSlice"
import { initialAssets } from "../data/initialAssets"

let intervalId = null

// Helper function to generate random number within a range
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min
}

// Helper function to generate random percentage change
const getRandomPercentageChange = (baseValue, maxChange) => {
  return baseValue + getRandomNumber(-maxChange, maxChange)
}

// Helper function to update sparkline data
const updateSparkline = (currentData, newPrice) => {
  const newData = [...currentData.slice(1), newPrice]
  return newData
}

export const startWebSocketSimulation = (dispatch) => {
  if (intervalId) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(() => {
    // Randomly select an asset to update
    const assetIndex = Math.floor(Math.random() * initialAssets.length)
    const asset = initialAssets[assetIndex]

    // Update price (random fluctuation within 2%)
    const oldPrice = asset.price
    const priceChangePercent = getRandomNumber(-0.02, 0.02)
    const newPrice = oldPrice * (1 + priceChangePercent)

    dispatch(
      updateAssetPrice({
        id: asset.id,
        oldPrice,
        newPrice: Number.parseFloat(newPrice.toFixed(2)),
      }),
    )

    // Update sparkline data
    const newSparklineData = updateSparkline(asset.sparklineData, newPrice)
    dispatch(
      updateSparklineData({
        id: asset.id,
        sparklineData: newSparklineData,
      }),
    )

    // Randomly update percentages (1 in 3 chance)
    if (Math.random() < 0.33) {
      dispatch(
        updateAssetPercentages({
          id: asset.id,
          oneHourChange: getRandomPercentageChange(asset.oneHourChange, 0.5),
          twentyFourHourChange: getRandomPercentageChange(asset.twentyFourHourChange, 0.8),
          sevenDayChange: getRandomPercentageChange(asset.sevenDayChange, 0.3),
        }),
      )
    }

    // Randomly update volume (1 in 4 chance)
    if (Math.random() < 0.25) {
      const volumeChange = getRandomNumber(-0.05, 0.05)
      dispatch(
        updateAssetVolume({
          id: asset.id,
          volume: asset.volume * (1 + volumeChange),
        }),
      )
    }
  }, 1500) // Update every 1.5 seconds
}

export const stopWebSocketSimulation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}
