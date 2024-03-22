import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createApplicationSchema = z.object({
  candidateName: z.string().min(1, { message: messages.fullNameIsRequired }),
  job: z.string().min(1, { message: messages.jobIsRequired }),
  dob: z.date().refine((value) => value !== null, 'Please select a date'),
  meetingSchedule: z
    .date()
    .refine((value) => value !== null, 'Please select a date'),
  candidateFiles: z.array(z.instanceof(File)),
});

// generate form types from zod validation schema
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
