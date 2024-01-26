"use client"

import { Option } from "./option"
import OptionItem from "./OptionItem"

type OptionFormProp = {
  optionsList: Option[]
  addOption: () => void
  updateGraph: (option: Option) => void
  removeFromGraph: (id: string) => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function OptionForm({
  optionsList,
  addOption,
  updateGraph,
  removeFromGraph,
  darkMode,
  toggleDarkMode
}: OptionFormProp) {
  return (
    <div className="flex flex-col items-center h-screen w-1/3 overflow-auto border-black border-r-2">
      <div className="flex w-full border-b-2 border-black">
        <div className="flex-1 text-xl font-bold p-1">Options Diagram</div>
        <button
          className="hover:bg-slate-200 border-l-2 px-2 text-center border-black"
          onClick={() => {
            toggleDarkMode()
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button
          className="bg-white p-2 font-semibold hover:bg-slate-200 border-black border-l-2"
          onClick={() => {
            addOption()
          }}
        >
          Add Option
        </button>
      </div>
      {optionsList
        .sort((a, b) => (a.time < b.time ? 1 : -1))
        .map((op) => (
          <OptionItem
            key={op.id}
            currentOptionData={op}
            updateGraph={updateGraph}
            removeFromGraph={removeFromGraph}
            darkMode={darkMode}
          />
        ))}
    </div>
  )
}
