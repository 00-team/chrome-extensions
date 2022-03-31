fetch('/style.css').then(r =>
    r.text().then(t => chrome.devtools.panels.applyStyleSheet(t))
)
