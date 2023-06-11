'use client'

import { Mafs, Coordinates, Plot } from "mafs"
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
      time: Date.now()
    })
    setOptionsList(options)
  }

  const generateFunction = (num: number) => (x: number) => (x <= num) ? num : x

  return (console.log(optionsList),
    <main className="flex flex-col items-center gap-4">
      <div className="h-[500px] w-[900px]">
        <Mafs 
          viewBox={{ x: [-10, 10], y: [-2, 2] }}
        >
          <Coordinates.Cartesian />
          {optionsList.map(op => <Plot.OfX key={op.id} y={generateFunction(op.contracts)}/>)}
        </Mafs>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div>
          <button className="bg-white p-2 mx-100" onClick={() => {addOption()}}>
            Add Option
          </button>
        </div>
        {optionsList
          .sort((a, b) => (a.time < b.time) ? 1 : -1)
          .map(op => <Option key={op.id} id={op.id} time={op.time} updateGraph={updateGraph} removeFromGraph={removeFromGraph}/>)}
      </div>
    </main>
  )
}
