import Link from 'next/link';
import axios from '../lib/axios';
import { useState } from 'react';



export default function Detail({id,filedatashow}) {
 const [Statut,setStatut] = useState(false)
  console.log(id)
    const deletefile = (indice)=>{
      axios
          .get('/api/file-delete/'+indice)
          .then(console.log("DELETED"))
          .catch(error => {
             console.log("EErr",error);
          })
 
    }

  return (
    <div id="listmore" className="w-[120px] border-[1px] border-[#181F3C] h-20 bg-white z-30 mt-3 absolute right-[2%]  detail mouseup">
    <ul>
        <li  className="hover:bg-[#212947] hover:text-white font-light mr-3 text-right font-Cairo cursor-pointer desc"> 
            <p onClick={()=>{filedatashow(!Statut)}} >تفاصيل </p>
        </li>
     
        <li  className="hover:bg-[#212947] hover:text-white mr-3 text-right  font-Cairo cursor-pointer">
            <Link href={"/display/"+id}>
                <a target="_blank">تحميل </a>
              </Link> 
        </li>
        <li onClick={()=>{deletefile(id)}} className="hover:bg-[#212947] hover:text-white  mr-3 text-right  font-Cairo cursor-pointer rmv">مسح</li>
    </ul>
    </div>
  )
}
