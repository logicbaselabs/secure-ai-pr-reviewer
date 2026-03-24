import z from "zod";

const severitySchema = z.enum(["no", "low", "medium", "high", "critical"]);

const findingsSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        severity: severitySchema,
        summary: z.string(),
        filePath: z.string(),
        line: z.number().int().nonnegative(),
        evidence: z.string(),
        recommendation: z.string(),
    })
    .strict();

export const reviewSchema = z
    .object({
        verdict: z.enum(["pass", "warn", "fail"]),
        summary: z.string(),
        findings: z.array(findingsSchema),
    })
    .strict();

export const reviewJsonSchema = {
    type: "object",
    properties: {
        verdict: {
            type: "string",
            enum: ["pass", "warn", "fail"],
        },
        summary: {
            type: "string",
            description: "Summary of the review result in one or two lines",
        },
        findings: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                properties: {
                    id: {
                        type: "string",
                        description: "Unique identifier of the finding",
                    },
                    title: {
                        type: "string",
                        description: "Concise title of the finding",
                    },
                    severity: {
                        type: "string",
                        enum: ["no", "low", "medium", "high", "critical"],
                        description: "Severity level of the risks",
                    },
                    summary: {
                        type: "string",
                        description:
                            "Summary of the finding in one or two lines",
                    },
                    filePath: {
                        type: "string",
                        description:
                            "Path of the file where finding was detected",
                    },
                    line: {
                        type: "integer",
                        description: "Line number associated with the issue",
                    },
                    evidence: {
                        type: "string",
                        description:
                            "Evidence supporting the vulnerability claim",
                    },
                    recommendation: {
                        type: "string",
                        description: "One or more suggested recommendations.",
                    },
                },
                required: [
                    "id",
                    "title",
                    "severity",
                    "summary",
                    "filePath",
                    "line",
                    "evidence",
                    "recommendation",
                ],
            },
        },
    },
    additionalProperties: false, // Enforces a strict schema for OWASP LLM02 safety
    required: ["verdict", "summary", "findings"],
};
