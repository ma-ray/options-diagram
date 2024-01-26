"use client"

import { ChangeEvent } from "react"
import { Option, OptionType, Position } from "../lib/option"
import { calculateOption } from "../lib/generateData"

type OptionProp = {
  currentOptionData: Option
  updateGraph: (option: Option) => void
  removeFromGraph: (id: string) => void
}

export default function OptionItem({
  currentOptionData,
  updateGraph,
  removeFromGraph
}: OptionProp) {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const newData = structuredClone(currentOptionData)

    switch (e.target.name) {
      case "position":
        newData.position = e.target.value as Position
        break
      case "type":
        newData.type = e.target.value as OptionType
        break
      case "strikePrice":
        newData.strike = e.target.value ? parseInt(e.target.value) : 0
        break
      case "optionPremium":
        newData.premium = e.target.value ? parseInt(e.target.value) : 0
        break
      case "contracts":
        newData.contracts = e.target.value ? parseInt(e.target.value) : 0
        break
    }

    if (e.target.name !== "color") {
      newData.data = calculateOption(newData)
    }
    updateGraph(newData)
  }

  return (
    <div className="w-full flex justify-between items-center p-3 bg-white border-b-2 border-black">
      <select name="position" onChange={handleChange}>
        <option value={Position.Long}>Long</option>
        <option value={Position.Short}>Short</option>
      </select>
      <select name="type" onChange={handleChange}>
        <option value={OptionType.Call}>Call</option>
        <option value={OptionType.Put}>Put</option>
      </select>
      <div>
        <label>Strike Price: </label>
        <input
          type="number"
          min={0}
          name="strikePrice"
          className="text-center w-10 border-2 border-gray-400 hover:border-black rounded"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Option Premium: </label>
        <input
          type="number"
          min={0}
          name="optionPremium"
          className="text-center w-10 border-2 border-gray-400 hover:border-black rounded"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contracts: </label>
        <input
          type="number"
          min={0}
          name="contracts"
          className="text-center w-10 border-2 border-gray-400 hover:border-black rounded"
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-red-500 hover:bg-red-400 w-6 h-6 align-middle border border-black"
        onClick={() => {
          removeFromGraph(currentOptionData.id)
        }}
      >
        X
      </button>
    </div>
  )
}
