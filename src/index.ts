// @ts-nocheck
const github = require('@actions/github');
const context = github.context;
const issue = context.payload.issue;
const labels = [];
const title = issue.title.toLowerCase();
const body = issue.body ? issue.body.toLowerCase() : '';

(async () => {

    const labelMapping = [
        { label: 'ci/cd', match: ['ci/cd', 'pipeline', 'workflow', '.yml', 'dockerfile', '*.yml', '.github/workflows/*.yml', 'dockerfile', 'compose.yaml'] },
        { label: 'template', match: ['.github/auto_pull_request.md', '.github/auto_issue_template.md'] },
        { label: 'dotfiles', match: ['.gitlab-ci.yml', '.gitignore', '.gitattributes', '.dockerignore', 'dockerfile', 'license', 'package.json', 'pnpm-lock.yaml'] },
        { label: 'markdown', match: ['markdown', '**/*.md', './**/*'] },
        { label: 'devcontainer', match: ['.devcontainer/*', '*.json'] },
        { label: 'secrets', match: ['**/*.mp3', '**/*.txt'] },
        { label: 'enhancement', match: ['feature', 'improve', 'updated', 'update'] },
        { label: 'question', match: ['?', 'question', 'please', 'help'] },
        { label: 'schedule', match: ['schedule', 'daily', 'automate', 'hamster', 'ci', 'cd'] },
        { label: 'boss', match: ['og', 'boss', 'admin', 'devops', 'final-boss'] },
        { label: 'workflow', match: ['yaml', 'yml', 'config', 'yaml/**/*', '**/*.yml', '**/*.yaml', '.github/*.yml', '.github/workflows/*.yml'] }
    ];

    let matched = false;
    labelMapping.forEach(({ label, match }) => {
        if (match.some(keyword => title.includes(keyword) || body.includes(keyword))) {
            labels.push(label as never);
            matched = true;
        }
    });

    if (!matched) {
        labels.push('unknown' as unknown as never);
    }

    if (labels.length > 0) {
        await github.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issue.number,
            labels: labels
        });
    }

})();