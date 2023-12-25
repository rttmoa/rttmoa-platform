const Cookie = 
`// 由于localStorage有些不兼容所以采用store，你也可以使用cookie
import Cookie from 'js-cookie' // TODO: js-cookie
const userKey = "react_admin_xiyan";

  
//设置用户信息
export function setUser(user) {
    // 失效时间是24小时
    let time = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    Cookie.set(userKey, JSON.stringify(user), {expires: time})
}

//获取用户信息
export function getUser() {
    if (Cookie.get(userKey)) {
        return JSON.parse(Cookie.get(userKey))
    }
}

//删除用户信息
export function removeUser() {
    Cookie.remove(userKey)
}`
export default Cookie