import {axoisPrivate} from '../api/axios'
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() =>  {
        const requrestIntercept = axoisPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization'])
                {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => {
                return Promise.reject(error)
            } 
        );
        const responseIntercepet = axoisPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent)
                {
                        try {
                            prevRequest.sent = true;
                            const newAccessToken = await refresh();
                            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            return axoisPrivate(prevRequest);
                        } catch (refreshError) {
                            return Promise.reject(refreshError);
                        }
                }
                return Promise.reject(error)
            }
        );

        return () => {
            axoisPrivate.interceptors.request.eject(requrestIntercept);
            axoisPrivate.interceptors.response.eject(responseIntercepet);
        }
    }, [auth,refresh]);


  return axoisPrivate;
}

export default useAxiosPrivate