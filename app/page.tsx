'use client'

import OptionChart from "./OptionChart"
import { useState } from "react"
import { OptionType } from "./OptionType"
import OptionForm from "./OptionForm"
import { generateResult } from "./generateData"

export default function Home() {
  const [optionsList, setOptionsList] = useState<OptionType[]>([])
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const updateGraph = (option: OptionType) => {
    const newList = optionsList.filter(x => x.id !== option.id)
    newList.push(option)
    setOptionsList(newList)
  }

  const removeFromGraph = (id: string) => {
    const newList = optionsList.filter(x => x.id !== id)
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
      data: Array(1000/0.1).fill(0)
    })
    setOptionsList(options)
  }

  return (
    <main className="flex items-center w-full h-full">
      <OptionForm optionsList={optionsList} addOption={addOption} updateGraph={updateGraph} removeFromGraph={removeFromGraph} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="bg-white flex-1 h-screen">
        <OptionChart resultList={generateResult(optionsList.map(op => op.data))} darkMode={darkMode}/>
      </div>
    </main>
  )
}
