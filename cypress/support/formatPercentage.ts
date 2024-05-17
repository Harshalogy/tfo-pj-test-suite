export default function formatPercentage(value: number) {
  return new Intl.NumberFormat("en-US", { style: "percent" }).format(value)
}
