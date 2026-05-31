const REVIEW_VALUE = "needs verification";

export function isReviewValue(value: unknown) {
  return typeof value === "string" && value.trim().toLowerCase() === REVIEW_VALUE;
}

export function displayText(value: string | undefined, fallback = "Check in game") {
  if (!value || isReviewValue(value)) {
    return fallback;
  }

  return value;
}

export function displayGold(value: number | string | undefined, fallback = "Check in game") {
  return typeof value === "number" ? `${value}g` : displayText(value, fallback);
}

export function displayDays(value: number | string | undefined, fallback = "Check timing") {
  return typeof value === "number" ? `${value} days` : displayText(value, fallback);
}

export function displayList(value: string[] | string | undefined, fallback = "Check in game") {
  if (Array.isArray(value)) {
    const visibleValues = value.filter((item) => !isReviewValue(item));
    return visibleValues.length > 0 ? visibleValues.join(", ") : fallback;
  }

  return displayText(value, fallback);
}

export function displayTags(values: string[] | undefined, fallback = "Check in game") {
  const visibleValues = (values ?? []).filter((item) => !isReviewValue(item));
  return visibleValues.length > 0 ? visibleValues : [fallback];
}
