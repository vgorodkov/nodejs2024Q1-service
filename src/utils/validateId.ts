import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export function validateId(id: string) {
  if (!validate(id)) {
    throw new BadRequestException('Invalid id format');
  }
}
