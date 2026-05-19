//  Spring Boot 서버로 보내는 API 함수 모음 + JWT 인터셉터 
//  구조  : API 함수들  : 각 엔드 포인트들 함수,  
//         요청 인터셉터 : jwt 토큰을 헤더에 자동으로 추가 
//         응답 인터셉터 : 토큰 만료 시 자동으로 토큰 재발급 후 재시도

import { api } from "./Http";

// 토큰 저장 위치 : localStorage "tokens" 키에 JSON 으로 저장
//               {accessToken, refreshToken, user}

export const register = (member) =>
    api.post('/members/register', member)
