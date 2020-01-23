/**
 * .................................... WEBSTORAGE ........................................
 */

export function readFromWebStorage(key: string) {
  const data = window.localStorage.getItem(key);

  return data === 'null' ? null : data;
}

/**
 * Read more than one value. Output can either be an array of values or an object with
 * key-value pairings
 *
 * @param {Array<Object>} array An Array of keys
 * @param {boolean} returnAsObject A flag for whether the output must be an object or simply an
 * array of values
 */
export function multiReadFromWebStorage(
  array: Array<Object>,
  returnAsObject?: boolean = false,
) {
  const values = [];
  const keyValue = {};

  for (let i = 0, length = array.length; i < length; i++) {
    const key = array[i].toString();
    const value = this.readFromWebStorage(key);

    values.push(value);
    keyValue[key] = value;
  }

  return returnAsObject ? keyValue : values;
}

export function saveToWebStorage(key: string, value: ?string): void {
  window.localStorage.setItem(key, value);
}

export function multiSaveToWebStorage(objects: Array<Object>): void {
  for (let i = 0, length = objects.length; i < length; i++) {
    const saveObject = objects[i];

    this.saveToWebStorage(saveObject.name, saveObject.value);
  }
}

export function deleteFromWebStorage(key: string): void {
  window.localStorage.removeItem(key);
}

export function clearWebStorage(): void {
  window.localStorage.clear();
}
