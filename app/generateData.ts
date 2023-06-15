const generateLongCall = (x: number, premium: number, strike: number) => {
  return Math.max(x - strike, 0) - premium
}

const generateLongPut = (x: number, premium: number, strike: number) => {
  return Math.max(strike - x, 0) - premium
}

const generateShortCall = (x: number, premium: number, strike: number) => {
  return Math.min(strike - x, 0) + premium
}

const generateShortPut = (x: number, premium: number, strike: number) => {
  return Math.min(x - strike, 0) + premium
}

export default function generateData(position: string, type: string, strike: number, premium: number, contracts: number) {
  let func
  if (position === "long") {
    if (type === "call") {
      func = generateLongCall
    } else {
      func = generateLongPut
    }
  } else {
    if (type === "call") {
      func = generateShortCall
    } else {
      func = generateShortPut
    }
  }

  const data: number[][] = []

  for (let i = -1000; i < 1000; i += 0.1) {
    data.push([i, func(i, premium, strike) * contracts])
  }

  return data
}