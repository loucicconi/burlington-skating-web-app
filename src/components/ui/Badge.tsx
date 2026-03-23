type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green:  'bg-[#e6f7ee] text-[#007a38] ring-1 ring-[#00a94f]/30',
  yellow: 'bg-[#fff8e6] text-[#996500] ring-1 ring-[#ffc425]/40',
  red:    'bg-red-50 text-red-700 ring-1 ring-red-200',
  blue:   'bg-[#e6f0f8] text-[#005596] ring-1 ring-[#005596]/20',
  gray:   'bg-slate-50 text-slate-600 ring-1 ring-slate-200',
};

const dotClasses: Record<BadgeVariant, string> = {
  green:  'bg-[#00a94f]',
  yellow: 'bg-[#ffc425]',
  red:    'bg-red-500',
  blue:   'bg-[#005596]',
  gray:   'bg-slate-400',
};

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClasses[variant]}`} />
      {children}
    </span>
  );
}

export function SpotsBadge({ spotsText, isFull }: { spotsText: string; isFull: boolean }) {
  if (isFull) return <Badge variant="red">Full</Badge>;
  const match = spotsText.match(/^(\d+)/);
  const count = match ? parseInt(match[1]) : null;
  if (count === null) return <Badge variant="gray">{spotsText}</Badge>;
  if (count <= 5) return <Badge variant="yellow">{spotsText}</Badge>;
  return <Badge variant="green">{spotsText}</Badge>;
}
