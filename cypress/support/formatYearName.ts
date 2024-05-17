export default function formatYearName(
  value: number | undefined,
  locale: string | undefined,
): string {
  if (locale === "ar") {
    if (!value) return ""
    if (value === 1 || value >= 11) return "عام"
    if (value === 2) return "عامَين"
    return "أعوام"
  } else {
    if (!value) return ""
    return value > 1 ? "years" : "year"
  }
}
