export default function failClosedResult(error) {
    return {
        verdict: "warn",
        summary:
            "The model response did not satisfy the expected schema, so the reviewer failed closed.",
        findings: [
            {
                id: "F-001",
                title: "Failed Closed - schema mismatch",
                severity: "medium",
                summary:
                    "The model response did not satisfy the expected schema]",
                filePath: "NA",
                line: 0,
                evidence: [String(error)],
                recommendation:
                    "Inspect the pipeline logs and rerun after confirming schema compatibility.",
            },
        ],
    };
}
