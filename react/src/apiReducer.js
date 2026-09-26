export const apiStateStatuses = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error"
}

export const initialApiStatus = {
  status: apiStateStatuses.idle,
  message: ""
}

export const apiActionTypes = {
  started: "api/started",
  succeeded: "api/succeeded",
  failed: "api/failed"
}

export function apiReducer(state, action) {
  switch (action.type) {
    case apiActionTypes.started:
      return { 
        status: apiStateStatuses.loading, 
        message: "Синхронизация с сервером" 
      }
    case apiActionTypes.succeeded:
      return { 
        status: apiStateStatuses.success, 
        message: `Список задач синхронизирован с сервером`
      }
    case apiActionTypes.failed:
      return { 
        status: apiStateStatuses.error, 
        message: action.payload.message
      }
    default:
      return state
  }
}
