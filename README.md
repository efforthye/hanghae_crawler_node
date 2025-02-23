
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
---
<br/><br/>

## Result Structure
- Raw 데이터 구조
    ```json
    [
        {
            "assignmentId": "...", // 과제 ID
            "name": "...", // 과제명
            "startDate": "...", // 시작일
            "endDate": "...", // 종료일
            "assignments": [ // 전체 제출 데이터
                {
                    "_id": "...", // 제출 ID
                    "result": "PASS/FAIL", // 통과 여부
                    "isBestPractice": false, // Best Practice 여부
                    "name": "...", // 제출자 이름
                    "badge": "...", // 뱃지 정보
                    "stackToLearn": "...", // 학습 스택
                    "totalAssignmentProgress": [...], // 전체 과제 진행 현황
                    "answers": [ // 과제 답변
                        {
                            "question": {
                                "_id": "...",
                                "name": "...", // 질문명
                                "placeholder": "...", // 입력 가이드
                                "createdAt": "...", // 생성일
                                "updatedAt": "..." // 수정일
                            },
                            "answer": "..." // 답변 내용
                        }
                    ],
                    "feedback": "...", // 피드백 내용
                    "enrolledId": "..." // 등록 ID
                }
            ]
        }
    ]
    ```
- 가공된 데이터 구조
    ```json
    [
        {
            "assignmentId": "...", // 과제 ID
            "name": "...", // 과제명
            "startDate": "...", // 시작일
            "endDate": "...", // 종료일
            "submissions": [ // 제출 데이터
                {
                    "result": "PASS/FAIL", // 통과 여부
                    "name": "...", // 제출자 이름
                    "stackToLearn": "...", // 학습 스택
                    "feedback": "...", // 피드백
                    "answer": "...", // 제출 URL
                    "isBestPractice": true // Best Practice 여부 (있는 경우)
                }
            ]
        }
    ]
    ```
