import { useEffect } from "react"

export default function GuestBookPage(params) {
    

    // 다른 곳에서 호출 가능
    // 새로 고침/추가/수정 후 재호출 필요
    const fetchList = async ()=> {
        try {
            
        } catch (error) {
        
        }
    }
    useEffect(()=>{
      fetchList()
    },[])
    return (
       <div>

       </div> 
    )
    
}