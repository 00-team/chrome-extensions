var download_group
var modal
var img_holder

var show_interval

var observer = new MutationObserver(m =>
    m.forEach(r => {
        if (r.type == 'attributes' && r.attributeName == 'style') {
            if (modal.style.display == 'none') {
                hide()
            } else {
                show()
            }
        }
    })
)

function show() {
    if (download_group) download_group.remove()

    let in_interval = false

    show_interval = setInterval(async () => {
        if (in_interval) return

        in_interval = true
        if (
            download_group &&
            img_holder &&
            img_holder.contains(download_group)
        ) {
            clearInterval(show_interval)
            show_interval = undefined
            return
        }

        img_holder = modal.querySelector('figure div.img_holder')
        let img = img_holder.querySelector('picture img')
        if (!img) {
            in_interval = false
            return
        }

        let uuid = new URL(img.src).pathname
        uuid = uuid.slice(uuid.indexOf('assets') + 7)
        uuid = uuid.slice(0, uuid.indexOf('/'))

        let res = await fetch('/api/v1/assets/' + uuid + '?format=json')
        let data = await res.json()

        if (!data.isFree) {
            clearInterval(show_interval)
            show_interval = undefined
            if (download_group) download_group.remove()

            return
        }

        download_group = document.createElement('div')

        let filename = data.name.replace(' ', '-').toLowerCase() + '.blend'

        data.files.forEach(f => {
            if (f.fileType == 'thumbnail') return

            let b = document.createElement('a')
            b.className = 'btn btn-default btn-free'

            let text = f.fileType
            if (text == 'blend') {
                text = 'default'
            } else {
                text = text.replace('resolution_', '').replace('_', '.')
            }

            b.textContent = text
            b.onclick = async () => {
                let url = new URL(f.downloadUrl)
                url.searchParams.set('scene_uuid', uuid)
                url.searchParams.set('format', 'json')
                let res = await fetch(url)
                let data = await res.json()
                await chrome.runtime.sendMessage({
                    type: 'download',
                    filename,
                    url: data.filePath,
                })
            }
            download_group.appendChild(b)
        })

        download_group.style = `
            top: 0;
            position: absolute;
            width: fit-content;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            padding: 0.4rem;
        `

        img_holder.appendChild(download_group)

        in_interval = false
    }, 250)
}

function hide() {
    clearInterval(show_interval)
    show_interval = undefined

    if (download_group) download_group.remove()
    download_group = undefined
}

let modal_interval = setInterval(() => {
    modal = document.querySelector('div#assetModalDetail')
    if (modal) {
        observer.observe(modal, { attributes: true })
        clearInterval(modal_interval)
        return
    }
}, 250)
