function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-app-primary md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-6 text-app-secondary md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
