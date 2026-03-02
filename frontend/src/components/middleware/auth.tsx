import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../animation/loading";

type AuthLayoutProps = React.FC<PropsWithChildren<{
    authenticated: boolean; // 認証が必要か否か
}>>;

type BaseAPIResponse = {
    meta: {
        status: number;
        message: string;
    };
}
type Success = {
    error: false;
    data: Record<string, any>;
}
type Failure = {
    error: true;
    data: null;
}
type APIResponse = BaseAPIResponse & (Success | Failure);

export const AuthLayout: AuthLayoutProps = ({ children, authenticated }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const existsProfile = localStorage.getItem("profile") !== null;
            if (existsProfile) return setIsAuthenticated(true);
            
            const store = await cookieStore.getAll();
            const hasAuthToken = store.some(cookie => cookie.name === "authToken");
            if (!hasAuthToken) return setIsAuthenticated(false);

            const token = store.find((cookie: CookieListItem) => cookie.name === "authToken")?.value ?? "";
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data: APIResponse = await response.json();

            if (response.ok && !data.error) {
                localStorage.setItem("profile", JSON.stringify(data));
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("profile");
                setIsAuthenticated(false);
            }

        }

        checkAuth();
    }, []);

    if (isLoading) return <Loading />;
    if (!isLoading) {
        const willRedirect: boolean = (authenticated && !isAuthenticated) ||
            (!authenticated && isAuthenticated);
        if (willRedirect) return <Navigate to={`/auth/login`} replace />; // 認証ユーザーのみアクセス可能ならログインページへ、非認証ユーザーのみアクセス可能ならホームページへリダイレクト
        else return <>{children}</>;
    }
}