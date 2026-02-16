import type { Route } from "../types/routes"

const routes: Route[] = [
    {
        path: "/",
        element: <div>Home</div>,

        meta: {
            title: "Member Management System / UniSchool",
            description: "A member management system for UniSchool"
        },
        children: [

        ]
    },
    {
        path: "/auth",
        element: <div>Login</div>,
        layout: <div>Auth Layout</div>,
        meta: {
            title: "Auth - Member Management System / UniSchool",
            description: "Login to the member management system for UniSchool"
        },

        children: [
            {
                path: "login",
                element: <div>Login</div>,
                meta: {
                    title: "Login - Member Management System / UniSchool",
                    description: "Login to the member management system for UniSchool"
                }
            },
            {
                path: "register",
                element: <div>Register</div>,
                meta: {
                    title: "Register - Member Management System / UniSchool",
                    description: "Register to the member management system for UniSchool"
                }
            }
        ]
    }
]