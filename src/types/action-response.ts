type SuccessResponse = {
  status: "success"
  message: string
  data?: Record<string, unknown>
}

type ErrorResponse = {
  status: "error"
  message: string
  error?: string
}

export type ActionResponse = SuccessResponse | ErrorResponse
