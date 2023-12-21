import { Outlet } from "react-router-dom"
import Header from "../Header"
import Banner from "../Banner"
import { Suspense, useEffect } from "react"
import { LoadingBackground } from "../loading/LoadingBackground"
export default function Layout() {
    return (
        <>
            {/* <Banner /> */}
            <Header />
            <main>
                <Suspense fallback={<LoadingBackground />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    )
}