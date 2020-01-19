export function isKnownError(error: any): error is KnownError {
  return !!error.code && !!error.status;
}

export class KnownError extends Error {
  constructor(public code: string, public status: number = 500) {
    super(code);
  }
}

export class NotAdminError extends KnownError {
  constructor() {
    super('NotAdmin');
  }
}

export class InvalidCodeError extends KnownError {
  constructor() {
    super('InvalidCode');
  }
}

export class InvalidEmailError extends KnownError {
  constructor() {
    super('InvalidEmail');
  }
}

export class NoAuthorizationHeaderError extends KnownError {
  constructor() {
    super('NoAuthorizationHeader');
  }
}

export class MalformedAuthorizationHeaderError extends KnownError {
  constructor() {
    super('MalformedAuthorizationHeader');
  }
}

export class NotImplementedError extends KnownError {
  constructor() {
    super('NotImplementedError', 501);
  }
}

export class UnauthenticatedError extends KnownError {
  constructor() {
    super('Unauthenticated', 401);
  }
}

export class UnsupportedMethodError extends KnownError {
  constructor() {
    super('UnsupportedMethod');
  }
}

export class SongAlreadyOwnedError extends KnownError {
  constructor() {
    super('SongAlreadyOwnedError');
  }
}

export class NotFoundError extends KnownError {
  constructor() {
    super('NotFoundError', 404);
  }
}
