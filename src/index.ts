// @ts-nocheck
const github = require('@actions/github');
const core = require('@actions/core');

const context = github.context;
const issue = context.payload.issue;
const labels = [];
const title = issue.title.toLowerCase();
const body = issue.body ? issue.body.toLowerCase() : '';

/**
 * Fetch the labels from action.yml file and verify them
 * @param labels the labels from the user
 * @returns all labels
 */
function GetLabels<T extends Array<{ label: string, match: Array<string> }>>(labels: T): Array<T> | undefined {
    const tempLabels: Array<T> = [];
    labels.forEach(({ label, match }) => {
        if (match.some(keyword => title.includes(keyword) || body.includes(keyword))) {
            tempLabels.push({ label, match });
        }
    });
    return tempLabels.length > 0 ? tempLabels : undefined;
}

/**
 * Generate a random color in hex format (e.g., 'ff5733')
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color.slice(1); // Remove '#' because GitHub expects the color without '#'
}

/**
 * Check if a label exists in the repository, if not, create it with a random color.
 */
async function ensureLabelExists(octokit, owner, repo, label) {
    try {
        await octokit.rest.issues.getLabel({
            owner,
            repo,
            name: label,
        });
        core.debug(`Label "${label}" already exists.`);
    } catch (error) {
        if (error.status === 404) {
            const randomColor = getRandomColor();
            core.debug(`Label "${label}" not found, creating it with color #${randomColor}.`);
            await octokit.rest.issues.createLabel({
                owner,
                repo,
                name: label,
                color: randomColor,
            });
            core.info(`Label "${label}" created with color #${randomColor}.`);
        } else {
            throw error;
        }
    }
}

(async () => {
    try {
        const token = core.getInput('github-token', { required: true });
        const octokit = github.getOctokit(token);

        const { owner: contextOwner, repo: contextRepo } = github.context.repo;
        const owner = core.getInput('owner') || contextOwner;
        const repo = core.getInput('repo') || contextRepo;

        // Get the label configuration from action input
        const labelConfigInput = core.getInput('label-config');
        const labelMapping = labelConfigInput ? JSON.parse(labelConfigInput) : [];

        let matched = false;
        for (const { label, match } of labelMapping) {
            if (match.some(keyword => title.includes(keyword) || body.includes(keyword))) {
                labels.push(label as never);
                matched = true;

                // Ensure the label exists in the repo, otherwise create it with a random color
                await ensureLabelExists(octokit, owner, repo, label);
            }
        }

        if (!matched) {
            labels.push('unknown' as unknown as never);

            // Ensure the 'unknown' label exists in the repo
            await ensureLabelExists(octokit, owner, repo, 'unknown');
        }

        if (labels.length > 0) {
            await octokit.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                labels: labels
            });
        }

        console.log(`
            -------------------------------------------------
            🎉 Success! Issue/PRs have been labeled successfully.
            Thank you for using this action! – Vedansh ✨
            -------------------------------------------------
        `);

    } catch (error) {
        core.error(error);
        core.setFailed(`Failed to label pr or issue: ${error.message}`);
    }

})();
