import { createServerFn } from '@tanstack/react-start'
import { goatIdSchema, goatInputSchema, updateGoatSchema } from './goat.schema'
import { goatRepository } from './goat.repository'

export const listGoats = createServerFn({ method: 'GET' }).handler(() =>
  goatRepository.findAll(),
)

export const createGoat = createServerFn({ method: 'POST' })
  .validator(goatInputSchema)
  .handler(({ data }) => goatRepository.create(data))

export const updateGoat = createServerFn({ method: 'POST' })
  .validator(updateGoatSchema)
  .handler(({ data }) => goatRepository.update(data))

export const archiveGoat = createServerFn({ method: 'POST' })
  .validator(goatIdSchema)
  .handler(async ({ data }) => {
    await goatRepository.archive(data.id)
    return { success: true }
  })
