import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../api/Auth"

export default function RegisterPage(params) {
    // 회원가입 성공시 로그인으로 이동 
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        m_id: '',
        m_pw: '',
        m_name: '',
        m_addr: '',
        m_email: '',
        m_phone: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // prev 이전 정보
    const handleChange = (e) =>(
        setFormData((prev)=>({...prev, [e.target.name]:e.target.value}))
    )

    // 서버로 정보를 보내기 
    //  e.preventDefefault() : 브라우저의 기본 동작을 중단시키기 위해 명시적으로 호출해야 하는 메서드
    // <form> 제출 시: 폼을 제출할 때 페이지가 새로고침되는 것을 막고, JavaScript로 데이터를 처리할 때 사용합니다.
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
            // spring에서 결과 정보를 받자 
            // register는  Auth.jsx의 register 함수 호출
           const response = await register(formData)
           console.log("response:" , response)
           const {success, message} = response.data
           if(success){
             navigate('/login')
           }else{
             setError(message || '회원가입실패')
           }

        }catch(err){
           setError('서버 연결에 실패했습니다.') 
        }finally{
          setLoading(false)
        }
    }

    return(
        <div className="page" style={{maxWidth: '400px'}}>
            <h2 style={{marginBottom: '28px'}}>회원가입</h2>
            <form onSubmit={handleSubmit} className="col">
                <div className="col" style={{gap: '6px'}}>
                    <label className="muted" style={{fontSize:'13px'}}><sup style={{fontSize: '6px'}}>** </sup> 아이디</label>
                    <input name="m_id" value={formData.m_id} 
                           onChange={handleChange} placeholder="아이디를 입력하세요" required />
                </div>
                <div className="col" style={{gap: '6px'}}>
                    <label className="muted" style={{fontSize:'13px'}}><sup style={{fontSize: '6px'}}>** </sup> 비밀번호</label>
                    <input type="password" name="m_pw" value={formData.m_pw} 
                           onChange={handleChange} placeholder="비밀번호를 입력하세요" required />
                </div>
                <div className="col" style={{gap: '6px'}}>
                    <label className="muted" style={{fontSize:'13px'}}><sup style={{fontSize: '6px'}}>** </sup> 이름</label>
                    <input name="m_name" value={formData.m_name} 
                           onChange={handleChange} placeholder="이름를 입력하세요" required />
                </div>
                <div className="col" style={{gap: '6px'}}>
                    <label className="muted" style={{fontSize:'13px'}}><sup style={{fontSize: '6px'}}>** </sup> 주소</label>
                    <input name="m_addr" value={formData.m_addr} 
                           onChange={handleChange} placeholder="주소를 입력하세요" required />
                </div>
                <div className="col" style={{gap: '6px'}}>
                    <label className="muted" style={{fontSize:'13px'}}><sup style={{fontSize: '6px'}}>** </sup> 이메일</label>
                    <input name="m_email" value={formData.m_email} 
                           onChange={handleChange} placeholder="이메일를 입력하세요" required />
                </div>
                <div className="col" style={{gap: '6px'}}>
                    <label className="muted" style={{fontSize:'13px'}}><sup style={{fontSize: '6px'}}>** </sup> 전화번호</label>
                    <input name="m_phone" value={formData.m_phone} 
                           onChange={handleChange} placeholder="전화번호를 입력하세요" required />
                </div>

                <button type="submit">
                 {loading ? '처리 중...' : '회원가입' }
                </button>
                <p className="muted" style={{textAlign:'center',fontSize:'13px', marginTop:'4px'}}>
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </p>
            </form>
        </div>
    )
}