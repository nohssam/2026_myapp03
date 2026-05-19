import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [input, setInput] = useState('')
    const {isLoggedIn, login, logout, user} = useAuthStore()
    const navigate = useNavigate()

    const handleLogin = () =>{
        // 입력없이 버튼이나 Enter를 누르면
       if(!input.trim()) return 
       login(input)
       // 홈으로 이동
       navigate('/')
    }
    return(
    <div className="page" style={{ maxWidth: '360px' }}>
      <h2 style={{ marginBottom: '24px' }}>로그인</h2>
      <div className="col">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // 즉시 호출 : 랜더링 시점에서 바로 실행됨  
          // 화살표 함수 안에서는 호출
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="이름을 입력하세요"
        />
        {/* 함수 참조 : 이벤트 발생 시 실행됨 */}
        <button onClick={handleLogin}>로그인</button>
      </div>
    </div>
    );
}