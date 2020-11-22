const colors = {
  // gray
  gray_heavy: '#222431',
  gray_dark: '#282a37',
  gray: '#7a7c84',
  gray_light: '#d5d6db',

  // blue
  blue: '#0372eb',
  blue_light: '#09c0fb',

  // green
  green: '#aceb10',

  // red
  red: '#e35a10',

  // gradient
  black_to_gray: `
  linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(54, 56, 71, 1) 0%,
    rgba(40, 43, 59, 1) 100%
  )`,
  green_to_green: `linear-gradient(
    90deg,
    rgba(175,232,28,1) 0%,
    rgba(102,181,13,1) 100%
  )`,

  // shadow
  shadow: `
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12)
  `,
}

export default colors
