import { useEffect, useRef } from 'react'

export default function PetalCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let raf

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const make = () => {
      const p = {}
      p.reset = () => {
        p.x = Math.random() * width
        p.y = Math.random() * -height
        p.size = Math.random() * 5 + 3
        p.vy = Math.random() * 0.8 + 0.4
        p.vx = Math.random() * 0.5 - 0.25
        p.opacity = Math.random() * 0.5 + 0.3
        p.rot = Math.random() * 360
        p.vr = Math.random() - 0.5
      }
      p.reset()
      return p
    }
    const count = width < 640 ? 14 : 26
    const petals = Array.from({ length: count }, make)

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of petals) {
        p.y += p.vy
        p.x += p.vx
        p.rot += p.vr
        if (p.y > height + 20) p.reset()
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, 2 * Math.PI)
        ctx.fillStyle = `rgba(235, 180, 75, ${p.opacity})`
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-20" aria-hidden="true" />
}
