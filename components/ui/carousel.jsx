'use client'

import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styled, { css } from 'styled-components'
import { Button } from '@/components/ui/button'

// -------------------- Styled Components --------------------

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  outline: none;
`

const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
`

const CarouselTrack = styled.div`
  display: flex;
  ${({ orientation }) =>
    orientation === 'vertical'
      ? css`
          flex-direction: column;
          margin-top: -1rem;
        `
      : css`
          margin-left: -1rem;
        `}
  transition: transform 0.3s ease;
`

const CarouselSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  ${({ orientation }) =>
    orientation === 'vertical'
      ? css`
          padding-top: 1rem;
        `
      : css`
          padding-left: 1rem;
        `}
`

const NavButtonBase = styled(Button)`
  position: absolute;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PrevButton = styled(NavButtonBase)`
  ${({ orientation }) =>
    orientation === 'horizontal'
      ? css`
          top: 50%;
          left: -3rem;
          transform: translateY(-50%);
        `
      : css`
          top: -3rem;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        `}
`

const NextButton = styled(NavButtonBase)`
  ${({ orientation }) =>
    orientation === 'horizontal'
      ? css`
          top: 50%;
          right: -3rem;
          transform: translateY(-50%);
        `
      : css`
          bottom: -3rem;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        `}
`

// -------------------- Context --------------------

const CarouselContext = createContext(null)

function useCarousel() {
  const ctx = useContext(CarouselContext)
  if (!ctx) throw new Error('useCarousel must be used within <Carousel />')
  return ctx
}

// -------------------- Main Components --------------------

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  )

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((embla) => {
    if (!embla) return
    setCanScrollPrev(embla.canScrollPrev())
    setCanScrollNext(embla.canScrollNext())
  }, [])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <CarouselContainer
        className={className}
        onKeyDownCapture={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </CarouselContainer>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <CarouselViewport ref={carouselRef}>
      <CarouselTrack orientation={orientation} className={className} {...props} />
    </CarouselViewport>
  )
}

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel()
  return <CarouselSlide orientation={orientation} className={className} {...props} />
}

function CarouselPrevious({ className, ...props }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  return (
    <PrevButton
      orientation={orientation}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={className}
      {...props}
    >
      <ArrowLeft size={16} />
      <span className="sr-only">Previous slide</span>
    </PrevButton>
  )
}

function CarouselNext({ className, ...props }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  return (
    <NextButton
      orientation={orientation}
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={className}
      {...props}
    >
      <ArrowRight size={16} />
      <span className="sr-only">Next slide</span>
    </NextButton>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
