import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {TechStackItem} from "@/lib/types.ts";

interface TechStackChartProps {
    data: TechStackItem[];
}

export function TechStackChart({ data }: TechStackChartProps) {
    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip
                        formatter={(value:any) => [`${value}%`, '숙련도']}
                        labelStyle={{ color: '#1e293b' }}
                    />
                    <Bar dataKey="percentage" fill="hsl(217, 91%, 60%)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
