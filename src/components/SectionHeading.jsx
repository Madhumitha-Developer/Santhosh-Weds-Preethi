export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center space-y-2">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <div className="w-12 h-0.5 bg-gold mx-auto mt-1" />
    </div>
  )
}
