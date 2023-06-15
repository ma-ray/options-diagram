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
    <main className="flex flex-col items-center gap-4">
      <div className="h-[500px] w-[900px] bg-white">
        <OptionChart optionsList={optionsList} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <button className="bg-white p-2 mx-100" onClick={() => {addOption()}}>
          Add Option
        </button>
        {optionsList
          .sort((a, b) => (a.time < b.time) ? 1 : -1)
          .map(op => <Option key={op.id} id={op.id} time={op.time} updateGraph={updateGraph} removeFromGraph={removeFromGraph}/>)}
      </div>
    </main>
  )
}
