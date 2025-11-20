'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { languageDistributionData } from '@/lib/data';

export function LanguageDonut() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Tooltip 
            contentStyle={{
                background: "hsl(var(--background))",
                borderColor: "hsl(var(--border))"
            }}
        />
        <Pie
          data={languageDistributionData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={70}
          dataKey="value"
          paddingAngle={5}
        >
          {languageDistributionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}
