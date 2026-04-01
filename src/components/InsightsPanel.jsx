function getToneClasses(tone) {
  if (tone === 'rose') return 'from-rose-500/20 to-rose-500/5 border-rose-400/20'
  if (tone === 'green') return 'from-emerald-500/20 to-emerald-500/5 border-emerald-400/20'
  if (tone === 'amber') return 'from-amber-500/20 to-amber-500/5 border-amber-400/20'
  if (tone === 'teal') return 'from-accent/20 to-accent/5 border-accent/20'
  return 'from-white/10 to-white/5 border-white/10'
}

function InsightsPanel({ insights }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {insights.map((insight, index) => (
        <article
          key={insight.title}
          className={`panel-grid shine-card card-hover animate-fadeUp border bg-gradient-to-br p-5 sm:p-6 ${getToneClasses(
            insight.tone,
          )}`}
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <p className="text-sm font-medium text-app-secondary">{insight.title}</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-app-primary">{insight.value}</h3>
          <p className="mt-3 text-sm leading-6 text-app-secondary">{insight.detail}</p>
        </article>
      ))}
    </div>
  )
}

export default InsightsPanel
