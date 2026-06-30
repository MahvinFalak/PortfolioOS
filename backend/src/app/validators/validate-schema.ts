import { ZodSchema } from 'zod';

import { BadRequestException } from '../exceptions/bad-request.exception';

/**
 * Converts camelCase field names into human-readable text.
 *
 * Example:
 * refreshToken -> Refresh token
 * firstName    -> First name
 * email        -> Email
 */
const formatFieldName = (field: string): string => {
  const formatted = field
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase();

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Validates request data using a Zod schema.
 */
export const validateSchema = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  const issue = result.error.issues[0];

  let message = issue.message;

  if (issue.code === 'invalid_type' && issue.path.length > 0) {
    const fieldName = formatFieldName(String(issue.path[0]));

    message = `${fieldName} is required.`;
  }

  throw new BadRequestException(message);
};
