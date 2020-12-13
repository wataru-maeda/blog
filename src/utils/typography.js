import Typography from 'typography'
import JapaneseTypography from 'typography-theme-japanese-tofu'

JapaneseTypography.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: 'var(--textLink)',
    },
    'a.anchor': {
      boxShadow: 'none',
    },
    'a.anchor svg[aria-hidden="true"]': {
      stroke: 'var(--textLink)',
    },
    h2: {
      display: 'inline-block',
      borderLeft: '0.4rem solid var(--textLink)',
      color: 'var(--h2)',
      padding: '1rem !important',
      background: 'rgba(255, 255, 255, .1)',
      width: '100%',
    },
    h3: {
      color: 'var(--h3)',
    },
    blockquote: {
      color: 'var(--blockquote)',
    },
    hr: {
      background: 'var(--hr)',
    },
    'span.grvsc-source': {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }
}

// delete Wordpress2016.googleFonts

const typography = new Typography(JapaneseTypography)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const { rhythm } = typography
export const { scale } = typography
