/* globals describe it */
const { decodeInteger, encodeInteger, decodeHuffman, encodeHuffman, decodeStringLiteral, encodeStringLiteral, decodeHeader, encodeHeader } = require('../lib/utils/codecs')
const { INDEXED, INCREMENTAL, SIZE_UPDATE, NOT_INDEXED, NEVER_INDEXED } = require('../lib/constants')
const { expect } = require('chai')

function ui8aFromString (string) {
  return new Uint8Array(string.split('').map(char => char.charCodeAt(0)))
}

describe('HPackLite.utils', () => {
  describe('decodeInteger', () => {
    it('reads smallish integers', () => {
      expect(decodeInteger(new Uint8Array([0x0a]), 3).value).to.equal(10)
    })
    it('reads smallish integers ignoring bits before start', () => {
      expect(decodeInteger(new Uint8Array([0x8a]), 3).value).to.equal(10)
      expect(decodeInteger(new Uint8Array([0xca]), 3).value).to.equal(10)
      expect(decodeInteger(new Uint8Array([0xea]), 3).value).to.equal(10)
    })
    it('reads smallish integers ignoring bytes after end', () => {
      expect(decodeInteger(new Uint8Array([0x0a, 0xff]), 3).value).to.equal(10)
    })
    it('reads largeish integers', () => {
      expect(decodeInteger(new Uint8Array([0x1f, 0x9a, 0x0a]), 3).value).to.equal(1337)
    })
    it('reads largeish integers ignoring bits before start', () => {
      expect(decodeInteger(new Uint8Array([0xff, 0x9a, 0x0a]), 3).value).to.equal(1337)
    })
    it('reads largeish integers ignoring bytes after end', () => {
      expect(decodeInteger(new Uint8Array([0xff, 0x9a, 0x0a, 0xff]), 3).value).to.equal(1337)
    })
    it('throws if it runs out of ui8a', () => {
      expect(() => {
        decodeInteger(new Uint8Array([0xff, 0xff, 0xff]), 3)
      }).to.throw()
    })
  })
  describe('encodeInteger', () => {
    it('writes smallish integers', () => {
      expect(encodeInteger(0xe0, 3, 10)).to.deep.equal(new Uint8Array([0xea]))
    })
    it('writes largeish integers', () => {
      expect(encodeInteger(0xe0, 3, 1337)).to.deep.equal(new Uint8Array([0xff, 0x9a, 0x0a]))
    })
    it('writes smallish integers on octet boundaries', () => {
      expect(encodeInteger(0x0, 0, 42)).to.deep.equal(new Uint8Array([0x2a]))
    })
    it('throws when you pass it an integer bigger than it\'s mask', () => {
      expect(() => encodeInteger(0xff, 3, 0)).to.throw()
    })
  })
  describe('encode/decode huffman', () => {
    it('decodes strings it encodes', () => {
      const bytes = []
      for (let i = 0; i <= 0xff; i++) {
        bytes.push(i)
      }
      for (let i = 0; i <= 1000; i++) {
        bytes.push(i % 256)
      }
      for (let i = 0; i < 8; i++) {
        bytes.push(i)
        const ui8a = new Uint8Array(bytes)
        const encoded = encodeHuffman(ui8a)
        const decoded = decodeHuffman(encoded)
        expect(decoded).to.deep.equal(ui8a)
      }
    })
  })
  describe('encode/decode StringLiteral', () => {
    it('decodes strings it encodes', () => {
      const a = ui8aFromString('hello ')
      const encoded = encodeStringLiteral(false, a)
      const decoded = decodeStringLiteral(encoded)
      expect(a).to.deep.equal(decoded.stringLiteral)
      expect(decoded.isHuffmanEncoded).to.equal(false)
      const encodedHuffman = encodeStringLiteral(true, a)
      const decodedHuffman = decodeStringLiteral(encodedHuffman)
      expect(a).to.deep.equal(decodedHuffman.stringLiteral)
      expect(decodedHuffman.isHuffmanEncoded).to.equal(true)
    })
  })
  describe('encode/decode Header', () => {
    const name = ui8aFromString('name')
    const value = ui8aFromString('value')
    const encodedName = encodeStringLiteral(false, name)
    const encodedValue = encodeStringLiteral(false, value)
    it('decodes indexed headers', () => {
      const encodedHeader = encodeHeader(INDEXED, 7)
      const decodedHeader = decodeHeader(encodedHeader)
      expect(decodedHeader.index).to.deep.equal(7)
      expect(decodedHeader.kind).to.deep.equal(INDEXED)
    })
    it('decodes incremental name/value pairs it encodes', () => {
      const encodedHeader = encodeHeader(INCREMENTAL, 0, encodedName, encodedValue)
      const decodedHeader = decodeHeader(encodedHeader)
      expect(decodedHeader.name.stringLiteral).to.deep.equal(name)
      expect(decodedHeader.value.stringLiteral).to.deep.equal(value)
      expect(decodedHeader.kind).to.deep.equal(INCREMENTAL)
    })
    it('decodes incremental indexed name/vale pairs it encodes', () => {
      const encodedHeader = encodeHeader(INCREMENTAL, 7, encodedValue)
      const decodedHeader = decodeHeader(encodedHeader)
      expect(decodedHeader.index).to.deep.equal(7)
      expect(decodedHeader.name).to.equal(undefined)
      expect(decodedHeader.value.stringLiteral).to.deep.equal(value)
      expect(decodedHeader.kind).to.deep.equal(INCREMENTAL)
    })
    it('decodes never indexed name/value pairs it encodes', () => {
      const encodedHeader = encodeHeader(NEVER_INDEXED, 0, encodedName, encodedValue)
      const decodedHeader = decodeHeader(encodedHeader)
      expect(decodedHeader.name.stringLiteral).to.deep.equal(name)
      expect(decodedHeader.value.stringLiteral).to.deep.equal(value)
      expect(decodedHeader.kind).to.deep.equal(NEVER_INDEXED)
    })
    it('decodes not indexed name/value pairs it encodes', () => {
      const encodedHeader = encodeHeader(NOT_INDEXED, 0, encodedName, encodedValue)
      const decodedHeader = decodeHeader(encodedHeader)
      expect(decodedHeader.name.stringLiteral).to.deep.equal(name)
      expect(decodedHeader.value.stringLiteral).to.deep.equal(value)
      expect(decodedHeader.kind).to.deep.equal(NOT_INDEXED)
    })
    it('decodes size update headers', () => {
      const encodedHeader = encodeHeader(SIZE_UPDATE, 7)
      const decodedHeader = decodeHeader(encodedHeader)
      expect(decodedHeader.maxSize).to.deep.equal(7)
      expect(decodedHeader.kind).to.deep.equal(SIZE_UPDATE)
    })
    it('throws on unknown header kinds', () => {
      expect(() => encodeHeader(1)).to.throw()
    })
  })
})
