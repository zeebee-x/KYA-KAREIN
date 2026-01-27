import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const FilterChip = ({ label, active, onClick, icon }: FilterChipProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        'border whitespace-nowrap',
        active
          ? 'bg-primary text-primary-foreground border-primary shadow-soft'
          : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted'
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </motion.button>
  );
};
