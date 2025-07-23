import React from "react";

interface ATSProps {
  ats_compatibility?: number;
  ats_issues?: string[];
}

const getGradient = (score: number) => {
  if (score > 6) {
    return "bg-gradient-to-r from-green-200 via-green-400 to-green-600";
  } else if (score > 4) {
    return "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600";
  } else {
    return "bg-gradient-to-r from-red-200 via-red-400 to-red-600";
  }
};

const ATS: React.FC<ATSProps> = ({
  ats_compatibility = 0,
  ats_issues = [],
}) => {
  console.log("ATS props:", { ats_compatibility, ats_issues }); // Debug line
  return (
    <div
      className={`rounded-2xl p-6 shadow-md ${getGradient(ats_compatibility)}`}
    >
      <div className="flex flex-row items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-black">ATS Compatibility</h3>
        <span className="text-3xl font-bold text-black">
          {ats_compatibility}/10
        </span>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-black">ATS Issues:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {ats_issues.length > 0 ? (
            ats_issues.map((issue, i) => (
              <li key={i} className="text-red-900">
                {issue}
              </li>
            ))
          ) : (
            <li className="text-gray-700">No ATS issues detected.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ATS;
