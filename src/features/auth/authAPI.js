// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ message: error });
      }
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ message: "Invalid Username or Password" });
      }
    } catch (err) {
      reject({ message: err });
    }
    
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/auth/check`);
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ message: "Please signup or login to continue" });
      }
    } catch (err) {
      reject({ message: err });
    }
    
  });
}

export function signOut() {
    return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`/auth/logout`);
          if (response.ok) {
            resolve({ data: "success" });
          } else {
            const error = await response.text();
            reject({ message: error });
          }
        } catch (err) {
          reject({ message: err });
        }
        
      });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ message: error });
      }
    } catch (err) {
      reject({ message: err });
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ message: error });
      }
    } catch (err) {
      reject({ message: err });
    }
  });
}
