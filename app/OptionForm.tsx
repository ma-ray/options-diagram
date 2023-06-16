'use client'

import { useState, useEffect } from "react";
import { OptionType } from "./OptionType";
import Option from "./Option";

type OptionFormProp = {
  setOptions: (optionsArray: OptionType[]) => void
}

export default function OptionForm({setOptions}: OptionFormProp) {
  const [optionsList, setOptionsList] = useState<OptionType[]>([])

  useEffect(() => {
    setOptions(optionsList)}, [optionsList])

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
      colour: "#FFFFFF",
      data: []
    })
    setOptionsList(options)
  }

  return (
    <div className="flex flex-col items-center h-screen w-1/3 overflow-auto">
    <div className="w-full border-b-2 border-black">
      <button className="bg-white p-2 font-semibold hover:bg-slate-200 border-black border-r-2" onClick={() => {addOption()}}>
        Add Option
      </button>
    </div>
    {optionsList
      .sort((a, b) => (a.time < b.time) ? 1 : -1)
      .map(op => 
        <Option 
          key={op.id} 
          id={op.id} 
          time={op.time} 
          updateGraph={updateGraph} 
          removeFromGraph={removeFromGraph}
        />)}
  </div>
  )
}