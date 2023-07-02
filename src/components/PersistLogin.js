import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefershToken = async () => {
            try {
                await refresh();
                
            } catch (error) {
                console.error(error);
            }
            finally
            {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken && persist ? 
        toast.promise(
            verifyRefershToken(),
            {
              pending: {
                render(){
                  return "Loading your data"
                },
                icon: false,
              },
              success: {
                render(){
                  return `${auth.accessToken ? "Information updated" : "Welcome to the Website"}`
                },
                // other options
                icon: "🟢",
              },
            })
        : 
            setIsLoading(false)
        return () => isMounted = false;
        // eslint-disable-next-line
    },[])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <ToastContainer/>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;