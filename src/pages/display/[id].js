import { useRouter } from "next/router"
import axios from '../../lib/axios';
import Image from "next/image";
import useSWR from "swr";
import { data } from "autoprefixer";
import fileDownload from "js-file-download";

/*export const getStaticPaths = async () => {
    const res = await axios.get('/api/dashboard');
    const data = await res.data.data;
  
    // map data to an array of path objects with params (id)
    const paths = data.map(ele => {
      return {
        params: { id: ele.id.toString() }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await axios.get('/api/dashboard/'+id);
    const data = await res.json();
  
    return {
      props: { display: data }
    }
  }
  */

export default function display() {
    const router = useRouter()
    const id = router.query.id 
    const url = "http://localhost:8000"
    const { data: file, error, mutate } = useSWR('/api/display/'+id, () =>
    axios
        .get('/api/display/'+id)
        .then(res =>res.data)
        .catch(error => {
           console.log("EErr",error);
        }),
)
console.log("idDislp:",file);
if(!file){
   return <p>Loading</p>
}

const downloadfile = (indice,filename)=>{
  axios
      .get('/api/file-download/'+indice,{
        responseType:"blob"
      })
      .then(res => fileDownload(res.data,filename))
      .catch(error => {
         console.log("Download file error",error);
      })

}

  return (
    <div className="flex flex-col justify-center items-center mt-12">
    <div>
        <div className=" h-[70px] p-2 flex space-x-64 bg-slate-800">
            <div className="mt-2 flex">
                <svg enable-background="new 0 0 512 512" height="30px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="30px"  xmlns="http://www.w3.org/2000/svg" >
                    <path d="M438.247,183.129L261.315,6.196h-15.192h-5.633H73.888V506h364.44V183.16L438.247,183.129z M261.315,35.645  l137.153,137.152H261.315V35.645z M94.713,485.175V27.021H240.49v166.601h177.014v291.552H94.713z" fill="white"/>
                </svg>
                <p className="font-Cairo text-white">{file.filename}</p>
            </div>
            <div onClick={()=>{downloadfile(file.id,file.filename)}} className="bg-[#0070f0] cursor-pointer ml-5 w-40 h-11 mt-2 text-center rounded-sm">
                <a  className="text-xl font-Cairo mt-4 font-light text-cyan-50">تحميل</a>
            </div>
        </div>
        <div>

            {file.type == "pdf" ?
                <iframe src={url+"/storage/"+file.path} width="100%" height="500px">  </iframe>
                :
                <Image src={url+"/storage/"+file.path} width="600" height="400" alt="diplay img"/>
                }
        </div>
    </div>
    <div className="w-[700px] mt-3">
        <div>
            <h2 className="font-Cairo font-medium text-xl text-[#55bc74] text-right">:الوصف</h2>
        </div>
        <div>
           {
            file.description ?
                <p className="font-Cairo"> {file.description} </p>
                :
                <p className="font-Cairo font-light text-center"> ... لا يوجد أي وصف</p>
          }

        </div>
    </div>  
</div>
  )
}

