import { Signale } from 'signale'
import figures from 'figures'

export const logger = new Signale({
  types: {
    info: {
      badge: figures.info,
      color: 'blue',
      label: 'info'
    },

    warning: {
      badge: figures.warning,
      color: 'yellow',
      label: 'warning'
    },

    error: {
      badge: figures.cross,
      color: 'red',
      label: 'error'
    }
  }
})

export default logger

export const server = logger.scope('Server')
