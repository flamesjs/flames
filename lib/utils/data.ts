export function isObject(obj) {
  return typeof obj === 'object'
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isEmptyArray(arr) {
  return isArray(arr) && arr.length === 0
}

export function isString(str) {
  return typeof str === 'string'
}

export function isEmptyString(str) {
  return isString(str) && str.length === 0
}

export function isNull(obj) {
  return obj === null
}

export function isUndefined(obj) {
  return typeof obj === 'undefined'
}

export function isEmpty(obj) {
  return isNull(obj) || isUndefined(obj)
}

export function isEmptyObject(obj) {
  return !(obj && Object.keys(obj).length > 0)
}

export function carveFromArray<T>(what: T, from: T[], isImmutable = true) {
  if (isImmutable) return from.filter((item) => item !== what)
  const index = from.indexOf(what)
  if (index >= 0) from.splice(index, 1)
  return from
}

export function noop() {}

/**
 * Delete element from array
 *
 * DANGER: This function is mutate the `array` parameter
 *
 * @param item
 * @param array
 */
export function carve<T>(item: T, array: T[]) {
  const i = array.indexOf(item)
  if (i === -1) return
  array.splice(i, 1)
}
