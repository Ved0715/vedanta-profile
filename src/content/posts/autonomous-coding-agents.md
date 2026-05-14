Coding agents are the most aggressive application of agentic AI and the one I find most useful to study, because the feedback loop is brutal: the code either runs or it doesn't. There is nowhere for a hallucination to hide.

This post is the architecture guide for building autonomous coding agents — what's inside Devin-class systems, Cursor-style assistants, Claude Code, and OpenHands.

## What "coding agent" actually means

A coding agent is an LLM plus:

- A **filesystem view** of one or more repositories.
- **Tools** for reading files, writing files, running commands, querying git.
- A **sandbox** to execute code safely.
- A **plan/critique loop** so it can iterate.
- A way to **commit, push, and open a pull request**.

The core trick: the model doesn't write code in a vacuum. It reads, runs, observes, and edits — the same loop a human engineer uses.

## Repository understanding

Step zero: the agent must have a mental model of your repo. The naive approach (embed every file, retrieve by similarity) works at small scale and breaks at large. Production systems combine several signals:

- **Vector embeddings** of files and chunks for fuzzy semantic retrieval.
- **Symbol index** built from AST parsing — every function, class, variable mapped to its definition.
- **Reference graph** — who calls what, who imports what.
- **Recent git activity** — what's changed lately, who edits this code, what PRs touched these files.

A good coding agent picks the *right files to look at* before it writes anything. That alone determines 70% of code quality.

## Codebase indexing

The pipeline used by Cursor, Claude Code, and friends:

1. **Walk the repo**, respecting `.gitignore` and language-aware filters.
2. **Chunk by syntax**, not by tokens. Functions and classes are atomic units. Tree-sitter is the standard parser.
3. **Embed each chunk** with a code-tuned embedding model (Voyage-code, OpenAI text-embedding-3, or a fine-tuned in-house variant).
4. **Build a symbol table** — every defined name maps to its file and line. Critical for accurate edits.
5. **Watch for changes** — re-index on file save or `git pull`. Stale indexes are a leading cause of bad edits.

The symbol table is often more important than the embeddings. Embeddings find *vaguely related* code; symbols find *exactly the function you wanted*.

## AST parsing as a first-class tool

LLMs hallucinate function names. The fix is to give them tools that can't hallucinate:

- `find_definition(symbol)` — uses the AST index, not the LLM, to return the exact file and line.
- `find_references(symbol)` — returns all call sites.
- `outline_file(path)` — returns the file's symbols without the bodies.

These tools turn "write a function that calls `Foo.bar()`" from a hallucination risk into a deterministic lookup.

## Tool calling: the surface that matters

A useful coding agent's tool set is small and sharp:

- `read_file(path, [start, end])`
- `write_file(path, content)` — usually backed by an apply-diff to avoid the model rewriting whole files.
- `edit_file(path, old_block, new_block)` — surgical edits, much cheaper.
- `run_shell(cmd)` — the most powerful and most dangerous tool. Sandboxed.
- `git_status / git_diff / git_log` — read-only git introspection.
- `search_repo(query)` — semantic + symbolic search.
- `lint(path) / test(path)` — fast feedback loops.

The art is in the `edit_file` tool. Patch-based edits (unified diffs or block-replace) outperform full-file rewrites by 5–10× in token cost and have lower regression rates. The Aider project pioneered this; every serious coding agent has copied it.

## Terminal execution and sandboxing

The agent will run code. This is non-negotiable for usefulness and terrifying for security. Sandbox properly:

- **Container-per-task.** Each agent task runs in a fresh Docker container or VM. No persistence across tasks unless explicit.
- **Network egress controlled.** No internet by default. Allowlist registry / package mirrors.
- **Resource quotas.** CPU, RAM, disk, and time budgets enforced.
- **No host filesystem access.** Mount only the workspace, read-only where possible.
- **Image rebuild on policy change.** Don't let a long-running container drift.

Cloud sandbox services (E2B, Modal, Daytona, Coder) are the easiest way to get this right.

## The plan-act-observe loop

Every coding agent runs some variant of:

1. **Read the task.**
2. **Plan** — list files to inspect, hypotheses to test.
3. **Inspect** — read those files, check tests.
4. **Edit** — make the change.
5. **Run** — execute tests / lints / build.
6. **Observe** — inspect output.
7. **Decide** — done? revise? backtrack?

Loop until done or until a max-iteration budget trips. The agent's quality is mostly determined by how good steps 2, 5, and 6 are. Models are pretty good at "edit." They're worse at "verify."

## Self-healing code agents

A natural extension: the agent runs tests, sees failures, fixes the failures, runs again. Done well, this gives you the "the agent debugged itself" experience users love.

Two failure modes to design against:

- **Test-overfit.** The agent edits the *test* to pass instead of fixing the code. Mitigate: lock test files unless explicitly editing them; use a critic agent to verify the fix actually addresses the root cause.
- **Local-minimum thrashing.** The agent keeps making the same kind of edit, keeps failing, keeps trying. Mitigate: track edit diversity; after N similar failed attempts, force the agent to step back and re-plan from scratch.

## Multi-file reasoning

Real edits touch multiple files. The agent has to understand:

- Which files to edit in what order (interface first, then implementation).
- Which existing call sites need to update.
- Whether the change requires migration scripts or feature flags.

Pattern: the planner produces a *plan-with-files-list* before any edits happen. The executor then walks the list, editing each file with full awareness of what the others will look like.

## Git-aware agents

The agent should be a first-class git citizen:

- **Branch per task.** Never edits main.
- **Atomic commits.** Each logical change is its own commit with a useful message.
- **PR-aware.** The agent opens the PR, fills the description, attaches test output.
- **Conflict-aware.** When the agent's branch falls behind, it rebases or merges with explicit conflict handling.

This is what makes Devin and Claude Code feel like teammates rather than chatbots. Git is the contract.

## PR review agents

The mirror image of a coding agent: an agent that reads PRs and reviews them. Architecture:

- Pull the diff and the surrounding context (modified files + their callers).
- Check against a rubric: tests added? edge cases? security implications? style?
- Emit comments inline with severity scores.
- Optional: run the PR's tests in a sandbox and report results.

Useful even as a *first pass* before human review. Catches the boring stuff so reviewers can focus on architecture.

## Autonomous debugging

The aspirational case: the agent reads a stack trace, forms a hypothesis, runs experiments, narrows down the cause, fixes the bug.

The realistic pattern that works:

1. Read the failure (test output, stack trace, log).
2. Form 2–3 hypotheses about the cause.
3. For each hypothesis, design a minimal experiment (run a script, add a log line, inspect a value).
4. Execute, observe.
5. Eliminate or escalate.
6. Once root cause is known, propose the fix; run tests; submit PR.

What doesn't work: "the LLM thinks really hard and emits a fix." Always force the agent to ground hypotheses in observed behaviour.

## Example systems

- **Devin-style.** Long-running autonomous task. Heavy on planning and verification. Aims at end-to-end ticket-to-PR. Cost-intensive; high variance.
- **Cursor-like.** Inline, interactive. Pair-programming model. Agent assists; human commits. The dominant commercial pattern in 2026.
- **Claude Code.** CLI-native autonomous agent. Tight tool surface. Strong at multi-file refactors and structured tasks. Optimised for the engineer's terminal workflow.
- **OpenHands (formerly OpenDevin).** Open-source. Sandbox-first. A useful reference architecture if you're building your own.

Read the system prompts of each. They are public, in most cases, and reveal more about real-world coding agent design than any blog post (this one included).

## What still doesn't work

- **Truly novel architecture work.** Agents are great at incremental edits; weak at greenfield design decisions.
- **Cross-repository changes.** Even good agents struggle when the change spans services.
- **Long-horizon refactors.** The kind of week-long surgical refactor a senior engineer does — agents lose the plot.
- **Anything safety-critical without a human.** Don't.

This is the frontier. It's moving fast. Build something now and you'll be three months ahead of the people who wait.

## The takeaway

Build a small set of sharp tools. Index your code with both vectors and AST. Keep the agent in a sandbox. Make every edit a diff. Verify by running. Loop with discipline.

The best coding agents in 2026 don't write the smartest code. They have the cleanest tool surface and the tightest feedback loop. That is the architecture.
