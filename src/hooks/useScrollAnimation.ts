import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll("[data-animate]")
    if (children.length === 0) {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      )
      return
    }

    children.forEach((child, i) => {
      gsap.fromTo(
        child,
        { y: 40 + (parseInt((child as HTMLElement).dataset.delay || "0") * 10), opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      )
    })
  }, [])

  return ref
}

export function useStaggerAnimation<T extends HTMLElement>(stagger = 0.1) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.children
    gsap.fromTo(
      children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    )
  }, [stagger])

  return ref
}
