export const errorHandler = (_statusCode, _message)=>{
    
    const error = new Error()
    error.message = _message;
    error.statusCode = _statusCode;
 
    return error
}