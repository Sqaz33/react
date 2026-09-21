export const PRIORITY_LABELS = {
  low: "низкий",
  normal: "средний",
  high: "высокий"
}

export function getNextPriority(priority) {
  if (priority === "low") return "normal"
  if (priority === "normal") return "high"
  return "low"
}