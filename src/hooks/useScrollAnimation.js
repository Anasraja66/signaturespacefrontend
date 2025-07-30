"use client"

import { useEffect, useRef, useState } from "react"

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true, delay = 0 } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              if (triggerOnce) {
                setHasAnimated(true)
              }
            }, delay)
          } else {
            setIsVisible(true)
            if (triggerOnce) {
              setHasAnimated(true)
            }
          }
        } else if (!triggerOnce && !hasAnimated) {
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
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated])

  return [elementRef, isVisible]
}

// Hook for staggered animations (like cards in a grid)
export const useStaggeredAnimation = (itemCount, options = {}) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", staggerDelay = 100 } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [threshold, rootMargin])

  const getItemDelay = (index) => {
    return isVisible ? index * staggerDelay : 0
  }

  return [containerRef, isVisible, getItemDelay]
}

// Hook for slider animations
export const useSliderAnimation = (options = {}) => {
  const sliderRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const { threshold = 0.2, rootMargin = "0px 0px -100px 0px" } = options

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(slider)

    return () => {
      observer.unobserve(slider)
    }
  }, [threshold, rootMargin])

  return [sliderRef, isVisible]
}
