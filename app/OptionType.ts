export type OptionType = {
  id: string,
  position: string,
  type: string,
  strike: number,
  premium: number,
  contracts: number,
  time: number,
  colour: string,
  data: number[]  // from -1000 to 1000 increments of 0.1
}
