
import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon, 
  subtitle, 
  trend, 
  trendValue 
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500 dark:text-green-400';
      case 'down': return 'text-red-500 dark:text-red-400';
      default: return 'text-slate-500 dark:text-slate-400';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
      case 'down': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              {label}
            </h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && trendValue && (
              <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
