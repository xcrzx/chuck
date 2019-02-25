import * as R from 'ramda'

export const ValidationErrors = {
  tooLong: 'Password should not be longer than 32 characters',
  forbiddenLetters: 'Password should not contain the letters i, O, or l',
  nonAlpha: 'Password should contain only lowercase alphabetic characters',
  noPairs: 'Password should contain two non-overlapping pairs of letters, like aa, bb, or cc.,',
  noStraight: 'Password should include straight of at least three letters, like abc, cde, and so on, up to xyz.',
}

const hasStraight = R.pipe(
  R.split(''), // 'aabc' => ['a', 'a', 'b', 'c']
  R.map(x => x.charCodeAt(0)), // ['a', 'a', 'b', 'c'] => [97, 97, 98, 99]
  R.aperture(3), // [97, 97, 98, 99] => [[97, 97, 98], [97, 98, 99]]
  R.any(x => R.equals(x, [x[0], x[0] + 1, x[0] + 2])), // Check if any sub array is sequential
)

export const validatePassword = (password: string) => {
  if (password.length > 32) {
    return ValidationErrors.tooLong
  }
  if (password.match(/[iOl]/)) {
    return ValidationErrors.forbiddenLetters
  }
  if (!password.match(/^[a-z]+$/)) {
    return ValidationErrors.nonAlpha
  }
  const pairs = password.match(/([a-z])\1/g) || []
  if (R.uniq(pairs).length < 2) {
    return ValidationErrors.noPairs
  }
  if (!hasStraight(password)) {
    return ValidationErrors.noStraight
  }
  return undefined
}
