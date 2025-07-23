import React from "react";
import ScoreGuage from "./ScoreGuage";
import Scorebadge from "./Scorebadge";

const Category = ({
  title,
  score,
}: {
  title: string;
  score: number | string;
}) => (
  <div className="resume-summary">
    <div className="category flex flex-row items-center justify-between">
      <p className="text-2xl">{title}</p>
      <Scorebadge score={score} />
    </div>
  </div>
);

const Summary = ({ feedback }: { feedback: any }) => {
  // Defensive fallback for missing fields
  const overallScore = feedback.overall_rating ?? 0;
  const atsScore = feedback.ats_compatibility ?? "-";
  const jobMatchScore = feedback.job_match_score ?? "-";

  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGuage score={Number(overallScore) || 0} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on ATS compatibility, job match, and
            other factors.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4 pb-4">
        <Category title="ATS Compatibility" score={atsScore} />
        <Category title="Job Match Score" score={jobMatchScore} />
        <Category title="Overall Rating" score={overallScore} />
      </div>
    </div>
  );
};

export default Summary;
