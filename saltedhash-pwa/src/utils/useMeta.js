export function useMeta(title, description) {
  document.title = title
  const ensureMeta = (name, value, isProperty = false) => {
    const key = isProperty ? 'property' : 'name'
    let el = document.querySelector(`meta[${key}="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(key, name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', value)
  }

  ensureMeta('description', description)
  ensureMeta('og:title', title, true)
  ensureMeta('og:description', description, true)
  ensureMeta('og:type', 'website', true)
}
