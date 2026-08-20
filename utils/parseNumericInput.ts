export function parseNumericInput(text: string, fallback = 0): number {
    const normalized = text.trim().replace(",", ".")

    if (!normalized) return fallback

    const parsed = parseFloat(normalized)
    return isNaN(parsed) ? fallback : parsed
}
