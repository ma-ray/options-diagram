'use client'

import {useState} from "react"
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

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        const data = generateData(position, type, strike, premium, contracts)
        updateGraph({id, position, type, strike, premium, contracts, time, colour, data})}
      }
      className="w-full"
    >
      <div className="flex justify-between items-center p-3 bg-white border-b-2 border-black">
        <select 
          name="position" 
          onChange={(e) => {
            setPosition(e.target.value)
            const data = generateData(position, type, strike, premium, contracts)
            updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
          }} 
        >
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <select 
          name="type" 
          onChange={(e) => {
            setType(e.target.value)
            const data = generateData(position, type, strike, premium, contracts)
            updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
        }}>
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
        <div>
          <label>Strike Price: </label>
          <input 
            type="number" min={0} 
            name="strikePrice" 
            className="text-center w-10 border-2 border-gray-400 hover:border-black rounded" 
            onChange={(e) => {
              setStrike(e.target.value ? parseInt(e.target.value) : 0)
              const data = generateData(position, type, strike, premium, contracts)
              updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
            }} 
            />
        </div>
        <div>
          <label>Option Premium: </label>
          <input 
            type="number" 
            min={0} 
            name="optionPremium" 
            className="text-center w-10 border-2 border-gray-400 hover:border-black rounded" 
            onChange={(e) => {
              setPremium(e.target.value ? parseInt(e.target.value) : 0)
              const data = generateData(position, type, strike, premium, contracts)
              updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
            }}
          />
        </div>
        <div>
          <label>Contracts: </label>
          <input 
            type="number" 
            min={0} 
            name="contracts" 
            className="text-center w-10 border-2 border-gray-400 hover:border-black rounded" 
            onChange={(e) => {
              setContracts(e.target.value ? parseInt(e.target.value) : 0)
              const data = generateData(position, type, strike, premium, contracts)
              updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
            }} />
        </div>
        <div>
          <input 
            type="color" 
            value={colour}
            className="w-[24px] bg-inherit"
            onChange={(e) => {
              setColour(e.target.value)
              const data = generateData(position, type, strike, premium, contracts)
              updateGraph({id, position, type, strike, premium, contracts, time, colour, data})
            }} />
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