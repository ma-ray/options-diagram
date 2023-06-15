'use client'

import OptionChart from "./OptionChart"
import { useState } from "react"
import Option from "./Option"
import { OptionType } from "./OptionType"

export default function Home() {
  const [optionsList, setOptionsList] = useState<OptionType[]>([])

  const updateGraph = (option: OptionType) => {
    const newList: OptionType[] = optionsList.filter((x: OptionType) => x.id !== option.id)
    newList.push(option)
    setOptionsList(newList)
  }

  const removeFromGraph = (id: string) => {
    const newList: OptionType[] = optionsList.filter((x: OptionType) => x.id !== id)
    setOptionsList(newList)
  }

  const addOption = () => {
    const options = structuredClone(optionsList)
    options.push({
      id: crypto.randomUUID(),
      position: 'long',
      type: 'call',
      strike: 0,
      premium: 0,
      contracts: 0,
      time: Date.now(),
      colour: '#000000',
      data: []
    })
    setOptionsList(options)
  }

  return (
    <main className="flex items-center w-full h-full">
      <div className="flex flex-col items-center h-screen w-1/3">
        <div className="w-full border-b-2 border-black">
          <button className="bg-white p-2" onClick={() => {addOption()}}>
            Add Option
          </button>
          {/* <button className="bg-white p-2 mx-100">
            Plot
          </button> */}
        </div>
        {optionsList
          .sort((a, b) => (a.time < b.time) ? 1 : -1)
          .map(op => <Option key={op.id} id={op.id} time={op.time} updateGraph={updateGraph} removeFromGraph={removeFromGraph}/>)}
      </div>
      <div className="bg-white flex-1 h-screen">
        <OptionChart optionsList={optionsList} />
      </div>
    </main>
  )
}
