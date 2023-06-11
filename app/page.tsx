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
    const newList: OptionType[] = optionsList.filter((x: OptionType) => x.id !== x.id)
    setOptionsList(newList)
  }

  const generateFunction = (num: number) => (x: number) => (x <= num) ? num : x

  return (
    <main className="flex flex-col items-center gap-4">
      <div className="h-[500px] w-[900px]">
        <Mafs 
          viewBox={{ x: [-10, 10], y: [-2, 2] }}
        >
          <Coordinates.Cartesian />
          {optionsList.map(op => <Plot.OfX y={generateFunction(op.contracts)}/>)}
        </Mafs>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <button className="bg-white p-2 mx-100">
            Add Option
          </button>
        </div>

        <Option 
          id={'bob'} 
          updateGraph={updateGraph}
          removeFromGraph={removeFromGraph}
        />
      </div>
    </main>
  )
}
