import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const {isLoggedIn, user, updateProfile} = useAuthStore()
    // user?.username 가 null 에러 없이 undefined
    const [username, setUserName] = useState(user?.username || '')
    const [bio, setBio] = useState(user?.bio || '')
    const [saved, setSaved] = useState(false)

    const navigate = useNavigate() 
    // 로그인이 안되어있으면 
    if(!isLoggedIn){
        return(
          <div className="page">
             <p className="muted" style={{marginBottom: '16px'}}>로그인이 필요합니다</p>
             <button onClick={()=>navigate("/login")}>로그인하러 가기</button>
          </div>
        )
    }

    const handleSave = () =>{
       updateProfile({username,bio})
       setSaved(true)
    }
    return(
        <div className="page" style={{maxWidth: '400px'}}>
            <h2 style={{marginBottom: '28px'}}>프로필 편집</h2>
            <div className="card col" style={{padding: '24px', gap: '20px'}}>
                <div>
                    <p className="muted" style={{fontSize: '13px', marginBottom: '6px'}}>이름</p>
                    <input value={username} onChange={(e)=> setUserName(e.target.value)} />
                </div>
                <div>
                    <p className="muted" style={{fontSize: '13px', marginBottom: '6px'}}>한 줄 소개</p>
                    <input value={bio} onChange={(e)=> setBio(e.target.value)} placeholder="ex) React 공부중인 개발자" /> 
                </div>
                <div className="row" style={{gap: '10px'}}>
                    <button onClick={handleSave}>저장</button>
                    <button className="ghost" onClick={()=> navigate('/')}>취소</button>
                    {saved && <span style={{color:'#10b981', fontSize: '13px'}}>저장됐습니다.</span> }
                </div>
            </div>
        </div>
    );
}