import { resolve } from 'path'
import { readdirSync } from 'fs'

export const requireDir = dir =>
  readdirSync(dir).map(file => require(resolve(dir, file)).default)
