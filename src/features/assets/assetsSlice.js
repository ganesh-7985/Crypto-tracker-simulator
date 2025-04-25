import { createSlice } from "@reduxjs/toolkit"
import { initialAssets } from "../../data/initialAssets"

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    assets: initialAssets,
    status: "idle",
    error: null,
  },
  reducers: {
    updateAssetPrice: (state, action) => {
      const { id, newPrice, oldPrice } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.priceChangeDirection = newPrice > oldPrice ? "up" : newPrice < oldPrice ? "down" : ""
        asset.price = newPrice
      }
    },
    updateAssetPercentages: (state, action) => {
      const { id, oneHourChange, twentyFourHourChange, sevenDayChange } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.oneHourChange = oneHourChange
        asset.twentyFourHourChange = twentyFourHourChange
        asset.sevenDayChange = sevenDayChange
      }
    },
    updateAssetVolume: (state, action) => {
      const { id, volume } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.volume = volume
      }
    },
    updateSparklineData: (state, action) => {
      const { id, sparklineData } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.sparklineData = sparklineData
      }
    },
  },
})

export const { updateAssetPrice, updateAssetPercentages, updateAssetVolume, updateSparklineData } = assetsSlice.actions

// Selectors
export const selectAllAssets = (state) => state.assets.assets
export const selectAssetById = (state, assetId) => state.assets.assets.find((asset) => asset.id === assetId)

export default assetsSlice.reducer
