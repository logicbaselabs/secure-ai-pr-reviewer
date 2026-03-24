export default function toMarkdown(result) {
    if (result.findings.length === 0) {
        return [
            "## Secure AI PR Review",
            "",
            `**Verdict:** ${result.verdict.toUpperCase()}`,
            "",
            result.summary,
        ].join("\n");
    }

    const lines = [
        "## Secure AI PR Review",
        "",
        `**Verdict:** ${result.verdict.toUpperCase()}`,
        "",
        result.summary,
        "",
    ];

    for (const finding of result.findings) {
        lines.push(
            `- **${finding.severity.toUpperCase()}** \`${finding.filePath}:${finding.line}\` - ${finding.title}`,
        );
        lines.push(`  - ${finding.summary}`);
        lines.push(`  - Evidence: ${finding.evidence}`);
        lines.push(`  - Recommendation: ${finding.recommendation}`);
        lines.push("");
    }

    return lines.join("\n");
}
