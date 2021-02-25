export class KnownError extends Error {
  constructor(public code: string, public status: number = 500) {
    super(code);
  }
}

export class NotImplementedError extends KnownError {
  constructor() {
    super('NotImplementedError', 501);
  }
}

export class UnsupportedMethodError extends KnownError {
  constructor() {
    super('UnsupportedMethod', 400);
  }
}

export class NotFoundError extends KnownError {
  constructor() {
    super('NotFoundError', 404);
  }
}

export function isKnownError(error: any): error is KnownError {
  return !!error.code && !!error.status;
}

type AnyKnownError =
  | typeof NotImplementedError
  | typeof UnsupportedMethodError
  | typeof NotFoundError;

export function isKnownErrorOfType(error: KnownError, anyKnownError: AnyKnownError): boolean {
  return error.code === new anyKnownError().code;
}
