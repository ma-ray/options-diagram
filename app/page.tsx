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

  const generateFunction = (num: number) => (x: number) => (x <= num) ? num : x

  return (
    <main className="flex flex-col items-center justify-between gap-4">
      <Mafs 
        viewBox={{ x: [-10, 10], y: [-2, 2] }}
        width={1000}
        height={600}
      >
        <Coordinates.Cartesian />
        {optionsList.map(op => <Plot.OfX y={generateFunction(op.contracts)}/>)}
      </Mafs>
      <div className="bg-red-500">
        <Option id={crypto.randomUUID()} updateGraph={updateGraph}/>
      </div>
    </main>
  )
}
