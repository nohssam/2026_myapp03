//  Spring Boot 서버로 보내는 API 함수 모음 + JWT 인터셉터 
//  구조  : API 함수들  : 각 엔드 포인트들 함수,  
//         요청 인터셉터 : jwt 토큰을 헤더에 자동으로 추가 
//         응답 인터셉터 : 토큰 만료 시 자동으로 토큰 재발급 후 재시도

import { api } from "./Http";

// 토큰 저장 위치 : localStorage "tokens" 키에 JSON 으로 저장
//               {accessToken, refreshToken, user}

export const register = (member) =>
    api.post('/members/register', member)

export const login = (m_id,m_pw) =>
    api.post('/members/login',{m_id, m_pw})

export const logout = () => 
    api.post('/members/logout')


// 요청 인터셉터 
api.interceptors.request.use(
    (config) => {
        // 토큰을 붙이지 않아도 되는 경로 
        const exludePaths = [
            '/members/login',
            '/members/register',
            '/members/refresh'
        ]

        // 위에서 지정한 엔드포인트를 제외하고 
        const isExcluded = exludePaths.some((path)=> config.url.includes(path))

        if(!isExcluded){
            // localStorage에서 토큰 가져오기
            const tokens = localStorage.getItem('tokens')
            if(tokens){
                const parsed = JSON.parse(tokens)
                if(parsed?.accessToken){
                    // request 헤더 부분에 토큰 넣기 
                    config.headers.Authorization = `Bearer ${parsed.accessToken}`
                }
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 응답 인터셉터
// 정상응답일때 그대로 반환 
// AccessToken 만료 되면  -> accessToken 재발급 시도
api.interceptors.response.use(
    (res) => res, // 정상응답일때 그대로 반환 

    async(error) => {
        const [config, response] = error
        // refresh, logout 요청에서 난 에러는 재시도 하지 않음
        // 재시도 하면 무한 루프 발생 
        const excludePaths = ['/members/refresh', '/members/logut']
        const isExcluded = excludePaths.some((path)=> config.url.includes(path))

        // 재시도 하지 않는 경우 (나중에)


        return Promise.reject(error)

    }

)