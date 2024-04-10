import { isElem, toInt } from '../'

/**
 * Get the width of the given HTML element.
 */
export default function getElemWidth(elem: HTMLElement): number {
  return isElem(elem) ? toInt(getComputedStyle(elem).width.split('px')[0]) : 0
}