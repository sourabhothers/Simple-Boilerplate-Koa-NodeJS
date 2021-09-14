import { IBuildApiError, ICustomError } from '../types';

export const errorAsText = (error: any) =>
  `${error?.name}\n${error?.message}\n${error?.stack}`;

// Error builder for Apis
export const buildApiError: IBuildApiError = ({
  name,
  message,
  stack,
  statusCode,
  code,
  description,
  isCustom,
}) => ({
  statusCode: statusCode || 400,
  name,
  message,
  stack,
  code,
  isCustom: isCustom || true,
  description,
});
