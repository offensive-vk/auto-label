# Auto-Label

The **auto-label** GitHub Action simplifies the process of adding labels to issues and pull requests in your repository. Powered by the GitHub Octokit API, this Action can match specific keywords or file patterns to apply labels automatically.

For a complete example, check the working [workflow](.github/workflows/test.yml).

---

## Features

- **Automatic Labeling**: Apply labels to issues and pull requests based on custom rules.
- **Keyword Matching**: Match specific keywords in issues to apply relevant labels.
- **File Pattern Matching**: Automatically label pull requests based on modified file patterns.
- **Optional Label Creation**: Create missing labels automatically with descriptions.

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
      auth-token: ${{ github.token }} # Optional, defaults to ${{ secrets.GITHUB_TOKEN }}
      issue-config: .github/issues.yml # Required, path to the issue configuration file.
```

  - 'release_assets/**/*'
  - '**/*.assets'

area/build:
  - 'build/**/*'
  - 'resources/**'

area/ci-cd:
  - '**/*.yml'
  - '**/*.yaml'
```

---

## How It Works

1. The Action triggers based on GitHub events (`issues` or `pull_request`).
2. Matches keywords (for issues) or file patterns (for pull requests) against the configuration file.
3. Applies labels to issues or pull requests that match the criteria.
4. Optionally creates missing labels in the repository.
5. Works both on issue and pull requests.

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
