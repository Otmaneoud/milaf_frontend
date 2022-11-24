import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from  '../../lib/axios'
import useSWR from 'swr'

const Navigation = ({ user }) => {
    const [Filelist,setFilelist] = useState([]);
    const router = useRouter()

    const { logout } = useAuth()

    const [open, setOpen] = useState(false);
    const [Search,setSearch]=useState(false);

    const InpuData = (query)=>{
         console.log("query", Boolean(query))
        if(query){
            setSearch(true);
            axios
            .get('/api/autocomplete-search',{
                params:{query:query}
            })
            .then(res => {setFilelist(res.data)})
            .catch(error => {
            console.log("EErr",error);
            })
        }
        else{
            setSearch(false)
        }
   

    }
   /* const { data:file} = useSWR('/api/dashboard', InpuData)
    if(!file){
    return <p>Loading</p>
    }*/
    console.log("Autocomplete:",Filelist[0])

    return (
        <nav className="bg-white border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard">
                                <a>
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
                                </a>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex w-[62vw] items-center">
             
                        {/*  <div className="shrink-0 flex items-center">
                            <a href="{{ route('dashboard') }}">
                                <Image alt="Milaf logo" height="70px" width="70px"/>
                            </a>
                        </div>*/}
                        <div className=" ml-20 w-[70vw]">
                            <div className="flex">
                                <input
                                type="text"
                                onChange={(e)=>{InpuData(e.target.value)}}
                                className="h-10  form-control block w-full px-3 py-1.5 text-right text-base font-normal text-gray-700 bg-white bg-clip-padding  border border-solid border-gray-300 transition ease-in-out mt-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="searchFile"
                                placeholder="إبحث عن ملف"
                                />   
                                <button className="ml-4 "> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="#1a6567">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            { Search ?
                            <div id="auto_complet" className="absolute h-[42%] overflow-scroll   z-10 top-14 w-[58%] border-[1px] border-gray-500 bg-white">
                                <div>
                                    <p className="font-Cairo text-center text-sm font-semibold mt-2 mr-3">الملفات الخاصة</p>
                                    <ul className="p-2" id="searchResult">
                                        {
                                         Filelist[0] && Filelist[0].map((v,index)=>
                                         <Link target="_blank" key={index} href={"/display/"+v.id}>
                                             <li className="mt-1 text-lg font-Cairo cursor-pointer hover:bg-[#ECEEFF] hover:text-xl " >{v.filename}</li>
                                         </Link>)
                                        }
                                    </ul>
                                </div>
                                <div className="mb-2">
                                    <p className="font-Cairo font-semibold text-center text-sm mt-2 mr-3">ملفات أخرى</p>
                                    <ul id="searchResult1">
                                        {
                                         Filelist[1] && Filelist[1].map((v,index)=>
                                         <Link target="_blank" key={index} href={"/display/"+v.id}>
                                             <li className="mt-1 text-lg font-Cairo cursor-pointer hover:bg-[#ECEEFF] hover:text-xl " >{v.filename}</li>
                                         </Link>)
                                        }
                                    </ul>
                                </div>
                            </div>   
                            :<></>}
                        </div>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>{user?.name}</div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>

                            {/* Authentication */}
                            <DropdownButton onClick={logout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
