import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Navbar() {
    // useAuthStore 를 가져와서 사용하자 \
    const {isLoggedIn, logout} = useAuthStore();
    // 로그인 여부 처리 
    // NavLink가 자동으로 제공하는 값 ()
    // 현재 경로이면 true, 아니면 false
    // 현재 URL이 to 경로와 일치하면 true
    const cls = ({isActive}) => isActive ? 'active' : ''
    return(
        <nav>
            <span className="nav-logo">Zustand</span>
            <NavLink to="/" className={cls}>홈</NavLink>
            <NavLink to="/todo" className={cls}>Todo</NavLink>
            <NavLink to="/memo" className={cls}>Memo</NavLink>
            {/* 로그인이 되었을 때만 보이게 하자  */}
            {isLoggedIn && <NavLink to="/profile" className={cls}>프로필</NavLink>}
            <NavLink to="/login" className={cls}>로그인</NavLink>
            <NavLink to="/register" className={cls}>회원가입</NavLink>

            {/* 로그인 된 상태일때 로그아웃도 보여야 한다. */}
            {/*  onClick={logout} 에서 logout은 useAuthStore에 있는 함수이다.*/}
            <div className="ml-auto">
                {isLoggedIn && (
                    <button className="danger" onClick={logout} style={{padding: '6px 12px'}}>
                        로그아웃</button>
                )}
            </div>
        </nav>
    );
}
