export const initialSaveState = {
  status: "idle",
  message: ""
}

export const saveActionTypes = {
  started: "save/started",
  succeeded: "save/succeeded",
  failed: "save/failed"
}

export const saveStateStatuses = {
  idle: "idle",
  saving: "saving",
  success: "success",
  error: "error"
}

export function saveReducer(state, action) {
  switch (action.type) {
    case saveActionTypes.started:
      return { 
        status: saveStateStatuses.saving, 
        message: "" 
      }
    case saveActionTypes.succeeded:
      return { 
        status: saveStateStatuses.success, 
        message: `Сохранено задач: ${action.payload.savedCount}`
      }
    case saveActionTypes.failed:
      return { 
        status: saveStateStatuses.error, 
        message: action.payload.message
      }
    default:
      return state
  }
}