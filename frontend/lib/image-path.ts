// Add this file: frontend/lib/image-path.ts
export function getImagePath(path: string): string {
  // In production, add the basePath prefix
  if (process.env.NODE_ENV === 'production') {
    return `/etn-task-ai${path}`;
  }
  // In development, use the path as-is
  return path;
}