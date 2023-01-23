let selecters = document.querySelectorAll('.selecter');
let shape = $$('#shape')

selecters.forEach(el => {
    el.addEventListener('mousedown', mouseD)
})

function mouseD() {
    event.target.classList.add('active')
    document.addEventListener('mousemove', mouseM)
    document.addEventListener('mouseup', mouseU)
    document.addEventListener('touchmove', mouseM)
    document.addEventListener('touchend', mouseU)
    document.body.style.setProperty('user-select', 'none')
}

function mouseM() {
    let e = event.type == "touchmove" ? event.touches[0] : event
    let el = document.querySelector('.active')
    let vt = e.clientY - el.parentElement.offsetTop
    let hz = e.clientX - el.parentElement.offsetLeft
    let w = shape.offsetWidth
    let h = shape.offsetHeight
    vt = vt < 0 ? 0 : vt
    vt = vt > h ? h : vt
    hz = hz < 0 ? 0 : hz
    hz = hz > w ? w : hz


    if (el.classList.contains("hr"))
        el.style.left = (hz / w * 100).toFixed() + '%';

    if (el.classList.contains("vt"))
        el.style.top = (vt / h * 100).toFixed() + '%';


    let tl = ($$('#topLeft').offsetLeft / w * 100).toFixed()
    let tr = ($$('#topRight').offsetLeft / w * 100).toFixed()
    let rt = ($$('#rightTop').offsetTop / h * 100).toFixed()
    let rb = ($$('#rightBottom').offsetTop / h * 100).toFixed()
    let bl = ($$('#bottomLeft').offsetLeft / w * 100).toFixed()
    let br = ($$('#bottomRight').offsetLeft / w * 100).toFixed()
    let lt = ($$('#leftTop').offsetTop / h * 100).toFixed()
    let lb = ($$('#leftBottom').offsetTop / h * 100).toFixed()
    setBorder(tl, tr, rt, rb, bl, br, lt, lb)

}

function mouseU() {
    document.removeEventListener('mousemove', mouseM)
    document.removeEventListener('mouseup', mouseU)
    document.removeEventListener('touchmove', mouseM)
    document.removeEventListener('touchend', mouseU)
    document.querySelector('.active').classList.remove('active')
    document.body.style.removeProperty('user-select')
}

function setBorder(tl = 10, tr = 90, rt = 10, rb = 90, bl = 10, br = 90, lt = 10, lb = 90) {
    let bdr = `${tl}% ${100 - tr}% ${100 - br}% ${bl}% / ${lt}% ${rt}% ${100 - rb}%  ${100 - lb}% `;

    shape.style.borderRadius = bdr;
    $$('.bdr p').innerText = bdr;
} setBorder()

$$('.bdr button').onclick = e => {
    // navigator.clipboard.writeText(e.target.parentElement.innerText.replace('copy',''))
    navigator.clipboard.writeText(e.target.previousElementSibling.innerText)
}

function $$(s) {
    return document.querySelector(s)
}
