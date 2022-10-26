import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Milaf</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ?
                        <Link href="/dashboard">
                            <a className="ml-4 text-sm text-gray-700 underline">
                            الرئيسية
                            </a>
                        </Link>
                        :
                        <div className="flex space-x-4">
                            <Link href="/login">
                                <a className="text-sm text-gray-700 underline">الدخول</a>
                            </Link>

                            <Link href="/register">
                                <a className="ml-4 text-sm text-gray-700 underline">
                                التسجيل
                                </a>
                            </Link>
                        </div>
                    }
                </div>

                <div className="max-w-6xl flex flex-col justify-center items-center mx-auto sm:px-6 lg:px-8">
                    <div className="mt-16">
                        <Image  alt="Milaf logo"/>
                    </div>
                    <div className="mt-16">
                        <input className="border-2 border-slate-500 h-[50px] w-[50vw] font-light rounded-sm pl-4 pr-2" placeholder="Search file"   type="search" name="search" id="search_f"/>
                        <div id="auto_complet" className="absolute  z-10  w-3/6 border-[1px] border-gray-500 bg-white hidden">
                                <ul id="searchResult"></ul>
                        </div>
                    </div>
                    <div className="mt-10 h-[55px] p-3 hover:bg-[#e57f25] rounded-full border-[.5px] border-black text-center w-3/6">
                    {user ?
                    <Link  href="/dashboard" className="font-Cairo font-semibold mt-2 ">رفع ملف</Link>
                    :
                    <Link  href="/login" className="font-Cairo font-semibold mt-2 ">رفع ملف</Link>
                    }
                
                    </div>
                </div>
            </div>
        </>
    )
}
