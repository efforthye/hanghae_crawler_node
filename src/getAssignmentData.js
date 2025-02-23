// node src/getAssignmentData.js
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function fetchAndSaveAssignments() {
    try {
        const userId = process.env.USER_ID;
        const headers = {'Cookie': `userinfo=_id=${userId}&birthyear=""`};

        // 첫 번째 API에서 과제 목록 가져오기
        const response = await axios.get('https://hanghae99.spartacodingclub.kr/_next/data/tLBnFT7p_99AORrtodjRT/assignments.json', {
            headers
        });
        const initialData = response.data;
        
        // 결과 배열 초기화
        const results = [];

        // assignmentList의 각 항목에 대해 처리
        for (const assignment of initialData.pageProps.assignmentList) {
            const assignmentInfo = assignment?.assignment;
            const {_id: assignmentId, name, startDate, endDate} = assignmentInfo;

            // 각 과제에 대한 기본 객체 생성
            const assignmentResult = {
                assignmentId,
                name,
                startDate,
                endDate,
                submissions: []
            };

            // 두 번째 API 호출하여 상세 데이터 가져오기
            const detailResponse = await axios.get(`https://api-hanghae99.spartacodingclub.kr/v3/assignment-users/total-status/${assignmentId}`, {
                headers
            });
            const detailData = detailResponse?.data?.data;
            
            if (detailData) {
                // 각 제출에 대해 필요한 정보만 추출
                assignmentResult.submissions = detailData.map(submission => {
                    const submissionData = {
                        result: submission.result,
                        name: submission.name,
                        stackToLearn: submission.stackToLearn,
                        feedback: submission.feedback,
                        answer: submission.answers?.[0]?.answer || ''
                    };

                    // BestPractice가 true인 경우만 해당 필드 추가
                    if (submission.isBestPractice) {
                        submissionData.isBestPractice = true;
                    }

                    return submissionData;
                });
            }

            results.push(assignmentResult);
        }

        // results 디렉토리가 없으면 생성
        if (!fs.existsSync('results')) fs.mkdirSync('results');

        // 결과를 JSON 파일로 저장
        fs.writeFileSync('results/assignments.json', JSON.stringify(results, null, 2));
        console.log('데이터가 성공적으로 저장되었습니다.');

        // Best Practice 개수 출력
        const bpCount = results.reduce((count, assignment) => {
            return count + assignment.submissions.filter(s => s.isBestPractice).length;
        }, 0);
        console.log(`총 ${bpCount}개의 Best Practice가 있습니다.`);

    } catch (error) {
        console.error('에러 발생:', error.response?.data || error.message);
    }
}

// 함수 실행
fetchAndSaveAssignments();