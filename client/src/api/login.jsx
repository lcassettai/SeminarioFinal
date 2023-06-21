const baseURL = `${process.env.REACT_APP_API_URL}/api/login`;

export const loginUser = async credenciales => {
  
    const response = await fetch(`${baseURL}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
      });
  
      return await response;
}