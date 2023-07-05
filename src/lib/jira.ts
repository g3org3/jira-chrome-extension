declare global {
    interface Window { chrome: any; }
}

window.chrome = window.chrome || {};
var chrome = window.chrome

export function getSprints() {
    return new Promise((resolve) => {
        const code = `
        function _getSprints() {
            const sprintsDom = Array.from(document.querySelectorAll('.ghx-backlog-container'))
            const sprints = sprintsDom.map(sprintDom => {
                const span = sprintDom.querySelector('.field-value')
                if (!span) return null;

                return { name: span.innerText, isHidden: sprintDom.style.display === 'none' }
            })

            return sprints.filter(Boolean)
        }
        _getSprints()
        `
    
        chrome.tabs.getSelected(null, tab => chrome.tabs.executeScript(tab.id, { code }, (result) => resolve(result[0])))
    })
}

export function hideAllSprints() {
    return new Promise((resolve) => {
        const code = `
        function _hideAllSprints() {
            const sprintsDom = Array.from(document.querySelectorAll('.ghx-backlog-container'))
            const sprints = sprintsDom.forEach(sprintDom => {
                const span = sprintDom.querySelector('.field-value')
                if (!span) return null;

                sprintDom.style.display = 'none'
            })
        }
        _hideAllSprints()
        `
    
        chrome.tabs.getSelected(null, tab => chrome.tabs.executeScript(tab.id, { code }, (result) => resolve(result[0])))
    })
}

export function toggleSprint(name: string) {
    return new Promise((resolve) => {
        const code = `
        function _toggleSprint() {
            const sprintsDom = Array.from(document.querySelectorAll('.ghx-backlog-container'))
            const sprints = sprintsDom.forEach(sprintDom => {
                const span = sprintDom.querySelector('.field-value')
                if (!span) return;
                if (span.innerText !== "${name}") return;
                
                const isHidden = sprintDom.style.display === 'none'
                if (isHidden) {
                    sprintDom.style.display = 'block'
                } else {
                    sprintDom.style.display = 'none'
                }
            })
        }
        _toggleSprint()
        `
    
        chrome.tabs.getSelected(null, tab => chrome.tabs.executeScript(tab.id, { code }, (result) => resolve(result[0])))
    })
}

export function collapseAll() {
    
    const code = `
    function collapse() {
        var buttonSelector = 'button.ghx-expander'
        var buttons = Array.from(document.querySelectorAll(buttonSelector))
        var buttonsFiltered = buttons.filter(button => {
            return button.ariaExpanded === 'true'
        })
        for (let button of buttonsFiltered) {
            button.click()
        }
    }
    collapse()
    `

    chrome.tabs.getSelected(null, tab => chrome.tabs.executeScript(tab.id, { code }))
}

export function expandAll() {
    
    const code = `
    function expand() {
        var buttonSelector = 'button.ghx-expander'
        var buttons = Array.from(document.querySelectorAll(buttonSelector))
        var buttonsFiltered = buttons.filter(button => {
            return button.ariaExpanded === 'false'
        })
        for (let button of buttonsFiltered) {
            button.click()
        }
    }
    expand()
    `

    chrome.tabs.getSelected(null, tab => chrome.tabs.executeScript(tab.id, { code }))
}
