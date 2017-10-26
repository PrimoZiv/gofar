module.exports = function(content) {
    let result = ''
    let rows = content.split(/[\r\n]{1,2}/)

    let inlineHandle = function(str) {
        // Handle *I* **b** `code`
        let boldCount = 0
        let italicCount = 0
        let arr = str.split('`')
        for (let i = 0, len = arr.length; i < len; i++) {
            if (i % 2 === 0) {
                boldCount += arr[i].match(/\*\*/g) ? arr[i].match(/\*\*/g).length : 0
            }
            if (i % 2 === 1) {
                arr[i] = '<span class="inline-code">' + arr[i] + '</span>'
            }
        }
        boldCount = (boldCount % 2 === 1) ? (boldCount - 1) : boldCount
        for (let i = 0, len = arr.length; i < len; i++) {
            if (i % 2 === 0 && boldCount > 0) {
                while (arr[i].match(/\*\*/) && boldCount > 0) {
                    if (boldCount % 2 === 0) {
                        arr[i] = arr[i].replace(/\*\*/, '<strong>')
                    } else {
                        arr[i] = arr[i].replace(/\*\*/, '</strong>')
                    }
                    boldCount--
                }

                italicCount += arr[i].match(/\*/g) ? arr[i].match(/\*/g).length : 0
            }
        }
        italicCount = (italicCount % 2 === 1) ? (italicCount - 1) : italicCount
        for (let i = 0, len = arr.length; i < len; i++) {
            if (i % 2 === 0 && italicCount > 0) {
                while (arr[i].match(/\*/) && italicCount > 0) {
                    if (italicCount % 2 === 0) {
                        arr[i] = arr[i].replace(/\*/, '<em>')
                    } else {
                        arr[i] = arr[i].replace(/\*/, '</em>')
                    }
                    italicCount--
                }
            }
        }
        return arr.join('')
    }

    let codeTag = false
    let codeContent = ''

    let ulTag = false
    let ulClose = false
    let ulContent = ''

    let olTag = false
    let olClose = false
    let olContent = ''

    for (let i = 0, len = rows.length; i < len; i++) {
        let row = rows[i]

        // clear list tag by default.
        if (ulTag) {
            ulTag = false
            ulClose = true
        }
        if (olTag) {
            olTag = false
            olClose = true
        }

        if (/^```/.test(row)) {
            codeTag = !codeTag
            if (codeTag) {
                codeContent += '<pre>'
                continue
            } else {
                codeContent += '</pre>'
                result += codeContent
                codeContent = ''
                continue
            }
        } else if (/^[-*]\s/.test(row)) {
            ulTag = true
            ulClose = false
        } else if (/^[\d]+\.\s/.test(row)) {
            olTag = true
            olClose = false
        } else if (/^>\s/.test(row)) {
            result += '<blockquote>' + inlineHandle(row.replace(/^>[\s]+/, '')) + '</blockquote>'
        } else if (/^\*{3}$/.test(row.trim())) {
            result += '<hr />'
        } else if (/^#/.test(row)) {
            if (/^######/.test(row)) {
                result += '<h6>' + inlineHandle(row.replace(/^[#]+[\s]*/, '')) + '</h6>'
            } else if (/^#####/.test(row)) {
                result += '<h5>' + inlineHandle(row.replace(/^[#]+[\s]*/, '')) + '</h5>'
            } else if (/^####/.test(row)) {
                result += '<h4>' + inlineHandle(row.replace(/^[#]+[\s]*/, '')) + '</h4>'
            } else if (/^###/.test(row)) {
                result += '<h3>' + inlineHandle(row.replace(/^[#]+[\s]*/, '')) + '</h3>'
            } else if (/^##/.test(row)) {
                result += '<h2>' + inlineHandle(row.replace(/^[#]+[\s]*/, '')) + '</h2>'
            } else if (/^#/.test(row)) {
                result += '<h1>' + inlineHandle(row.replace(/^[#]+[\s]*/, '')) + '</h1>'
            }
        } else if (!codeTag) {
            result += inlineHandle(row)
        }

        if (codeTag) {
            codeContent += row + '<br />'
        } else if (ulClose || ulTag) {
            if (ulTag) {
                ulContent = ulContent === '' ? '<ul>' : ulContent
                ulContent += '<li>' + inlineHandle(row.replace(/^[-*][\s]+/, '')) + '</li>'
            }
            if (ulClose) {
                ulContent += '</ul>'
                result += ulContent
                ulContent = ''
                ulClose = false
            }
        } else if (olClose || olTag) {
            if (olTag) {
                olContent = olContent === '' ? '<ol>' : olContent
                olContent += '<li>' + inlineHandle(row.replace(/^[\d]+\.[\s]+/, '')) + '</li>'
            }
            if (olClose) {
                olContent += '</ol>'
                result += olContent
                olContent = ''
                olClose = false
            }
        }
    }
    return result
}
