
const generateLongCall = (x: number, premium: number, strike: number, contracts: number) => {
  if (x <= strike) {
    return -premium * contracts
  } else {
    return (x - strike - premium) * contracts
  }
}

export default function generateData(position: string, type: string, strike: number, premium: number, contracts: number) {
  const data: number[][] = []

  for (let i = -1000; i < 1000; i += 0.1) {
    data.push([i, generateLongCall(i, premium, strike, contracts)])
  }

  return data
}