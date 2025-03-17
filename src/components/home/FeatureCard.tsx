'use client';

import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  reverse?: boolean;
}

export function FeatureCard({
  title,
  description,
  features,
  icon,
  bgColor,
  iconColor,
  reverse = false,
}: FeatureCardProps) {
  const iconContainer = (
    <div className={`md:w-1/2 ${bgColor} p-8 rounded-xl shadow-md`}>
      <div className="h-48 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );

  const textContainer = (
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-lg text-gray-600 mb-4">{description}</p>
      <ul className="text-gray-600 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
      {iconContainer}
      {textContainer}
    </div>
  );
} 