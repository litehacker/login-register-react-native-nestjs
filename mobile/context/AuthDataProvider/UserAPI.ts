export const createUserWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    const axios = require("axios");

    axios({
      method: "post",
      url: "http://localhost:3000/auth/register",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: JSON.stringify({
        email,
        password,
        created: Date.now(),
      }),
    })
      .then(function (response: { data: UserCredential }) {
        resolve(response.data);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });
};

export const signInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    const axios = require("axios");
    axios({
      method: "post",
      url: "http://localhost:3000/auth/register",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: JSON.stringify({
        email,
        password,
        created: Date.now(),
      }),
    })
      .then(function (response: { data: any }) {
        resolve(response.data);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });
};
export const signOut = () => {};
