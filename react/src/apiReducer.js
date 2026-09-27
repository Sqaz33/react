export const apiStatuses = {
  idle: "idle",
  running: "running",
  success: "success",
  error: "error"
}

export const initialApiStatus = {
  status: apiStatuses.idle,
  message: ""
}

export const apiActionTypes = {
  started: "api/started",
  succeeded: "api/succeeded",
  failed: "api/failed"
}

export function createApiReducer(isMutation = false) {
  return (state, action) => {
    switch (action.type) {
      case apiActionTypes.started:
        return { 
          status: apiStatuses.running, 
          message: (isMutation ? "Синхронизация" : "Получение данных") 
        }
      case apiActionTypes.succeeded:
        return { 
          status: apiStatuses.success, 
          message: (isMutation ? "Список задач синхронизирован" : "Данные получены")  
        }
      case apiActionTypes.failed:
        return { 
          status: apiStatuses.error, 
          message: action.payload.message
        }
      default:
        return state
    }
  } 
}
