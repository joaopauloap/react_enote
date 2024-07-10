import CONSTANTS from "../config/constants";

function RequestErrorHandler(error){
  switch(error.code){
    case "ERR_BAD_REQUEST":
      switch(error.response?.status){
        case 401:
          return(error.response.data)
        default:
      }
      break;
    case "ERR_NETWORK":
      return(CONSTANTS.NETWORK_ERROR)
    default:
  }
  return error
}

export default RequestErrorHandler;