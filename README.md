# 📷 사진 전송 PWA

모바일에서 사진을 찍어 올리면 PC에서 내려받을 수 있는 앱이에요. (순수 HTML + CSS + JS)

| 파일 | 하는 일 |
|---|---|
| `index.html` | 화면과 동작 전부 |
| `config.js` | Supabase URL / anon key |
| `manifest.json` | 앱 이름·아이콘 (홈 화면 설치용) |
| `sw.js` | 설치 조건을 맞추는 최소 서비스 워커 |
| `icon-192.png`, `icon-512.png` | 앱 아이콘 |

## 1. Supabase 설정
1. [supabase.com](https://supabase.com) → 내 프로젝트 열기 (없으면 New project)
2. 왼쪽 **Storage** → **New bucket** → 이름 `photos`, **Public bucket 켜기** → Save
3. 왼쪽 **SQL Editor** → 아래 SQL 붙여넣고 **Run** (익명 사용자도 조회/업로드 가능하게)
   ```sql
   create policy "photos 조회 허용" on storage.objects
     for select to anon using (bucket_id = 'photos');

   create policy "photos 업로드 허용" on storage.objects
     for insert to anon with check (bucket_id = 'photos');
   ```
4. **Project Settings → API** (또는 Data API / API Keys)에서
   - Project URL → `config.js`의 `SUPABASE_URL`
   - `anon` `public` 키 (또는 `sb_publishable_...` 키) → `SUPABASE_ANON_KEY`

## 2. GitHub에 올리기
1. GitHub에서 **New repository** → 이름 입력 → Create
2. 이 폴더에서:
   ```bash
   git init
   git add .
   git commit -m "사진 전송 PWA"
   git branch -M main
   git remote add origin https://github.com/내아이디/저장소이름.git
   git push -u origin main
   ```

## 3. Vercel 배포
1. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub 저장소 **Import**
2. Framework Preset: **Other** (빌드 설정 없음) → **Deploy**
3. 이후 GitHub에 push할 때마다 자동으로 다시 배포돼요.

## 4. 홈 화면에 추가
- **iPhone (Safari)**: 공유 버튼(□↑) → **홈 화면에 추가**
- **Android (Chrome)**: 오른쪽 위 ⋮ → **앱 설치** 또는 **홈 화면에 추가**

## 5. 동작 확인 체크리스트
- [ ] 모바일에서 [사진 찍기] → 카메라가 열린다
- [ ] 촬영 후 "업로드 중..." → "업로드 성공!" 표시
- [ ] PC에서 같은 주소 열고 [새로고침] → 방금 사진이 맨 앞에 보인다
- [ ] PC에서 [다운로드] → 파일이 저장된다
- [ ] 실패하면: config.js 값, 버킷 이름(`photos`), Public 설정, 정책 SQL을 다시 확인
