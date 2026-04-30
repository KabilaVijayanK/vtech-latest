export const VLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
    <path d="M4 6 L20 34 L36 6 L28 6 L20 22 L12 6 Z" fill="hsl(var(--primary))" />
    <path d="M14 6 L20 16 L26 6 Z" fill="hsl(var(--primary-dark))" />
  </svg>
);

export const Wordmark = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <VLogo className="h-8 w-8" />
    <div className="leading-none">
      <div className="font-display font-bold text-xl tracking-tight text-ink">
        V TECH<span className="text-primary"> INDUSTRIES</span>
      </div>
      <div className="font-label text-[9px] text-ink-muted mt-0.5">Solution Partner for Your Process</div>
    </div>
  </div>
);
