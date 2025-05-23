import { Link } from "react-router-dom"
import logoImg from "../assets/Logo.png"

const Header = () => {
    return (
        <div className="shadow-md">
            <div className="max-auto flex max-w-7xl items-center justify-between py-4 px-8 max-auto">
                <Link to="/" className="flex items-center">
                    <img src={logoImg} alt="Logo" className="h-25" />
                </Link>

                <Link to="/" className="hidden shadow-md lg:flex items-center gap-2 rounded-full border-gray-300 pr-4 py-2 pl-6">
                    <p className="pr-4  border-r-gray-300">Qualquer lugar</p>
                    <p className="px-4  border-r-gray-300">Qualquer semana</p>
                    <p className="px-4">Hóspedes</p>

                    <div className="bg-primary-400 rounded-full p-2 text-white">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>

                </Link>

                <Link to="/login" className="gap-2 flex items-center rounded-full border-gray-300 pr-4 py-2 pl-6 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <p className="max-w-20 truncate sm:max-w-32">Danilo Jose</p>
                </Link>
            </div>
        </div>
    )
}

export default Header
