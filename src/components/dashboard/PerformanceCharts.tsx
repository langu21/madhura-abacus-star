import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function PerformanceCharts({ data }: { data: any[] }) {
  // Mock data if no real sessions
  const chartData = data.length > 0 ? [...data].reverse().map((s, i) => ({
    name: `Session ${i + 1}`,
    accuracy: s.accuracy,
    speed: 100 - (s.speed || 0) * 10, // Inverse speed for chart
  })) : [
    { name: 'S1', accuracy: 65, speed: 40 },
    { name: 'S2', accuracy: 72, speed: 45 },
    { name: 'S3', accuracy: 68, speed: 50 },
    { name: 'S4', accuracy: 84, speed: 55 },
    { name: 'S5', accuracy: 80, speed: 65 },
    { name: 'S6', accuracy: 92, speed: 70 },
    { name: 'S7', accuracy: 88, speed: 80 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00B894" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#00B894" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorSpd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(200,200,200,0.1)" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
        />
        <YAxis 
          hide 
          domain={[0, 100]} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255,255,255,0.9)', 
            borderRadius: '16px', 
            border: 'none', 
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="accuracy" 
          stroke="#00B894" 
          strokeWidth={4}
          fillOpacity={1} 
          fill="url(#colorAcc)" 
          animationDuration={2000}
        />
        <Area 
          type="monotone" 
          dataKey="speed" 
          stroke="#FFD54F" 
          strokeWidth={4}
          fillOpacity={1} 
          fill="url(#colorSpd)" 
          animationDuration={2500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
