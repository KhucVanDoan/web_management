import { useEffect } from 'react'

export const useIntersectionObserver = ({
  root,
  target,
  onIntersect = () => {},
  onScrollUp = () => {},
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}) => {
  useEffect(() => {
    if (!target?.current) return

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enabled && onIntersect()
          } else {
            onScrollUp()
          }
        }),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    )

    const el = target && target.current
    if (!el) {
      return
    }

    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [target?.current, enabled, onIntersect])
}
