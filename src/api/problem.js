import request from '@/utils/request'
import qs from 'qs'

export function getProbList() {
  const data={
    //elements取两层
    query:`{
      problemCatalog (region:"global",problemsPerPage:10) {
        elements {
          id
          title
          tags
          difficulty
          acceptRate
        }
      }
    }`
  }
  // console.log(data)
  return request({
    url: '/graphql',
    method: 'post',
    data
    // qs.stringify(data),
    // headers:{
    //   'content-type':'application/x-www-form-urlencoded'
    // }
  })
}

export function getProblem(id){
  const data={
    query:`{
      problem (id:`+id+`,region:"global"){
        id
        title
        problem {
          description
          inputExplain
          outputExplain
          examples {
            inputExample
            outputExample
          }
          hint
          maxCpuTime
          maxMemory
        }
        tags
        sources
        difficulty
        acceptTimes
        submitTimes
        acceptRate
        defaultMaxMemory
        defaultMaxCpuTime
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

