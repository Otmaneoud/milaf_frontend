import axios from '../lib/axios';
import { useState,useEffect} from 'react';

export default function FileData({dt,closeTab}) {

     const [Filename,setFilname]=useState(dt.filename);
     const [Description,setDescription]=useState(dt.description);
     const [Privacy,setPrivacy]=useState(dt.privacy);
  


    console.log("gtr:",dt)

    function handleChange() {
      
        axios.post('/api/file-update/'+dt.id, {
            filename: Filename,
            privacy: Privacy,
            description: Description,
            extension:dt.type,
            oldpath:dt.path,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


  return (
    <div className="absolute border-[1px] border-[#181F3C] z-50 w-4/12 h-70 left-[35vw] top-[36vh] bg-white rounded-sm  Descpanel">
    <div className="flex flex-row-reverse bg-[#181F3C]">
        <h2 className="m-2 font-Cairo text-lg text-white">تفاصيل الملف </h2>
        <div  onClick={()=>closeTab(false)} className=" absolute left-[2px] top-2  cursor-pointer" id="close_info1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="white">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </div>

    </div>
    <div className="mt-6 flex flex-row-reverse mr-3">
        <label for="file_name" className="font-Cairo"> :الإسم</label>
        <input onChange={(e)=>{setFilname(e.target.value)}}  type="text" name="file_name" value={Filename} id="filename" className="h-8 mr-3"/>
    </div>

    <div className="mt-6 flex flex-row-reverse mr-3">
        <label  className="font-Cairo" for="privacy_fil">:الخصوصية</label>
                <div className="flex mr-3">
                    <input  onChange={()=>{setPrivacy("private")}} className="ml-3 type_folder" type="radio" id="private" name="type" defaultChecked={Privacy == 'private'} value="private" required/>
                    <label  className="ml-3 "for="private">privé</label>
                    <input onChange={()=>{setPrivacy("public")}} className="ml-3 type_folder" type="radio" id="public" name="type" checked={Privacy == 'public'} value="public" required/>
                    <label   className="ml-3" for="public">public</label>
                </div>
    </div>
    <div className="mt-6 flex flex-row-reverse mr-3">
     <label className="font-Cairo"  for="file_descr"> :الوصف</label>
    <input onChange={(e)=>{setDescription(e.target.value)}} placeholder="Description" value={Description} type="text" name="file_descr" id="file_descr" className="h-10 ml-10 w-[60%] border-[1px] mr-6 block"/>
    </div>

    <div className="float-left mt-7 space-x-3 ml-3">
        <button onClick={()=>{handleChange()}} id="updatedesc" className="font-Cairo font-medium text-xl" type="submit">أضف</button>
        <button onClick={()=>closeTab(false)}  id="close_updatedesc" className="font-Cairo font-medium text-xl" type="submit">إلغاء</button>
    </div>
</div>

  )
}
