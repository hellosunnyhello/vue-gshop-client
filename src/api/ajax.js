import axios from 'axios'

export default function (url,data={},method='GET') {
  return new Promise((resolve,reject)=>{
    let promise = null
    if(method==='GET'){
      let subUrl = ''
      for (var key in data){
        subUrl += key + '=' + data[key] + '&'
      }
      if(subUrl !== ''){
        subUrl = subUrl.substring(0,subUrl.length-1)
        url = url + '?' + subUrl
      }
      promise = axios.get(url)
    }else {
      promise = axios.post(url,data)
    }

    promise
      .then(response=>resolve(response.data))
      .catch(error=>reject(error))

  })

}

