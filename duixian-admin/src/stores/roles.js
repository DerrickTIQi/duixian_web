  // 获取用户信息
  export const checkRoles = (roles) => {
    let _have=0
    for (var i=0;i<roles.length;i++)
        { 
            if (localStorage.roles.includes(roles[i])){
                _have=_have+1
            }
        }
    if (_have !==0){
        return true
    }else{
        return false
    }
    // return _have
  }

  export const checkUtype = (utype) => {
    try {
      if (localStorage.utype && localStorage.utype.includes(utype)) {
        
        return true;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    return false;
  }