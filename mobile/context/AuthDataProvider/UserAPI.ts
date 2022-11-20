import axios from "axios";
import { env } from "../../config/env";

export const createUserWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${env.API_URL}/auth/register`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        email,
        password,
        created: Date.now(),
      },
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
    axios({
      method: "post",
      url: `${env.API_URL}/auth/login`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        email,
        password,
        created: Date.now(),
      },
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
