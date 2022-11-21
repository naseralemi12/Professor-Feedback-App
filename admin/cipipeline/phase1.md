# Phase 1 Report
The functioning of our CI/CD pipeline is based on GitHub Action. When developers create a pull request, the GitHub Action will be triggered and a list of actions will be run on the code to determine if the push meets our requirements.

## What we currently have
1. Deployed a [basic linter](/.github/workflows/lint.yml) that uses Super-Linter to check for coding style/conventions and programming errors.
2. Have a rough [template](/Source/testing/tests.js) for unit tests.
3. Assigned two [reviewers(Holden Adamec, Harrison Kung)](/CODEOWNERS) to do code reviewing.

## Planned and In-Progress
1. Develop end-to-end tests using Puppeteer and Jest to test our web app functionalities.
2. Fill out unit testing template to test functions while developing.
3. Improve the linter we have by reducing strictness.
4. If time allows, we can implement JSDocs to automate the generation of documentation for Javascript files. Otherwise, we can add documentation manually to GitHub Wiki and it wouldn't take too much time given the small size of our project.

## Diagram
[pipeline workflow](../cipipeline/phase1.drawio.png)
