import assert from 'assert'
import {
  getRequiredPNGImageSizes,
  filterSizes,
  filterImagesBySizes
} from './image-size'
import { REQUIRED_IMAGE_SIZES as REQUIRED_FAV_SIZES } from './favicon'
import { REQUIRED_IMAGE_SIZES as REQUIRED_ICNS_SIZES } from './icns'
import { REQUIRED_IMAGE_SIZES as REQUIRED_ICO_SIZES } from './ico'

describe('Image size', () => {
  describe('getRequiredPNGImageSizes', () => {
    it('All', () => {
      let actual = getRequiredPNGImageSizes({
        ico: {},
        icns: {},
        favicon: {},
        report: false
      })
      let expected = [
        16,
        24,
        32,
        48,
        57,
        64,
        72,
        96,
        120,
        128,
        144,
        152,
        195,
        228,
        256,
        512,
        1024
      ]
      assert.deepStrictEqual(actual, expected)
    })
  
    it('All with filter', () => {
      let actual = getRequiredPNGImageSizes({
        ico: { sizes: [256] },
        icns: { sizes: [512] },
        favicon: {},
        report: false
      })
      let expected = [
        16,
        24,
        32,
        48,
        57,
        64,
        72,
        96,
        120,
        128,
        144,
        152,
        195,
        228,
        256,
        512
      ]
      assert.deepStrictEqual(actual, expected)
    })
  
    it('ICO', () => {
      let actual = getRequiredPNGImageSizes({ ico: {}, report: false })
      assert.deepStrictEqual(actual, REQUIRED_ICO_SIZES)
    })
  
    it('ICO with filter', () => {
      let actual = getRequiredPNGImageSizes({
        ico: { sizes: [16, 32, 64] },
        report: false
      })
      let expected = [16, 32, 64]
      assert.deepStrictEqual(actual, expected)
    })
  
    it('ICNS', () => {
      let actual = getRequiredPNGImageSizes({ icns: {}, report: false })
      assert.deepStrictEqual(actual, REQUIRED_ICNS_SIZES)
    })
  
    it('ICNS with filter', () => {
      let actual = getRequiredPNGImageSizes({
        icns: { sizes: [16, 1024] },
        report: false
      })
      let expected = [16, 1024]
      assert.deepStrictEqual(actual, expected)
    })
  
    it('Favicon', () => {
      let actual = getRequiredPNGImageSizes({ favicon: {}, report: false })
      assert.deepStrictEqual(actual, REQUIRED_FAV_SIZES)
    })
  })
  
  describe('filterSizes', () => {
    it('Filter', () => {
      const actual = filterSizes(REQUIRED_ICNS_SIZES, [16, 18, 32, 64])
      const expected = [16, 32, 64]
      assert.deepStrictEqual(actual, expected)
    })
  
    it('No filter', () => {
      const actual = filterSizes(REQUIRED_ICNS_SIZES)
      const expected = [16, 32, 64, 128, 256, 512, 1024]
      assert.deepStrictEqual(actual, expected)
    })
  })
  
  describe('filterImagesBySizes', () => {
    it('Filter', () => {
      const targets = getRequiredPNGImageSizes({ report: false }).map((size) => {
        return { size, filePath: '' }
      })
  
      let expected = filterImagesBySizes(targets, REQUIRED_ICO_SIZES)
      assert(expected.length === REQUIRED_ICO_SIZES.length)
  
      expected = filterImagesBySizes(targets, REQUIRED_ICNS_SIZES)
      assert(expected.length === REQUIRED_ICNS_SIZES.length)
  
      expected = filterImagesBySizes(targets, REQUIRED_FAV_SIZES)
      assert(expected.length === REQUIRED_FAV_SIZES.length)
    })
  })
})
