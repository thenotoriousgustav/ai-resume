export type Success<T> = readonly [T, null]
export type Failure<E> = readonly [null, E]

export type ResultSync<T, E> = Success<T> | Failure<E>
export type ResultAsync<T, E> = Promise<ResultSync<T, E>>

type Operation<T> = Promise<T> | (() => T) | (() => Promise<T>)

export function tryCatch<T, E = Error>(operation: Promise<T>): ResultAsync<T, E>

export function tryCatch<T, E = Error>(
  operation: () => Promise<T>
): ResultAsync<T, E>

export function tryCatch<T, E = Error>(operation: () => T): ResultSync<T, E>

export function tryCatch<T, E = Error>(
  operation: Operation<T>
): ResultSync<T, E> | ResultAsync<T, E> {
  if (operation instanceof Promise) {
    return operation
      .then((data: T) => onSuccess(data))
      .catch((error: E) => onFailure<E>(error))
  }

  try {
    const result = operation()

    if (result instanceof Promise) {
      return result
        .then((data: T) => onSuccess(data))
        .catch((error: E) => onFailure<E>(error))
    }

    return onSuccess(result)
  } catch (error) {
    return onFailure<E>(error)
  }
}

export const onSuccess = <T>(value: T): Success<T> => {
  return [value, null]
}

export const onFailure = <E>(error: unknown): Failure<E> => {
  const errorParsed = error instanceof Error ? error : new Error(String(error))
  return [null, errorParsed as E]
}
