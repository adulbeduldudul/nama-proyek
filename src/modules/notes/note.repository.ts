import { prisma } from '#/db/prisma'
import type { CreateNoteInput, UpdateNoteInput } from './note.schema'

export const noteRepository = {
  findAll: () => prisma.note.findMany({ orderBy: { createAt: 'desc' } }),
  findById: (id: string) => prisma.note.findUnique({ where: { id } }),
  create: (data: CreateNoteInput) => prisma.note.create({ data }),
  update: ({ id, ...data }: UpdateNoteInput) =>
    prisma.note.update({ where: { id }, data }),
  delete: (id: string) => prisma.note.delete({ where: { id } }),
}
