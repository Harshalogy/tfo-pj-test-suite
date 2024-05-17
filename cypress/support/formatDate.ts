export default function formatDate(value: string) {
  var date: string = value
  var year: string = value.split(",")[2].trim()
  var month: string = value.split(",")[1].trim().split(" ")[0]
  var day: string = value
    .split(",")[1]
    .trim()
    .split(" ")[1]
    .replace(/([a-z])/g, "")
  var newDate = new Date(`${year}-${month}-${day}`)
  return (
    newDate.toLocaleDateString("en-US", { year: "numeric" }) +
    "-" +
    newDate.toLocaleDateString("en-US", { month: "2-digit" }) +
    "-" +
    newDate.toLocaleDateString("en-US", { day: "2-digit" })
  ) // 2022-07-20
}
