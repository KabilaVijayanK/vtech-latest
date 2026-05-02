export const VLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <img 
    src="/logo.png"
    alt="V Tech Logo"
    className={className}
  />
);

export const Wordmark = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    
    {/* 👇 size inga control aagum */}
    <VLogo className="h-14 w-14" />

    <div className="leading-none">
      <div className="font-display font-bold text-xl tracking-tight text-ink">
        V TECH<span className="text-primary"> INDUSTRIES</span>
      </div>
      <div className="font-label text-[9px] text-ink-muted mt-0.5">
        Solution Partner for Your Process
      </div>
    </div>
  </div>
);