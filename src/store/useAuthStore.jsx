// Zustand의 create 함수와 persist 미들웨어를 가져온다
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    // persist로 감싸면 localStorage에 자동 저장된다
    persist(
        (set) => ({
            // ── 상태(State) : 변수 ─────────────────────────────────
            user: null, // 로그인한 사용자 { username, bio }. 미로그인 시 null
            isLoggedIn: false, // 로그인 여부 플래그

            // ── 액션(Action) : 함수 ────────────────────────────────
            // 로그인: username을 받아 user 객체를 만들고 isLoggedIn을 true로 설정
            login: (username) =>
                set({ user: { username, bio: '' }, isLoggedIn: true }),

            // 로그아웃: 사용자 정보를 null로, 로그인 여부를 false로 초기화
            logout: () =>
                set({ user: null, isLoggedIn: false }),
            
            // 프로필 수정: 기존 user 객체에 새 값을 덮어씌운다
            // 스프레드 연산자(...)로 기존 필드를 유지하면서 일부만 변경
            // 예) updateProfile({ bio: '개발자' }) → bio만 바뀌고 username 유지
            // state란 zustand가  콜백함수에 주입하는 현재 스토어 정보 (값 전체)
            updateProfile: (fields) =>
                set((state)=>({user: {...state.user, ...fields}})),
            }),
        { name: 'auth-storage' } // localStorage 키 이름
    )
)

export default useAuthStore
