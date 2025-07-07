import React from "react";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  delay?: number;
}

  const StepCard: React.FC<StepCardProps> = ({ step, title, description, delay = 0 }) => (
    <div 
      className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up max-w-[370px]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
        {step}
      </div>
      <p className="text-xl font-semibold text-gray-800 mb-2 mt-2">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );


  export default StepCard;