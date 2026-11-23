import { prisma } from '#/db/prisma'
import type { z } from 'zod'
import type { goatInputSchema, updateGoatSchema } from './goat.schema'

type CreateGoatInput = z.infer<typeof goatInputSchema>
type UpdateGoatInput = z.infer<typeof updateGoatSchema>

function serializeGoat<T extends { initialWeightKg: unknown; currentWeightKg: unknown }>(goat: T) {
  return {
    ...goat,
    initialWeightKg: Number(goat.initialWeightKg),
    currentWeightKg: goat.currentWeightKg === null ? null : Number(goat.currentWeightKg),
  }
}

async function resolveType(name: string) {
  return prisma.goatType.upsert({
    where: { name },
    create: { name },
    update: {},
  })
}

export const goatRepository = {
  findAll: async () => {
    const goats = await prisma.goat.findMany({
      where: { archivedAt: null },
      include: { type: true },
      orderBy: { createdAt: 'desc' },
    })
    return goats.map(serializeGoat)
  },

  create: async (data: CreateGoatInput) => {
    const type = await resolveType(data.typeName)
    const goat = await prisma.goat.create({
      data: {
        tag: data.tag,
        typeId: type.id,
        sex: data.sex,
        arrivalAt: new Date(data.arrivalAt),
        initialWeightKg: data.initialWeightKg,
        currentWeightKg: data.initialWeightKg,
        currentWeighedAt: new Date(data.arrivalAt),
        source: data.source || null,
        notes: data.notes || null,
      },
      include: { type: true },
    })
    return serializeGoat(goat)
  },

  update: async ({ id, ...data }: UpdateGoatInput) => {
    const type = await resolveType(data.typeName)
    const goat = await prisma.goat.update({
      where: { id },
      data: {
        tag: data.tag,
        typeId: type.id,
        sex: data.sex,
        arrivalAt: new Date(data.arrivalAt),
        initialWeightKg: data.initialWeightKg,
        source: data.source || null,
        notes: data.notes || null,
      },
      include: { type: true },
    })
    return serializeGoat(goat)
  },

  archive: (id: string) =>
    prisma.goat.update({
      where: { id },
      data: { archivedAt: new Date(), status: 'OTHER_OUT' },
    }),
}
