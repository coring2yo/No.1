# Rolling Paper - Deployment Guide

## Vercel PostgreSQL 설정

배포 후 다음 단계를 따라주세요:

### 1. Vercel 대시보드에서 PostgreSQL 데이터베이스 생성
1. https://vercel.com/dashboard 접속
2. 프로젝트 선택 (No.1)
3. Storage 탭으클릭
4. "Create Database" → "Postgres" 선택
5. 데이터베이스 이름 입력 후 생성

### 2. 환경 변수 자동 연결
- Vercel이 자동으로 필요한 환경 변수를 프로젝트에 연결합니다
- `POSTGRES_URL` 등의 변수가 자동으로 설정됩니다

### 3. 재배포
- 환경 변수 설정 후 자동으로 재배포됩니다
- 또는 "Deployments" 탭에서 수동으로 재배포 가능

### 4. 데이터베이스 초기화
- 첫 API 호출 시 자동으로 테이블이 생성됩니다
- https://no-1-rust.vercel.app/ 접속하면 자동 초기화됩니다

## 주의사항
- 기존 localStorage 데이터는 자동으로 이전되지 않습니다
- 모든 사용자가 같은 데이터베이스를 공유합니다
- 작성자 확인 기능은 localStorage 기반으로 유지됩니다
