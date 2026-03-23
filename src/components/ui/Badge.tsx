type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-700',
};

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
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
