helperGetCookie = (app,module,cname) ->
    name = cname + '='
    ca = document.cookie.split(';')
    i = 0
    while i < ca.length
        c = ca[i]
        while c.charAt(0) == ' '
            c = c.substring(1)
        if c.indexOf(name) == 0
            return JSON.parse(c.substring(name.length, c.length))
        i++
    return

export default helperGetCookie