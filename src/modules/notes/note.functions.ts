import { createServerFn } from '@tanstack/react-start'
import { createNoteSchema, noteIdSchema, updateNoteSchema } from './note.schema'
import { noteRepository } from './note.repository'

export const listNotes = createServerFn({ method: 'GET' }).handler(() =>
  noteRepository.findAll(),
)

export const createNote = createServerFn({ method: 'POST' })
  .validator(createNoteSchema)
  .handler(({ data }) => noteRepository.create(data))

export const updateNote = createServerFn({ method: 'POST' })
  .validator(updateNoteSchema)
  .handler(({ data }) => noteRepository.update(data))

export const deleteNote = createServerFn({ method: 'POST' })
  .validator(noteIdSchema)
  .handler(async ({ data }) => {
    await noteRepository.delete(data.id)
    return { success: true }
  })
