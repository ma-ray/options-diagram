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

export function generateData(position: string, type: string, strike: number, premium: number, contracts: number) {
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

  const data: number[] = []

  for (let i = -1000; i < 1000; i += 0.1) {
    data.push(func(i, premium, strike) * contracts)
  }

  return data
}

export function generateResult(dataLists: number[][]){
  console.log(dataLists)
  const numLists = dataLists.length
  const result = [];

  let idx = 0
  for (let i = -1000; i < 1000; i += 0.1) {
    let sum = 0;
    for (let j = 0; j < numLists; j++) {
      sum += dataLists[j][idx];
    }
    result.push([i, sum]);
    idx++
  }
  return result
}