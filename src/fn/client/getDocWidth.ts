/**
 * Get the HTML's document width (including invisible parts).
 */
export default function getDocWidth(): number {
  return Math.max(
    document.documentElement['clientWidth'],
    document.body['scrollWidth'],
    document.documentElement['scrollWidth'],
    document.body['offsetWidth'],
    document.documentElement['offsetWidth']
  )
}