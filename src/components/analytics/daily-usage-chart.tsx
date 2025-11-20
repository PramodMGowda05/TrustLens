'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { dailyUsageData } from '@/lib/data';

export function DailyUsageChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={dailyUsageData}>
        <XAxis
          dataKey="date"
          stroke="hsl(var(--foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(str) => {
            const date = new Date(str);
            return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
          }}
        />
        <YAxis
          stroke="hsl(var(--foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
         <Tooltip
            contentStyle={{
                background: "hsl(var(--background))",
                borderColor: "hsl(var(--border))"
            }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4, fill: "hsl(var(--primary))" }}
          activeDot={{ r: 8, style: { stroke: "hsl(var(--primary))" } }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
