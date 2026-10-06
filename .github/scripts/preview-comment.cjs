// Shared by deploy-preview.yml (posts "deploying") and deploy.yml (posts the
// live link once GitHub Pages has actually deployed the preview).

const MARKER = '<!-- flows-community-preview -->';
const deployedMarker = (sha) =>
  `<!-- flows-community-preview:deployed:${sha} -->`;

async function findComment({ github, owner, repo, pr }) {
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number: pr,
    per_page: 100,
  });
  return comments.find(
    (comment) => comment.user.type === 'Bot' && comment.body.includes(MARKER)
  );
}

async function upsertComment({ github, owner, repo, pr, body }) {
  const existing = await findComment({ github, owner, repo, pr });
  if (existing) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existing.id,
      body,
    });
  } else {
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number: pr,
      body,
    });
  }
}

/** Called by the PR preview build, before the Pages deploy has finished. */
async function postPending({ github, context, sha }) {
  const body = [
    MARKER,
    '## Flows Community preview',
    '',
    '⏳ Deploying the preview. This comment will update with a link once it is live.',
    '',
    '_Commit:_ ' + sha,
    '',
    '_Updated:_ `' + new Date().toISOString() + '`',
  ].join('\n');

  await upsertComment({
    github,
    owner: context.repo.owner,
    repo: context.repo.repo,
    pr: context.issue.number,
    body,
  });
}

/**
 * Called after a successful Pages deploy. Every deploy publishes the latest
 * preview of every open PR, so update any PR whose comment does not yet point
 * at its deployed commit. This is idempotent, so a deploy run cancelled by the
 * `pages` concurrency group is covered by the next one.
 */
async function postDeployed({ github, context, pageUrl, branches }) {
  const { owner, repo } = context.repo;
  const baseUrl = pageUrl.replace(/\/$/, '');

  for (const branch of branches) {
    const pr = Number(branch.pr);
    if (!pr || !branch.sha) continue;

    const { data: pull } = await github.rest.pulls.get({
      owner,
      repo,
      pull_number: pr,
    });
    // Skip closed PRs, and PRs with a newer push whose preview isn't built yet.
    if (pull.state !== 'open' || pull.head.sha !== branch.sha) continue;

    const existing = await findComment({ github, owner, repo, pr });
    if (existing?.body.includes(deployedMarker(branch.sha))) continue;

    const previewUrl = `${baseUrl}/branches/${branch.name}/`;
    const body = [
      MARKER,
      deployedMarker(branch.sha),
      '## Flows Community preview',
      '',
      'The latest version is available for testing: [Preview](' +
        previewUrl +
        ')',
      '',
      '_Commit:_ ' + branch.sha,
      '',
      '_Updated:_ `' + new Date().toISOString() + '`',
    ].join('\n');

    await upsertComment({ github, owner, repo, pr, body });
    console.log(`Updated preview comment on #${pr}`);
  }
}

module.exports = { postPending, postDeployed };
