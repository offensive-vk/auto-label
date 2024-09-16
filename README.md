# auto-label

This GitHub Action allows you to automate labels on issues and pull requests in a repository.

## Example Usage

```yml
steps:
  - uses: actions/checkout@v4
  - name: Apply Labels on Issues
    uses: offensive-vk/auto-label@master
    with:
      token: ${{ github.token }}
      labels: 
```

## Inputs Configuration

Configure the inputs through the `with:` section of the Action. Below is a list of configurable options:

| Option    | Default Value                 | Description |
|-----------|-------------------------------|-------------|
| token     | `${{ github.token }}` / `required` | The GitHub token used to authenticate requests. Use `${{ github.token }}` or create a PAT and store it in secrets. |
| owner     | `github.context.repo.owner`   | The owner of the repository where the issue will be created. Inferred from the context. |
| repo      | `github.context.repo.repo`    | The repository name where the issue will be created. Inferred from the context. |
| title     | `required`                    | The title of the issue. |
| body      |  `null`                              | The body content of the issue. |
| milestone |        `null`                       | The milestone ID to associate the issue with. |
| labels    |         `null`                      | A comma-separated list of labels to apply to the issue. |
| assignees |         `${{ github.actor }}`                      | A comma-separated list of GitHub usernames to assign the issue to. |

## Usage

> [!NOTE]  
> This Action only supports `ubuntu-latest` runners.

***

<p align="center">
  <i>&copy; <a href="https://github.com/offensive-vk/">Vedansh </a> 2020 - Present</i><br>
  <i>Licensed under <a href="https://github.com/offensive-vk/auto-issue?tab=MIT-1-ov-file">MIT</a></i><br>
  <a href="https://github.com/TheHamsterBot"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" alt="hamster"/></a><br>
  <sup>Thanks for visiting :)</sup>
</p>
