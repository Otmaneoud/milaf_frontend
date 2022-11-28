import AppLayout from '@/components/Layouts/AppLayout';
import React, {useState} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import axios from '../lib/axios';
import Dropzone from '@/components/Dropzone';
import useSWR from 'swr';
import Detail from '@/components/Detail';
import FileData from '@/components/FileData';
//import toast, { Toaster } from "react-hot-toast";
 

export default function  Dashboard  ()  {
    const [Filter ,setFilter] = useState(false);
    const [Sort ,setSort] = useState(false);
    const [drpzone ,setDrpzone] = useState(false);
    const [More ,setMore] = useState(874);
    const [showfiledata ,setShowfiledata] = useState(false);



 const { data: file, error, mutate } = useSWR('/api/dashboard', () =>
     axios
         .get('/api/dashboard')
         .then(res =>res.data)
         .catch(error => {
            console.log("EErr",error);
         }),
 )

if(!file){
    return <p>Loading</p>
}

const filedatashow = (statut)=>{
    setShowfiledata(statut)
}
const closeTab = (on_off)=>{
    setShowfiledata(on_off)
    setDrpzone(on_off)
}

{/*
let bigCities = cities.filter(function (e) {
    return e.population > 3000000;
});

*/}
const Sortdata = (parm)=>{
    switch(parm) {
        case "size":
           file.sort((a, b) => {
                 return b.filesize - a.filesize;
                });
          break;
        case "filename":
        file.sort((a, b) => {
            return a.filename.localeCompare(b.filename);
            });
          break;
        case "date":
        file.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
            });
            break;
        default:
          // code block
      }

    setSort(false)
}

const Filterdata = (parm)=>{
   let records;
    switch(parm) {
        case "png":
           records = file.filter((e) => {
                 return e.type === "png";
                });break;
        case "pdf":
           records = file.filter((e) => {
                 return e.type === "pdf";
                });break;
        default:
          // code block
      }
      
console.log("rec:",records)
    setFilter(false);
}


 console.log("swr data",file);
 console.log("index",More);
    return (
        <AppLayout
            header={
                <div  name="header" className=" h-8 flex  items-center">
                <div className="flex flex-row-reverse items-center ">
                    <h2 className="font-semibold absolute right-9 font-Cairo text-xl text-gray-800 leading-tight ">
                        ملفاتي
                    </h2>
                    <div className=" absolute left-[10vw] flex">
              {/*      <div id="creeFicher" className="flex flex-row-reverse mr-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                        <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h4m-2-2v4"></path>
                    </svg>
                    <p className="ml-2 font-Cairo">  أنشئ مجلد</p>
                    </div>*/}
    
                  {/*  --------Filtering---------------- */}  
                <div onClick={()=>{setFilter(!Filter)}} id="toggle_filter" className="flex flex-row-reverse cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path>
                    </svg>
                    <p className="ml-2 font-Cairo">فلتر</p>
                </div>
                {Filter ? 
                <div id="filter" className="border-[1px] border-[#10162f] z-10 w-[120px]  absolute right-[11vw] h-auto top-8 bg-white">
                    <div  className="bg-[#10162f] h-[23px]"> <h2 className="text-center text-white font-Cairo "> :فلتر ب</h2></div>
                    <div>
                        <Link href="#" className="text-center mt-2">
                            <a   id="filter_by" className="mt-3  font-Cairo cursor-pointer">بدون</a>
                        </Link>
                     
                       {/* loop of types */} 
                         <div onClick={()=>{Filterdata("png")}}  className="text-center mt-2">
                            <p id="filter_by" className="mt-3 text-center font-Cairo cursor-pointer">png</p>
                        </div>
                        <div onClick={()=>{Filterdata("pdf")}}  className="text-center mt-2">
                            <p id="filter_by" className="mt-3 text-center font-Cairo cursor-pointer">pdf</p>
                        </div>
                        {/* End loop */} 
                    </div>
                </div> :<div/>}
                {/*  --------End Filtering---------------- */} 
                {/*  --------Sorting---------------- */}
                <div id="toggle_sort" onClick={()=>{setSort(!Sort)}} className="flex flex-row-reverse cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path>
                    </svg>
                    <p  className="ml-2 font-Cairo">رتب</p>
                </div>
                {Sort ? 
                <div id="sort" className=" mouseup border-[1px] border-[#10162f] z-10 w-[120px]  absolute right-[6vw] h-auto top-8 bg-white">
                    <div  className="bg-[#10162f] h-[23px]"> <h2 className="text-center text-white font-Cairo "> :رتب ب</h2></div>
                    <div>
                        <div onClick={()=>{Sortdata("date")}} className="text-center mt-2">
                            <p  id="sort_by_date" className="mt-3 text-center cursor-pointer">التاريخ</p>
                        </div>
                        <div onClick={()=>{Sortdata("filename")}} className="text-center cursor-pointer mt-2">
                            <p  id="sort_by_name" className="mt-3 text-center">الإسم</p>
                        </div>                    
                        <div  onClick={()=>{Sortdata("size")}} className="text-center cursor-pointer mt-2">
                            <p  id="sort_by_size" className="mt-3 text-center">الحجم</p>
                        </div>
                    </div>
    
                </div>
                :
                <></>}
                {/*  --------End of Sorting---------------- */}
                <div onClick={()=>{setDrpzone(!drpzone)}} id="toggleUpload" className="flex flex-row-reverse cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <p href="#" className="ml-2">تنزيل </p>
                </div>
            </div>
        </div>
            </div>
            }>
                {
                    drpzone ? <Dropzone closeTab={closeTab}/> : <></>
                }

      

            <Head>
                <title>Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    {file.map((item,index)=>( 
                        <div key={index}  className="flex mt-6 ml-3">
                        <div>
                            <p className="absolute text-xs mt-[14px] bg-[#c2f9f5] ml-[6px]">{item.type}</p>
                             <svg height="33px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="33px"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M438.247,183.129L261.315,6.196h-15.192h-5.633H73.888V506h364.44V183.16L438.247,183.129z M261.315,35.645  l137.153,137.152H261.315V35.645z M94.713,485.175V27.021H240.49v166.601h177.014v291.552H94.713z" fill="#37404D"/>
                        </svg>
                        </div>
                        {
                            
                            showfiledata && More == index ? <FileData dt={file.find((o)=>{if(o.id == item.id){return o}})} closeTab={closeTab}/> : <></>
                        }
                      
                            <div className="flex ml-3">
                                <p className="font-semibold text-lg">{item.filename}</p>
                            {/**<img src="{{asset('storage/p3.png')}}" height="50" width="50" alt="uo">--> */}
                                <div className="flex absolute right-[1%]">
                                    <p>{item.created_at.substring(0, 10)}</p> 
                                    <div onClick={()=>{setMore(index)}} className="cursor-pointer option">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                        </svg>
                                        {
                                            More == index ? <Detail id={item.id} filedatashow={filedatashow}/> :<></>
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                           
                        </div> 
                          ))}
                        {/* End of loop */}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
/*export async function getStaticProps() {
    const response = await axios.get('/api/dashboard');

    return {
        props: {
            files: response
        },
    }
}*/


