import { Octokit } from "@octokit/rest";
import toMarkdown from "./utils/to-markdown.js";

export default async function postPRComment(reviewResult) {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPOSITORY;
    const prNumber = Number(process.env.PR_NUMBER);

    if (!token || !repo || !prNumber) {
        throw new Error("Missing required GitHub environment variables.");
    }

    const [owner, repoName] = repo.split("/");

    if (!owner || !repoName) {
        throw new Error("GitHub Repo must be in owner/repo format");
    }

    const octokit = new Octokit({ auth: token });

    // post pr comment
    await octokit.issues.createComment({
        owner,
        repo: repoName,
        issue_number: prNumber,
        body: toMarkdown(reviewResult),
    });
}
