import React from 'react'
import { Outlet, NavLink, useLocation } from "react-router-dom";

const isActive = () => {

}
const AdminLayout = () => {
   const location = useLocation();
   //'relative block border-e border-s border-t border-gray-200 bg-white p-4 text-sm font-medium'
  return (
    <section>
    <nav aria-label="Tabs">
    <ul class="flex border-b border-gray-200 text-center">
        <li class="flex-1">
            <NavLink exact to={'user'} className={({ isActive, isPending }) => 
            isPending ? "pending" : 
            isActive ? "relative block border-e border-s border-t border-gray-200 bg-white p-4 text-sm font-medium" : 
            "block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white"}
            >
                {({ isActive, isPending }) => (
                    <span className={isActive ? "absolute inset-x-0 -bottom-px h-px w-full bg-white" : ""}></span>
                )}
                Users Panel
            </NavLink>
        </li>

        <li class="flex-1">
            <NavLink to={'recipe'} className={({ isActive, isPending }) => 
            isPending ? "pending" : 
            isActive ? "relative block border-e border-s border-t border-gray-200 bg-white p-4 text-sm font-medium" : 
            "block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white"} match="true">
                 {({ isActive, isPending }) => (
                    <span className={isActive ? "absolute inset-x-0 -bottom-px h-px w-full bg-white" : ""}></span>
                )}
                Recipes Panel
            </NavLink>
        </li>

        <li class="flex-1">
            <NavLink to={'comments'} className={({ isActive, isPending }) => 
            isPending ? "pending" : 
            isActive ? "relative block border-e border-s border-t border-gray-200 bg-white p-4 text-sm font-medium" : 
            "block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white"} match="true">
              {({ isActive, isPending }) => (
                    <span className={isActive ? "absolute inset-x-0 -bottom-px h-px w-full bg-white" : ""}></span>
                )}
                Comments Panel
            </NavLink>
        </li>
    </ul>
    </nav>

    <Outlet/>
    </section>
  )
}

export default AdminLayout