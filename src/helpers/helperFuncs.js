const hasEmptyValue = (obj) => {
  for(let key in obj) {
    if(key === 'alert') { continue; }
    if(obj[key] === null || obj[key].trim().length === 0) {
      return true;
    }
  }
  return false;
};

export default hasEmptyValue;
