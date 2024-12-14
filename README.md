# Auto-Label

The **Auto-Label** GitHub Action simplifies the process of adding labels to issues and pull requests in your repository. Powered by the GitHub Octokit API, this Action can match specific keywords or file patterns to apply labels automatically.

For a complete example, check the [working workflow](.github/workflows/test.yml).

---

## Features
- **Automatic Labeling**: Apply labels to issues and pull requests based on custom rules.
- **Keyword Matching**: Match specific keywords in issues to apply relevant labels.
- **File Pattern Matching**: Automatically label pull requests based on modified file patterns.
- **Optional Label Creation**: Create missing labels automatically.

---

## Usage Examples

### Apply Labels on Issues

```yaml
steps:
  - name: Apply Labels on Issues
    if: github.event_name == 'issues'
    uses: offensive-vk/auto-label@v7
    with:
      create-labels: true # Optional, defaults to true
      github-token: ${{ secrets.GITHUB_TOKEN }} # Optional, defaults to ${{ secrets.GITHUB_TOKEN }}
      issue-config: .github/issues.yml # Required, path to the issue configuration file.
```

### Apply Labels on Pull Requests

```yaml
steps:
  - name: Apply Labels on Pull Requests
    if: github.event_name == 'pull_request'
    uses: offensive-vk/auto-label@v7
    with:
      create-labels: true # Optional, defaults to true
      github-token: ${{ secrets.GITHUB_TOKEN }} # Optional, defaults to ${{ secrets.GITHUB_TOKEN }}
      pr-config: .github/pr.yml # Required, path to the pull request configuration file.
```

---

## Input Configuration

Configure inputs through the `with:` section of the Action. Below is the list of available options:

| Input          | Default Value                 | Description |
|----------------|-------------------------------|-------------|
| `github-token` | `${{ secrets.GITHUB_TOKEN }}` | The GitHub token for authenticating requests. You can use `${{ secrets.GITHUB_TOKEN }}` or a personal access token (PAT) stored in your secrets. |
| `issue-config` | `.github/issues.yml`          | Path to the YAML configuration file for labeling issues. |
| `pr-config`    | `.github/pr.yml`              | Path to the YAML configuration file for labeling pull requests. |
| `create-labels`| `true`                        | Whether to create missing labels in the repository. |

---

## Configuration Files

### Issue Configuration
Define rules to apply labels on issues based on keywords. Below is an example:

```yaml
# .github/issues.yml
actual_label:
  - 'Match1'
  - 'Match2'
  - '...'

bug:
  - 'bug'
  - 'issue'
  - 'fix'

feature:
  - 'feature'
  - 'enhancement'
```

### Pull Request Configuration
Define rules to apply labels on pull requests based on file patterns. Below is an example:

```yaml
# .github/pr.yml
area/release:
  - 'release/**/*'
  - 'release_assets/**/*'
  - '**/*.assets'

area/build:
  - 'build/**/*'
  - 'resources/**'
```

---

## How It Works
1. The Action triggers based on GitHub events (`issues` or `pull_request`).
2. Matches keywords (for issues) or file patterns (for pull requests) against the configuration file.
3. Applies labels to issues or pull requests that match the criteria.
4. Optionally creates missing labels in the repository.

---

## License
This repository is licensed under the [MIT License](https://github.com/offensive-vk/auto-issue?tab=MIT-1-ov-file).

***

<p align="center">
  <i>&copy; <a href="https://github.com/offensive-vk/">Vedansh </a> 2020 - Present</i><br>
  <i>Licensed under <a href="https://github.com/offensive-vk/auto-issue?tab=MIT-1-ov-file">MIT</a></i><br>
  <a href="https://github.com/TheHamsterBot"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" alt="hamster"/></a><br>
  <sup>Thanks for visiting :)</sup>
</p>
