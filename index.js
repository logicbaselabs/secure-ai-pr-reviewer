import { readFileSync } from "fs";
import postPRComment from "./post-pr-comment.js";
import { reviewCode } from "./review.js";
import { reviewSchema } from "./schema.js";
import failClosedResult from "./utils/fail-closed-result.js";
import redactSecrets from "./utils/redact-secrets.js";

async function main() {
    const isGitHubAction = process.env.GITHUB_ACTIONS === "true";

    const diffText = !isGitHubAction
        ? readFileSync(0, "utf-8")
        : process.env.PR_DIFF;
    if (!diffText) {
        console.error("No diff provided!");
        process.exit(1);
    }

    const redactedDiff = redactSecrets(diffText);
    const limitedDiff = redactedDiff.slice(0, 4000);

    const result = await reviewCode(limitedDiff);

    try {
        const rawJson = JSON.parse(result.content[0].text);
        const validated = reviewSchema.parse(rawJson);

        if (!isGitHubAction) {
            console.log(JSON.stringify(validated, null, 2));
        } else {
            await postPRComment(validated);
        }
    } catch (err) {
        return failClosedResult();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
