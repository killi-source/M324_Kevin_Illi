# 11e – CI/CD and GitHub Actions

## Setup and external action security

All third-party actions in this repository are pinned to complete commit SHAs.
I selected actions by reviewing their source repository, maintainer, documentation,
release history, requested permissions and transitive runtime. A full SHA is required
because a tag can be moved later; the SHA identifies the exact code that is executed.

I verified each SHA with `git ls-remote` against the respective release tag before
adding it:

- `actions/checkout` v4.2.2: `11bd71901bbe5b1630ceea73d27597364c9af683`
- `actions/setup-node` v4.4.0: `49933ea5288caeca8642d1e84afbd3f7d6820020`
- `thollander/actions-comment-pull-request` v3:
  `24bffb9b452ba05a4f3f77933840a6a841d1b32b`
- `actions/github-script` v7.0.1:
  `60a0d83039c74a4aee543508d2ffcb1c3799cdea`
- `actions/cache` v4.2.3: `5a3ec84eff668545956fd18022155c47e93e2684`
- `hugoalh/scan-virus-ghaction` v0.20.1:
  `99c81e8991ad1074a14e5f22a21bce9be035e14e`

## Task 1 – CI workflow

The workflow in `.github/workflows/ci.yml` runs when a pull request targets
`main`, on Mondays at 07:00 UTC, or manually with `workflow_dispatch`. The
scheduled run detects a problem that appears after dependency or runner changes;
manual dispatch makes the workflow easy to test without a new pull request.

It grants only `contents: read`. `ubuntu-latest` is the hosted Linux runner.
`actions/checkout` places the repository on that runner and `actions/setup-node`
installs Node.js 24.22.2, the version required by `Exam1/package.json`. The `run`
steps execute in `Exam1`: `npm ci` installs the exact lockfile dependency tree,
ESLint checks code quality, Prettier verifies formatting, and Node's built-in test
runner executes the automated test.

`npm ci` is preferable in CI because it performs a clean, reproducible install
from `package-lock.json`; it does not update the lockfile. It fails if the lockfile
is missing or does not agree with `package.json`, which makes dependency drift
visible instead of silently changing the build.

Run evidence must be added after pushing: open a PR from `ci_cd` to `main`, add
the resulting PR and Actions-run links here, then introduce and repair one lint,
formatting and test failure in separate commits. This local branch has not yet been
pushed, so no run link is claimed here.

## Task 2 – Pull-request comment

`.github/workflows/pr-comment.yml` runs only for a newly opened pull request. It
uses Comment Pull Request to add a short welcome message. The job needs only
`pull-requests: write`, which permits creating the comment; it does not check out
or execute code from the PR. After opening a test PR, add its link here.

## Task 3 – Gollum

`.github/workflows/gollum.yml` reacts to a wiki edit (`gollum`). It writes every
changed wiki page and its URL into the workflow summary, which provides a small
audit trail for documentation changes. The workflow will run only after the
repository wiki is enabled and a page is created or edited. The payload may contain
no page data, so the script handles that case with an explanatory summary.

## Task 4 – Marketplace action

`.github/workflows/custom_action.yml` uses the Marketplace action
[actions/cache](https://github.com/actions/cache) to restore and save npm's download
cache before a manual production-dependency audit. It was chosen because dependency
installation is a frequent CI task and caching it can shorten repeated jobs without
caching `node_modules`. I reviewed its official repository and release before
pinning it. Start it with **Actions → Dependency audit → Run workflow** and add the
resulting run link here after checking the log and cache result.

## Task 5 – Malware scan

`.github/workflows/virus_scan.yml` is configured for pushes and pull requests to
`main`, plus manual dispatch. It checks out the repository and uses Scan Virus with
the current ClamAV signatures to scan the checked-out files. The final job has
`if: ${{ false }}` at job level as requested, so GitHub should display it as
skipped. Before adding that condition, run the same workflow once and record the
scan output and skipped-job run links here.

Malware scanning can detect known signatures but cannot guarantee that a repository
contains no malicious content: new, obfuscated, encrypted, remote, or unscanned
content can evade it, and false positives are possible. A safe verification method
is an EICAR test file or signature in an isolated temporary test branch; it is a
harmless industry-standard test string, not real malware. Do not commit it to
`main`; delete it after confirming that the scanner alerts.
