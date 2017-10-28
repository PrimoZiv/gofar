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
                if (/!\[[^[\]]+\]\([^()]+\)/g.test(arr[i])) {
                    arr[i] = arr[i].replace(/!\[([^[\]]+)\]\(([^()]+)\)/, function(all, m1, m2) {
                        return '<img src="' + m2 + '" alt="' + m1 + '">'
                    })
                }
                if (/\[[^[\]]+\]\([^()]+\)/g.test(arr[i])) {
                    arr[i] = arr[i].replace(/\[([^[\]]+)\]\(([^()]+)\)/, function(all, m1, m2) {
                        return '<a href="' + m2 + '">' + m1 + '</a>'
                    })
                }
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
    let isList = function(str) {
        if (/^\s+[-*]\s/.test(str)) {
            return 'iul'
        } else if (/^\s+[\d]+\.\s/.test(str)) {
            return 'iol'
        } else if (/^[-*]\s/.test(str)) {
            return 'ul'
        } else if (/^[\d]+\.\s/.test(str)) {
            return 'ol'
        }
        return false
    }
    let listHandle = function(rows, type) {
        let content = ''
        let startTag = type === 'ul' ? '<ul>' : '<ol>'
        let endTag = type === 'ul' ? '</ul>' : '</ol>'

        for (let i = 0, len = rows.length; i < len; i++) {
            let row = rows[i]
            if (i === 0) {
                content += startTag
            }

            if (/^\s/.test(row)) {
                let t = isList(row)
                let j = i + 1
                let tmpRows = [row.trim()]
                while (isList(rows[j]) === t) {
                    tmpRows.push(rows[j].trim())
                    i = j
                    j++
                }
                content += listHandle(tmpRows, t.slice(1))
                tmpRows = []
            } else {
                if (type === 'ul') {
                    content += '<li>' + inlineHandle(row.replace(/^[-*][\s]+/, '')) + '</li>'
                } else {
                    content += '<li>' + inlineHandle(row.replace(/^[\d]+\.[\s]+/, '')) + '</li>'
                }
            }

            if (i === len - 1) {
                content += endTag
            }
        }
        return content
    }

    let codeTag = false
    let codeContent = ''

    let ulRows = []
    let olRows = []

    for (let i = 0, len = rows.length; i < len; i++) {
        let row = rows[i]

        if (!/^```/.test(row) && codeTag) {
            codeContent += row + '\r\n'
            continue
        }

        if (/^```/.test(row)) {
            codeTag = !codeTag
            if (codeTag) {
                codeContent += '<pre><code class="' + row.slice(3) + '">'
                continue
            } else {
                codeContent += '</code></pre>'
                result += codeContent
                codeContent = ''
                continue
            }
        } else if (isList(row) === 'ul' || (isList(row) !== false && isList(row) !== 'ol' && ulRows.length > 0)) {
            let type = isList(rows[i + 1])
            ulRows.push(row)
            if (type === false || type === 'ol') {
                result += listHandle(ulRows, 'ul')
                ulRows = []
            }
            continue
        } else if (isList(row) === 'ol' || (isList(row) !== false && isList(row) !== 'ul' && olRows.length > 0)) {
            let type = isList(rows[i + 1])
            olRows.push(row)
            if (type === false || type === 'ul') {
                result += listHandle(olRows, 'ol')
                olRows = []
            }
            continue
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
            result += '<p>' + inlineHandle(row) + '</p>'
        }
    }
    return result
}
