'use client'

import OptionChart from "./OptionChart"
import { useState } from "react"
import { OptionType } from "./OptionType"
import OptionForm from "./OptionForm"

export default function Home() {
  const [optionsList, setOptionsList] = useState<OptionType[]>([])

  const updateOption = (optionsArray: OptionType[]) => {
    setOptionsList(optionsArray)
  }

  return (
    <main className="flex items-center w-full h-full">
      <OptionForm setOptions={updateOption} />
      <div className="bg-white flex-1 h-screen">
        <OptionChart optionsList={optionsList} />
      </div>
    </main>
  )
}
