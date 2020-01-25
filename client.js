//client saving js
   //REM: COOKIES TEST
   if (filename.includes("cookietest")){
    res.setHeader('Content-Type', 'text/plain')
    if (!lastVisit) {
      
      return res.end('Welcome, first time visitor!')
    } else {
      
      return res.end('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.')
    }
}
if (filename.includes("cookieclear")){
  res.setHeader('Content-Type', 'text/plain')
  cookies.set('COOKIE CLEARED: LastVisit', new Date().toISOString(), { signed: true })
  return res.end('Cookie CLeared!')
}
//END COOKIES TEST