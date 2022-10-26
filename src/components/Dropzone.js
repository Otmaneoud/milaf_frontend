import React, {useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone';
import axios from '../lib/axios';
import useSWR from 'swr';

export default function Dropzone() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

      const formData = new FormData();


   const filedata =  ()=>{
    acceptedFiles.map(file => (
        formData.append("file", file),
        axios.post('/api/file-store',formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },})
        .then(console.log("dooooooooone"))
        .catch(error => {
           console.log("EErr",error);
        }),

        console.log("file data:",file)
    ));

}
  return (
    
    <div id="uplod" className="absolute  z-40 w-5/12 h-70 left-[30vw] mt-10"> 
    <div className="flex w-[100%] h-12 border-2 border-b-0 border-slate-400 flex-row-reverse bg-[#181F3C] ">
            <p className="font-bold font-Cairo  text-white text-right  mt-2 text-lg mr-2">إختر الملف</p>
            <div className=" absolute left-[2px] top-2  cursor-pointer" id="close_ipload">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="white">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </div>

    </div>

    <div className="max-w-7xl mx-auto flex">
    
        <div className="bg-white  shadow-sm sm:rounded-lg w-[100%] h-64 justify-center b items-center ">
            <div  {...getRootProps({className: 'dropzone'})} className="dropzone min-h-full"  id="dropzone">
                    
                    <div>
                        <div className="dz-default dz-message flex flex-col justify-center items-center mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                            </svg>
                            <p>نزل الملف</p>
                        </div>
                    </div>
                    <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      </div>      
            <div className="absolute z-30 bottom-[2px] left-[36%]">
                <button  className="bg-blue-400 rounded-md h-10 w-20 ml-[44%] my-3 " id="submitform" onClick={()=>{filedata()}}>تنزيل </button>
            </div>
            
     
        </div>
    </div>
</div>
  )
}
