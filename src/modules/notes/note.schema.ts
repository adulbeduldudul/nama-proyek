import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z.string().trim().min(1, 'Judul wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  content: z.string().trim().min(1, 'Konten wajib diisi'),
})

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().min(1, 'ID tidak valid'),
})

export const noteIdSchema = z.object({ id: z.string().min(1, 'ID tidak valid') })

export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
