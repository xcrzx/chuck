import { validatePassword, ValidationErrors } from '../validatePassword'

describe('validatePassword', () => {
  it('should return a validation error when the password longer than 32 characters', () => {
    expect(validatePassword('aabbcdefghjkmnopqrstuvqxyzabcdefg')).toBe(ValidationErrors.tooLong)
  })
  it('should return a validation error when password contains letters i, O, or l', () => {
    expect(validatePassword('aabbcdi')).toBe(ValidationErrors.forbiddenLetters)
    expect(validatePassword('aabbcdO')).toBe(ValidationErrors.forbiddenLetters)
    expect(validatePassword('aabbcdl')).toBe(ValidationErrors.forbiddenLetters)
  })
  it('should return a validation error when the password contains characters other than lowercase alphabetic', () => {
    expect(validatePassword('aabbcd1')).toBe(ValidationErrors.nonAlpha)
    expect(validatePassword('aabbcdZ')).toBe(ValidationErrors.nonAlpha)
  })
  it("should return a validation error when the password doesn't contain two non-overlapping pairs of letters", () => {
    expect(validatePassword('aaabcd')).toBe(ValidationErrors.noPairs)
    expect(validatePassword('aaabcdaa')).toBe(ValidationErrors.noPairs)
  })
  it("should return a validation error when the password doesn't contain straight of letters", () => {
    expect(validatePassword('aabbcc')).toBe(ValidationErrors.noStraight)
  })
  it('should return undefined if the password is correct', () => {
    expect(validatePassword('aabcc')).toBe(undefined)
  })
})
