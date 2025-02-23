
## 프로젝트 실행 방법
### 1. Install Dependencies
- $`npm install`
### 2. Setup Environment
- `.env.example`을 참고하여 `.env` 설정
### 3. Run Scripts
```bash
# Raw 데이터 수집
node src/getAllAssignmentData.js
# 가공된 데이터 수집
node src/getAssignmentData.js
```
### 4. Check Results
- Raw 데이터: results/allAssignments.json
- 가공된 데이터: results/assignments.json