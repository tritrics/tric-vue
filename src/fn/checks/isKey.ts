import { getKeys, inArr } from '../'

/**
 * Check, if a given key is pressed.
 */
export default function isKey(Event: KeyboardEvent, key: string, strict: boolean = true): boolean {
  const keys = getKeys(Event, true, true, true, true)
  if (!strict) {
    return inArr(key.split('-'), keys)
  }
  return key === keys.join('-')
}