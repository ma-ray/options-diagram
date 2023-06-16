'use client'

import {ChangeEvent, useState} from "react"
import { OptionType } from "./OptionType"
import generateData from "./generateData"

type OptionProp = {
  id: string,
  time: number,
  updateGraph: (option: OptionType) => void,
  removeFromGraph: (id: string) => void,
  darkMode: boolean
}

export default function Option({id, updateGraph, removeFromGraph, time, darkMode}: OptionProp) {
  const [position, setPosition] = useState("long")
  const [type, setType] = useState("call")
  const [strike, setStrike] = useState(0)
  const [premium, setPremium] = useState(0)
  const [contracts, setContracts] = useState(0)
  const [colour, setColour] = useState(darkMode ? '#ffffff' : '#000000')

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    switch (e.target.name) {
      case "position":
        setPosition(e.target.value)
        break;
      case "type":
        setType(e.target.value)
        break;
      case "strikePrice":
        setStrike(e.target.value ? parseInt(e.target.value) : 0)
        break;
      case "optionPremium":
        setPremium(e.target.value ? parseInt(e.target.value) : 0)
        break;
      case "contracts":
        setContracts(e.target.value ? parseInt(e.target.value) : 0)
        break;
      case "color":
        setColour(e.target.value)
        break;
    }

    const data = generateData(position, type, strike, premium, contracts)
    updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
  }

  return (
    <form className="w-full">
      <div className="flex justify-between items-center p-3 bg-white border-b-2 border-black">
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
        <div>
          <input 
            type="color" 
            name="color"
            value={colour}
            className="w-[24px] bg-inherit"
            onChange={handleChange} />
        </div>
        <button 
          className="bg-red-500 hover:bg-red-400 w-6 h-6 align-middle border border-black"
          onClick={() => {removeFromGraph(id)}}  
        >
          X
        </button>
      </div>
    </form>
  )
}