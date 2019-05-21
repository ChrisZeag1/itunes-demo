module.exports = {
  sortBy: (data, type) =>  Array.isArray(data) ?  
    data.reduce((obj, current, index) => 
      Object.assign(obj, { [current[type]]:
        Array.isArray(obj[current[type]]) ?
          obj[current[type]].concat(current) : 
            [].concat(current)
       })
    , {}) : data 
}
