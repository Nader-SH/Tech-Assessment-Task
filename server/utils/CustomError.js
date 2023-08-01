class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status || 500;
      this.message = message || 'Internal server error !';
    }
  }
  
  export default CustomError;