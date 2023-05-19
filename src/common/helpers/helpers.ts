import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export function buildPath(
  fileName: string,
  itemType: string,
): string {
  const fileExtension = extname(fileName);
  const uniqueId = uuidv4();

  return `${itemType}/${uniqueId}${fileExtension}`;
}
