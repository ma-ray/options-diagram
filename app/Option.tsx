'use client'

import {useState} from "react"
import { OptionType } from "./OptionType"

type OptionProp = {
  id: string,
  updateGraph: (option: OptionType) => void,
  removeFromGraph: (id: string) => void
}

export default function Option({id, updateGraph}: OptionProp) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState("long")
  const [type, setType] = useState("call")
  const [strike, setStrike] = useState(0)
  const [premium, setPremium] = useState(0)
  const [contracts, setContracts] = useState(0)

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        updateGraph({id, position, type, strike, premium, contracts})}
      }
    >
      <div className="flex gap-2 justify-between items-center p-4">
        <select name="position" onChange={(e) => setPosition(e.target.value)}>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <select name="type" onChange={(e) => setType(e.target.value)}>
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
        <div>
          <label>Strike Price: </label>
          <input type="number" min={0} placeholder="0" name="strikePrice" className="text-center w-10" onChange={(e) => setStrike(e.target.value ? parseInt(e.target.value) : 0)} />
        </div>
        <div>
          <label>Option Premium: </label>
          <input type="number" min={0} placeholder="0" name="optionPremium" className="text-center w-10" onChange={(e) => setPremium(e.target.value ? parseInt(e.target.value) : 0)}
          />
        </div>
        <div>
          <label>Contracts: </label>
          <input type="number" min={0} placeholder="0" name="contracts" className="text-center w-10" onChange={(e) => setContracts(e.target.value ? parseInt(e.target.value) : 0)} />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 px-2 h-10 align-middle"
        >
          {visible ? "Hide" : "Show"}
        </button>
        <button className="bg-blue-500 h-10 px-2">
          X
        </button>
      </div>
    </form>
  )
}