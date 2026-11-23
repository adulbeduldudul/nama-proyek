import { z } from 'zod'

export const goatInputSchema = z.object({
  tag: z.string().trim().min(1, 'ID kambing wajib diisi').max(50),
  typeName: z.string().trim().min(1, 'Jenis kambing wajib diisi').max(100),
  sex: z.enum(['MALE', 'FEMALE']).optional(),
  arrivalAt: z.string().min(1, 'Tanggal masuk wajib diisi'),
  initialWeightKg: z.number().positive('Bobot harus lebih dari 0'),
  source: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(2000).optional(),
})

export const updateGoatSchema = goatInputSchema.extend({
  id: z.string().min(1),
})

export const goatIdSchema = z.object({ id: z.string().min(1) })
