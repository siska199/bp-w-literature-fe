export const handleDownloadFile = (params) => {
    const { url, filename } = params
  
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename || 'file'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }