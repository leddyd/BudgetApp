export function brandEnter() {
    const target = document.querySelector('.bi-wallet')

    if (target) {
    target.classList.remove('bi-wallet')
    target.classList.add('bi-wallet2')
    }
}
  
export function brandLeave() {
    const target = document.querySelector('.bi-wallet2')

    if (target) {
        target.classList.remove('bi-wallet2')
        target.classList.add('bi-wallet')
    }
}