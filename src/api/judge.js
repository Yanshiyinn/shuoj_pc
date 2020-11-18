import request from '@/utils/request'
import qs from 'qs'

export function judge(data) {
  // console.log(data)
  return request({
    url: '/judge_server/submit',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}

export function getStatus(region, countPerPage, pageNumber, 
  userID = null, problemID = null, 
  problemTitle = null, username = null, language = null) {
  const data={
    query:`{
      statusCatalog(
        region:"`+region+`",
        countPerPage:`+countPerPage+`,
        pageNumber:`+pageNumber+`,
        problemId: `+problemID+`,
        userId:`+userID+`,
        username:`+username+`,
        problemTitle:`+problemTitle+`,
        language: `+language+`,
      ) {
        totalCount
        elements {
          id
          owner {
            id
            username
          }
          problem {
            id
            title
          }
          language
          state
          judgeType
          score
          submitTime
          startPendTime
          finishTime
        }
      }
    }`
  }
  // console.log(data)
  return request({
    url: '/graphql',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/me',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
