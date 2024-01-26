export type Option = {
  id: string
  position: Position
  type: OptionType
  strike: number
  premium: number
  contracts: number
  time: number
  data: number[]
}

export enum Position {
  Long = "LONG",
  Short = "SHORT"
}

export enum OptionType {
  Call = "CALL",
  Put = "PUT"
}
