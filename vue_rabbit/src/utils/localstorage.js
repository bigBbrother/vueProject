export function set(key, value, expires) {
    const storage = {}
    storage[key] = {
        value,
        expires: expires ? expires * 1000 * 60 + Date.now() : null
    }
    //localStorage.setItem(key, JSON.stringify(storage))
    localStorage.setItem(key, encodeURIComponent(JSON.stringify(storage)))
}

export function get(key) {
    //const value = JSON.parse(localStorage.getItem(key))
    const value = JSON.parse(decodeURIComponent(localStorage.getItem(key)))
    if (value) {
        let expires = value[key].expires
        if (!expires) {
            return value
        }
        if (Date.now() <= expires) {
            //没有过期
            return value
        } else {
            //过期
            localStorage.removeItem(key)
            return null
        }
    } else {
        return null
    }


}
