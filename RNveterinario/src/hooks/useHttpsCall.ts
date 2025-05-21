import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export type ResponseHttpCall<T> = { response: T | undefined; error: AxiosError | null };

export const useHttpsCall = () => {

  const [isLoading, setIsLoading] = useState(false);

  const callServer = async <T, D>(url: string, data: T | null, method: 'post' | 'get' | 'put', token = ""): Promise<ResponseHttpCall<D>> => {
    setIsLoading(true);
    let error: AxiosError | null = null;

    // Temporalmente manejamos 2 ips. La de microservicios se envia quemada en url por esta razón se condiciona de esta manera. 
    const temporalyUrl = 'https://4e70-181-49-197-21.ngrok-free.app' + url;
    console.log("COMPLETE URL: ", temporalyUrl);

    try {
      let response;
      switch (method) {
        case 'post':
          response = (await axios.post<D>(temporalyUrl, data, {
            timeout: 300000, headers: {
              "Authorization": (token) ? "Bearer " + token : ''
            }
          })).data;
          break;
        case 'get':
          response = (await axios.get<D>(temporalyUrl, {
            timeout: 300000, headers: {
              "Authorization": (token) ? "Bearer " + token : ''
            }
          })).data;
          break;
        case 'put':
          response = (await axios.put<D>(temporalyUrl, data, {
            timeout: 300000, headers: {
              "Authorization": (token) ? "Bearer " + token : ''
            }
          })).data;
          break;
        default:
          throw new Error('Unsupported method');
      }
      return { response, error };
    } catch (err) {
      error = err as AxiosError;
      return { response: undefined, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { callServer, isLoading };

};