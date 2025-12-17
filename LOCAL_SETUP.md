# 로컬 개발 환경 설정 가이드

로컬에서 개발하면서 Vercel PostgreSQL 데이터베이스에 연결하려면 환경 변수를 설정해야 합니다.

## 1. Vercel에서 환경 변수 가져오기

1. **Vercel 대시보드**로 이동: https://vercel.com/dashboard
2. 프로젝트 선택 (No.1)
3. **Settings** → **Environment Variables** 클릭
4. 다음 변수들을 찾아서 값을 복사:
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

## 2. .env.local 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 붙여넣으세요:

```env
# Vercel PostgreSQL Database URL
POSTGRES_URL="복사한-POSTGRES_URL-값"
POSTGRES_PRISMA_URL="복사한-POSTGRES_PRISMA_URL-값"
POSTGRES_URL_NON_POOLING="복사한-POSTGRES_URL_NON_POOLING-값"
POSTGRES_USER="복사한-POSTGRES_USER-값"
POSTGRES_HOST="복사한-POSTGRES_HOST-값"
POSTGRES_PASSWORD="복사한-POSTGRES_PASSWORD-값"
POSTGRES_DATABASE="복사한-POSTGRES_DATABASE-값"
```

⚠️ **중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요! (이미 `.gitignore`에 포함되어 있습니다)

## 3. 개발 서버 실행

환경 변수 설정 후 개발 서버를 재시작하세요:

```bash
npm run dev
```

이제 로컬 개발 환경에서도 Vercel PostgreSQL 데이터베이스에 연결되어 정상적으로 작동합니다!

## 빠른 설정 (Vercel CLI 사용)

Vercel CLI가 설치되어 있다면 자동으로 환경 변수를 가져올 수 있습니다:

```bash
# Vercel CLI 설치 (글로벌)
npm install -g vercel

# 환경 변수 자동으로 가져오기
vercel env pull .env.local
```

## 문제 해결

### API 호출이 실패하는 경우

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 값에 따옴표가 제대로 포함되어 있는지 확인
3. 개발 서버를 재시작 (`Ctrl+C` 후 `npm run dev`)

### 데이터베이스 연결 오류

- Vercel 대시보드에서 PostgreSQL 데이터베이스가 활성화되어 있는지 확인
- 환경 변수 값이 최신인지 확인 (데이터베이스를 재생성한 경우 값이 변경됨)
