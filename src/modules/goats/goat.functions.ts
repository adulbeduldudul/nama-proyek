import { createServerFn } from '@tanstack/react-start'
import { goatIdSchema, goatInputSchema, updateGoatSchema } from './goat.schema'
import { goatRepository } from './goat.repository'

// Server API untuk Portal Pengelola: mengambil daftar kambing dari database.
export const listGoats = createServerFn({ method: 'GET' }).handler(() =>
  goatRepository.findAll(),
)

// Server API Portal Pengelola: menambahkan kambing setelah data lolos validasi.
export const createGoat = createServerFn({ method: 'POST' })
  .validator(goatInputSchema)
  .handler(({ data }) => goatRepository.create(data))

// Server API Portal Pengelola: memperbarui data kambing berdasarkan ID.
export const updateGoat = createServerFn({ method: 'POST' })
  .validator(updateGoatSchema)
  .handler(({ data }) => goatRepository.update(data))

// Server API Portal Pengelola: mengarsipkan kambing tanpa menghapus permanen.
export const archiveGoat = createServerFn({ method: 'POST' })
  .validator(goatIdSchema)
  .handler(async ({ data }) => {
    await goatRepository.archive(data.id)
    return { success: true }
  })
