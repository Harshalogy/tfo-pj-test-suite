export default function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Number(value))
}

export function formatCurrencyWithoutSymbol(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Number(value))
}

export function formatCurrencyWithCommas(value: string) {
  const amount = parseInt(value.replace(/\D/g, ""))
  return amount
    ? new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(amount)
    : ""
}
