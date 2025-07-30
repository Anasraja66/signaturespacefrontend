"use client"

import { useEffect, useRef, useState } from "react"

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px", triggerOnce = true } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return [elementRef, isVisible]
}

export const useStaggeredAnimation = (itemCount, options = {}) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px", staggerDelay = 100 } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [threshold, rootMargin])

  const getItemDelay = (index) => {
    return isVisible ? index * staggerDelay : 0
  }

  return [containerRef, isVisible, getItemDelay]
}
