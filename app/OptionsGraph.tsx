'use client'

import { Mafs, Coordinates, Plot, Line } from "mafs"

export default function OptionsGraph() {
  return (
    <Mafs
      zoom={{ min: 0.01, max: 1 }}
      viewBox={{ x: [-10, 10], y: [-2, 2] }}
    >
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) =>{
        if (x <= 2) return 2
        return x
      }} />
    </Mafs>
  )
}
