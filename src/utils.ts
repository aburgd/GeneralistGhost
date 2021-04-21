export function parseTime (input: string): number {
  const time: number = parseInt(input, 10)
  const unit: string = input.slice(-1)
  switch (unit) {
    case 'h':
      return time * 3600000
    default:
      return time * 60000
  }
}
