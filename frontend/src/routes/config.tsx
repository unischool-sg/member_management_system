import type { Route } from "../types/routes"

const routes: Route[] = [
    {
        path: "/auth", // auth page layout
        type: "layout",
        layout: <div>Auth Layout</div>,
        children: [
            {
                path: "/login",
                type: "page",
                element: <div>Login page</div>,
                meta: {
                    title: "Login - Member Management System / UniSchool",
                    description: "Login page - A member management system for UniSchool"
                },
            },
            {
                path: "/register",
                type: "page",
                element: <div>Register page</div>,
                meta: {
                    title: "Register - Member Management System / UniSchool",
                    description: "Register page - A member management system for UniSchool"
                },
            }
        ]
    },
    {
        path: "/",
        type: "layout",
        layout: <div>Main Layout</div>,
        children: [
            {
                path: "/",
                type: "page",
                element: <div>Home page</div>,
                meta: {
                    title: "Home - Member Management System / UniSchool",
                    description: "Home page - A member management system for UniSchool"
                },
            }
        ]
    }
]

export { routes }