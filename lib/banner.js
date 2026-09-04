import chalk from 'chalk'

const WORDMARK = [
  '██╗    ██╗███████╗██████╗ ',
  '██║    ██║██╔════╝██╔══██╗',
  '██║ █╗ ██║█████╗  ██████╔╝',
  '██║███╗██║██╔══╝  ██╔══██╗',
  '╚███╔███╔╝███████╗██████╔╝',
  ' ╚══╝╚══╝ ╚══════╝╚═════╝ ',
]

const SUBTITLE = 'Web Scaffolder — runnable, tested, agent-ready foundations'

function plain() {
  return [...WORDMARK, '', `Web Scaffolder`, SUBTITLE].join('\n')
}

function colored() {
  const wordmark = WORDMARK.map((line) => chalk.bold.cyan(line)).join('\n')
  return `${wordmark}\n\n${chalk.bold.white('Web Scaffolder')}\n${chalk.gray(SUBTITLE)}`
}

export function scaffolderBanner() {
  const noColor = process.env.NO_COLOR !== undefined || process.env.FORCE_COLOR === '0'
  const isTTY = process.stdout.isTTY
  const width = process.stdout.columns || 80

  if (!isTTY || width < 80 || noColor) {
    if (width < 60) return 'WEB SCAFFOLDER'
    return plain()
  }

  return colored()
}

export const bannerRaw = plain()
export const WORDMARK_ART = WORDMARK.join('\n')
