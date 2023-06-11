'use client'

import {useState} from "react"
import { OptionType } from "./OptionType"

type OptionProp = {
  id: string,
  updateGraph: (option: OptionType) => void
}

export default function Option({id, updateGraph}: OptionProp) {
  const [position, setPosition] = useState("long")
  const [type, setType] = useState("call")
  const [strike, setStrike] = useState(0)
  const [premium, setPremium] = useState(0)
  const [contracts, setContracts] = useState(0)

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      updateGraph({id, position, type, strike, premium, contracts})}
    }>
      <div className="flex gap-2 justify-between p-4">
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
          <input type="number" name="strikePrice" className="w-10" onChange={(e) => setStrike(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Option Premium: </label>
          <input type="number" name="optionPremium" className="w-10" onChange={(e) => setPremium(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Contracts: </label>
          <input type="number" name="contracts" className="w-10" onChange={(e) => setContracts(parseInt(e.target.value))} />
        </div>
        <button type="submit" className="bg-blue-500 px-2 align-middle">Graph</button>
      </div>
    </form>
  )
}