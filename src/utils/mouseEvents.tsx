export function ChangeIcon(query:string, old:string, replace:string) {
    const target = document.querySelector(query)

    if (target) {
        target.classList.remove(old)
        target.classList.add(replace)
    }
}