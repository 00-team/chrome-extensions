for (let v of document.querySelectorAll('video')) {
    if (!v.duration || v.readyState < 3) continue
    v.currentTime += 88
}
