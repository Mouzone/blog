import Navbar from "@/app/(pages)/components/Navbar.tsx";

export default function Landing() {
    // todo: add logic here to check if access token
    return (
        <>
            <Navbar/>
            <div className="bg-amber-50">
                <div>
                    This is
                </div>
                <div>
                    My
                </div>
                <div>
                    Blog
                </div>
            </div>

        </>

    )
}