import { useEffect, useState } from "react"
import useGuestbookStore from "../store/useGuestbookStore"
import { guestbookList } from "../api/GuestBook"
import useAuthStore from "../store/useAuthStore"

export default function GuestBookPage(params) {
    const {guestbooks, setGuestbooks, removeGuestbook, updateGuestbook} = useGuestbookStore()
    const isLoggedIn = useAuthStore((state)=>state.isLoggedIn)

    const [editId, setEditId] = useState(null);

    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')

    // 다른 곳에서 호출 가능
    // 새로 고침/추가/수정 후 재호출 필요
    const fetchList = async ()=> {
        try {
            const res = await guestbookList()
            if(res.data.success && res.data.data){
                setGuestbooks(res.data.data)
            }else{
                setGuestbooks([])
            }
        } catch (error) {
           console.log(error)
        }
    }
    useEffect(()=>{
      fetchList()
    },[])
    return (
       <div className="page" style={{maxWidth: '400px'}}>
            <h2 style={{marginBottom: '24px'}}>방명록</h2>
           { isLoggedIn ? (
                <div className="card col" style={{padding:'20px', gap:'10px', marginBottom:'28px'}}>
                    <input
                        value={subject}
                        onChange={(e)=> setSubject(e.target.value)}
                        placeholder="제목 입력"
                     />
                     <textarea
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        placeholder="내용 입력"

                     />
                     <button>등록</button>
                </div>
              ) : (
              <>
                <p className="muted" style={{marginBottom:'24px'}}>
                    로그인 하면 글을 작성할 수 있습니다.
                </p>
              </>      
              )
            }
            <div className="col">
                  {guestbooks.length === 0 && <p className="empty">방명록이 비었습니다.</p>}  
                  {guestbooks.map((g) => (
                    <div key={g.g_idx} className="card" style={{padding: '16px 20px', borderRadius:'10px'}}>
                        {/*
                            <p>{g.g_subject}</p>
                            <p>{g.g_content}</p>
                            <p>{g.g_writer} </p>
                            <p>{g.g_regdate} </p> 
                        */}
                        {/* <div className="row">
                            <button>수정</button>
                            <button>삭제</button>
                        </div>    */}
                        
                        {/* {editId === g.g_idx ? (

                            <div className="row">
                                <button>저장</button>
                                <button>취소</button>
                            </div>    
                        ):(
                          <>

                            <div className="row">
                                <button>수정</button>
                                <button>삭제</button>
                            </div>   
                          </>      
                        )} */}

                       
                    </div>    
                  ))}
            </div>
       </div> 
    )
    
}
