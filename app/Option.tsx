'use client'

import {ChangeEvent} from "react"
import { OptionType } from "./OptionType"
import { generateData } from "./generateData"

type OptionProp = {
  currentOptionData: OptionType,
  updateGraph: (option: OptionType) => void,
  removeFromGraph: (id: string) => void,
  darkMode: boolean
}

export default function Option({currentOptionData, updateGraph, removeFromGraph, darkMode}: OptionProp) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newData = structuredClone(currentOptionData)

    switch (e.target.name) {
      case "position":
        newData.position = e.target.value
        break;
      case "type":
        newData.type = e.target.value
        break;
      case "strikePrice":
        newData.strike = e.target.value ? parseInt(e.target.value) : 0
        break;
      case "optionPremium":
        newData.premium = e.target.value ? parseInt(e.target.value) : 0
        break;
      case "contracts":
        newData.contracts = e.target.value ? parseInt(e.target.value) : 0
        break;
      case "color":
        newData.colour = e.target.value
        break;
    }

    if (e.target.name !== "color") {
      newData.data = generateData(newData.position, newData.type, newData.strike, newData.premium, newData.contracts)
    }
    updateGraph(newData)
  }

  return (
    <div className="w-full flex justify-between items-center p-3 bg-white border-b-2 border-black">
      <select 
        name="position" 
        onChange={handleChange} 
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
      <select 
        name="type" 
        onChange={handleChange}>
        <option value="call">Call</option>
        <option value="put">Put</option>
      </select>
      <div>
        <label>Strike Price: </label>
        <input 
          type="number" min={0} 
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
          onChange={handleChange} />
      </div>
      {/* <div>
        <select name="color" onChange={handleChange}>
          <option value="#000000">Black</option>
          <option value="#ffffff">White</option>
          <option value="#ff0000">Red</option>
          <option value="#0000ff">Blue</option>
          <option value="#008000">Green</option>
          <option value="#ffff00">Yellow</option>
          <option value="#ff8c00">Orange</option>
        </select>
      </div> */}
      <button 
        className="bg-red-500 hover:bg-red-400 w-6 h-6 align-middle border border-black"
        onClick={() => {removeFromGraph(currentOptionData.id)}}  
      >
        X
      </button>
    </div>
  )
}