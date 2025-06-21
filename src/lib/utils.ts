import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Success<T> = {
  data: T
  error: null
}

type Failure<E> = {
  data: null
  error: E
}

export type Result<T, E = Error> = Success<T> | Failure<E>
