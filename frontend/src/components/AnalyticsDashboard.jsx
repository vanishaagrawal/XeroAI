import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

function AnalyticsDashboard({
  interviewScores
}) {

  const interviewData =
  interviewScores.map((score, index) => ({
    round: index + 1,
    score
  }))

  const skillData = [
    { name: "Matching Skills", value: 75 },
    { name: "Missing Skills", value: 25 }
  ]

  return (

    <div className="mt-12">

      <h2 className="text-4xl font-bold mb-8 text-blue-400">
        AI Analytics Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-black border border-gray-800 p-6 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-6">
            Interview Performance
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={interviewData}>

              <XAxis dataKey="round" />

              <YAxis />

              <Tooltip />

              <Line
  type="monotone"
  dataKey="score"
  stroke="#3b82f6"
  strokeWidth={4}
  dot={{ r: 6 }}
/>

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-black border border-gray-800 p-6 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-6">
            Skill Match Analysis
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={skillData}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#3b82f6" />

                <Cell fill="#9333ea" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}

export default AnalyticsDashboard