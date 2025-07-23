import React, { useState } from "react";
// Assume Feedback type is imported or globally defined

type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation: string;
};

type SectionKey = "ats" | "content" | "structure" | "skills";

const sectionTitles: Record<SectionKey, string> = {
  ats: "ATS Compatibility",
  content: "Content",
  structure: "Structure",
  skills: "Skills",
};

// Helper to map API feedback to section data
function mapFeedbackToSections(feedback: any) {
  if (!feedback) return null;
  return {
    ats: {
      score: feedback.ats_compatibility ?? 0,
      tips: [
        ...(feedback.ats_issues || []).map((issue: string) => ({
          type: "improve",
          tip: issue,
          explanation: "",
        })),
        ...(feedback.strengths || [])
          .filter(
            (s: string) =>
              s.toLowerCase().includes("ats") ||
              s.toLowerCase().includes("parsing")
          )
          .map((s: string) => ({
            type: "good",
            tip: s,
            explanation: "",
          })),
      ],
    },
    content: {
      score: feedback.overall_rating ?? 0,
      tips: [
        ...(feedback.strengths || []).map((s: string) => ({
          type: "good",
          tip: s,
          explanation: "",
        })),
        ...(feedback.weaknesses || []).map((w: string) => ({
          type: "improve",
          tip: w,
          explanation: "",
        })),
        ...(feedback.recommendations || []).map((r: string) => ({
          type: "improve",
          tip: r,
          explanation: "",
        })),
      ],
    },
    structure: {
      score: feedback.ats_compatibility ?? 0,
      tips: [
        ...(feedback.ats_issues || []).map((issue: string) => ({
          type: "improve",
          tip: issue,
          explanation: "",
        })),
        ...(feedback.specific_improvements || []).map((imp: string) => ({
          type: "improve",
          tip: imp,
          explanation: "",
        })),
      ],
    },
    skills: {
      score: feedback.job_match_score ?? 0,
      tips: [
        ...(feedback.strengths || [])
          .filter(
            (s: string) =>
              s.toLowerCase().includes("skills") ||
              s.toLowerCase().includes("technical")
          )
          .map((s: string) => ({
            type: "good",
            tip: s,
            explanation: "",
          })),
        ...(feedback.missing_elements || []).map((m: string) => ({
          type: "improve",
          tip: m,
          explanation: "",
        })),
        ...(feedback.job_match_analysis
          ? [
              {
                type: "improve",
                tip: feedback.job_match_analysis,
                explanation: "",
              },
            ]
          : []),
      ],
    },
  };
}

const Details = ({ feedback }: { feedback: any }) => {
  const [open, setOpen] = useState<SectionKey | null>(null);

  const handleToggle = (key: SectionKey) => {
    setOpen(open === key ? null : key);
  };

  const sections = mapFeedbackToSections(feedback);

  if (!sections) {
    return <div>No feedback available.</div>;
  }

  return (
    <div>
      {(["ats", "content", "structure", "skills"] as SectionKey[]).map(
        (key) => {
          const section = sections[key];
          return (
            <div
              key={key}
              style={{
                marginBottom: 16,
                border: "1px solid #eee",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: 12,
                  background: "#fafafa",
                  borderBottom: open === key ? "1px solid #eee" : undefined,
                  borderRadius: open === key ? "8px 8px 0 0" : 8,
                }}
                onClick={() => handleToggle(key)}
              >
                <span style={{ flex: 1, fontWeight: 500 }}>
                  {sectionTitles[key]}
                </span>
                {section ? (
                  <ScoreBadge score={section.score} />
                ) : (
                  <span style={{ color: "#aaa" }}>N/A</span>
                )}
                <span style={{ marginLeft: 12 }}>
                  {open === key ? "▲" : "▼"}
                </span>
              </div>
              {open === key && (
                <div
                  style={{
                    padding: 16,
                    background: "#fff",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  {section && section.tips && section.tips.length > 0 ? (
                    section.tips.map((tip: Tip, idx: number) => (
                      <div key={idx} style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            fontWeight: 500,
                            color: tip.type === "good" ? "green" : "#b58900",
                          }}
                        >
                          {tip.type === "good" ? "👍 Good:" : "🛠️ Improve:"}{" "}
                          {tip.tip}
                        </div>
                        {tip.explanation && (
                          <div
                            style={{
                              fontSize: 14,
                              color: "#555",
                              marginLeft: 24,
                            }}
                          >
                            {tip.explanation}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "#aaa" }}>No tips available.</div>
                  )}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

const ScoreBadge = ({ score }: { score: number }) => {
  let bg = "#ef4444",
    icon = "✗";
  if (score > 6) {
    bg = "#22c55e"; // green
    icon = "✔️";
  } else if (score > 3) {
    bg = "#facc15"; // yellow
    icon = "⚠️";
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: bg,
        color: "#fff",
        borderRadius: 16,
        padding: "2px 10px",
        fontWeight: 600,
        fontSize: 14,
        minWidth: 36,
        justifyContent: "center",
      }}
      title={`Score: ${score}`}
    >
      <span style={{ marginRight: 6 }}>{icon}</span>
      {score}
    </span>
  );
};

export default Details;
