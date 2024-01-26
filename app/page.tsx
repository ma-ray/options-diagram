"use client"

import { useState } from "react"
import { Option, OptionType, Position } from "./lib/option"
import OptionForm from "./components/OptionForm"
import OptionChart from "./components/OptionChart"
import { calculateResult } from "./lib/generate-data"

export default function Home() {
  const [optionsList, setOptionsList] = useState<Option[]>([])
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const updateGraph = (option: Option) => {
    const newList = optionsList.filter((x) => x.id !== option.id)
    newList.push(option)
    setOptionsList(newList)
  }

  const removeFromGraph = (id: string) => {
    const newList = optionsList.filter((x) => x.id !== id)
    setOptionsList(newList)
  }

  const addOption = () => {
    const options = structuredClone(optionsList)
    options.push({
      id: crypto.randomUUID(),
      position: Position.Long,
      type: OptionType.Call,
      strike: 0,
      premium: 0,
      contracts: 0,
      time: Date.now(),
      data: Array(1000 / 0.1).fill(0)
    })
    setOptionsList(options)
  }

  return (
    <main className="flex items-center w-full h-full">
      <OptionForm
        optionsList={optionsList}
        addOption={addOption}
        updateGraph={updateGraph}
        removeFromGraph={removeFromGraph}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="bg-white flex-1 h-screen">
        <OptionChart
          resultList={calculateResult(optionsList.map((op) => op.data))}
          darkMode={darkMode}
        />
      </div>
    </main>
  )
}
