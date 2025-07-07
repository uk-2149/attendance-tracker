import { LucideIcon } from "lucide-react";
import React from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  visibleSection?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <div
      className={`relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up flex flex-col justify-center items-center md:items-start`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon container */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-red-400 rounded-xl flex items-center justify-center mb-5 shadow-md">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </div>

      {/* Title */}
      <p className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight leading-snug">
        {title}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-md leading-relaxed text-center md:text-left">
        {description}
      </p>

      {/* Optional glow border (not visible unless you apply a group class) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] transition-shadow duration-300"></div>
    </div>
  );
};

export default FeatureCard;
