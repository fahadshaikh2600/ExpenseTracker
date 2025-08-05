
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ["#344bfd", "#f4a79d",
    "#40ca36ff",
    "#8e44ad",
    "#00bcd4",
    "#ff6b6b",
    "#ffc107",
    "#009688",
    "#9c27b0",
    "#607d8b",
    "#3f51b5",
    "#795548",
    "#e91e63",
    "#4caf50",];

export const Charts = ({ data }) => {
    const categoryData = data.reduce((acc, curr) => {
        const cat = curr.category;
        const amt = Number(curr.amount);
        const existing = acc.find((d) => d.name === cat);
        if (existing) existing.value += amt;
        else acc.push({ name: cat, value: amt });
        return acc;
    }, []);

    return (
        <div className="charts-container">


            <div className="pie-container">

                <h3>Expenses  Charts</h3>

                <ResponsiveContainer width={450} height={260}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={45}
                            outerRadius={100}
                            labelLine={false}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}

                        </Pie>
                        <Tooltip />
                    </PieChart>

                </ResponsiveContainer>
                <div className="center-label">All</div>


            </div>

            <div className="line-container">
                <h3>Expenses  Tracker</h3>
                <ResponsiveContainer width={400} height={400}>
                    <BarChart width={500}
                        height={300}
                        data={categoryData}
                        barGap={-60} >

                        <XAxis dataKey="name" />
                        <YAxis hide
                        />
                        <Tooltip />
                        <Legend />
                        <Bar fill="#E5E7EB" barSize={60} radius={[10, 10, 10, 10]} />
                        <Bar dataKey="₹" fill="#3B82F6" barSize={60} radius={[10, 10, 0, 0]} />


                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
};
