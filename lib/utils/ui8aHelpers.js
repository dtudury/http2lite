function _noundef (value) {
  if (value === undefined) {
    throw new Error('value must not be undefined')
  }
  return value
}
/**
 * @param {Number} size
 * @returns {Uint8Array}
 */
function alloc (size) {
  return (new Uint8Array(size)).fill(0)
}

/**
 * @param {Number} size
 * @returns {Uint8Array}
 */
function allocUnsafe (size) {
  return new Uint8Array(size)
}

/**
 * @param {Uint8Array} ui8a
 * @param {Number} offset
 * @returns {Number}
 */
function readUInt8 (ui8a, offset) {
  return _noundef(ui8a[offset])
}

/**
 * @param {Uint8Array} ui8a
 * @param {Number} offset
 * @returns {Number}
 */
function readUInt24BE (ui8a, offset) {
  return (_noundef(ui8a[offset]) << 16 | _noundef(ui8a[offset + 1]) << 8 | _noundef(ui8a[offset + 2])) >>> 0
}

/**
 * @param {Uint8Array} ui8a
 * @param {Number} offset
 * @returns {Number}
 */
function readUInt32BE (ui8a, offset) {
  return (_noundef(ui8a[offset] << 24) | _noundef(ui8a[offset + 1]) << 16 | _noundef(ui8a[offset + 2]) << 8 | _noundef(ui8a[offset + 3])) >>> 0
}

/**
 * @param {Uint8Array} ui8a
 * @param {Number} value
 * @param {Number} offset
 */
function writeUInt8 (ui8a, value, offset) {
  ui8a[offset] = value
}

/**
 * @param {Uint8Array} ui8a
 * @param {Number} value
 * @param {Number} offset
 */
function writeUInt24BE (ui8a, value, offset) {
  ui8a.set([value >>> 16 & 0xff, value >>> 8 & 0xff, value & 0xff], offset)
}

/**
 * @param {Uint8Array} ui8a
 * @param {Number} value
 * @param {Number} offset
 */
function writeUInt32BE (ui8a, value, offset) {
  ui8a.set([value >>> 24 & 0xff, value >>> 16 & 0xff, value >>> 8 & 0xff, value & 0xff], offset)
}

/**
 * @param {Array.<Uint8Array>} ui8as
 * @returns {Uint8Array}
 */
function concat (ui8as) {
  const ui8a = new Uint8Array(ui8as.reduce((sum, ui8a) => sum + ui8a.length, 0))
  let offset = 0
  ui8as.forEach(chunk => {
    ui8a.set(chunk, offset)
    offset += chunk.length
  })
  return ui8a
}

function ui8aFromString (string) {
  return new Uint8Array(string.split('').map(char => char.charCodeAt(0)))
}

function stringFromUi8a (ui8a) {
  return String.fromCharCode.apply(null, new Uint8Array(ui8a))
}

exports.alloc = alloc
exports.allocUnsafe = allocUnsafe
exports.readUInt8 = readUInt8
exports.readUInt24BE = readUInt24BE
exports.readUInt32BE = readUInt32BE
exports.writeUInt8 = writeUInt8
exports.writeUInt24BE = writeUInt24BE
exports.writeUInt32BE = writeUInt32BE
exports.concat = concat
exports.ui8aFromString = ui8aFromString
exports.stringFromUi8a = stringFromUi8a
