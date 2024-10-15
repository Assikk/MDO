export const convertedSearch = (search) => {
    let filter = ''
    for (let key in search) {
        if (search[key]) {
            filter = filter + `${key}=${search[key]}&`
        }
    }
    return filter
}
