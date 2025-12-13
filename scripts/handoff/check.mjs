import fs from "node:fs"
import path from "node:path"

const cwd = process.cwd()
const handoffPath = path.join(cwd, "HANDOFF.md")

function fail(message) {
  console.error(`\n[handoff:check] ${message}\n`)
  process.exit(1)
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (err) {
    return null
  }
}

function findSectionBody(md, heading) {
  const startIdx = md.indexOf(heading)
  if (startIdx === -1) return null

  const afterHeadingIdx = startIdx + heading.length
  const rest = md.slice(afterHeadingIdx)

  // Next section starts at the next H2 heading (## ) or EOF.
  const nextIdx = rest.search(/\n##\s+/)
  const body = nextIdx === -1 ? rest : rest.slice(0, nextIdx)
  return body
}

function sectionHasMeaningfulContent(body) {
  if (!body) return false

  // Remove whitespace and common separators.
  const cleaned = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .filter((l) => l !== "---")

  if (cleaned.length === 0) return false

  // Allow explicit "No changes" lines.
  if (cleaned.some((l) => /^-?\s*No changes\.?$/i.test(l))) return true
  if (cleaned.some((l) => /^-?\s*None currently known\.?$/i.test(l))) return true

  // Otherwise require at least one list item with some text.
  // - bullet lists: "- item"
  // - ordered lists: "1. item"
  return cleaned.some((l) => /^-\s+\S+/.test(l) || /^\d+\.\s+\S+/.test(l))
}

function requireLine(md, label, re) {
  if (!re.test(md)) fail(`Missing or invalid: ${label}`)
}

const md = readText(handoffPath)
if (!md) {
  fail(`Missing HANDOFF.md at ${handoffPath}. Run: pnpm handoff:init`)
}

// Header + metadata lines
requireLine(md, "H1 header '# 🚀 Agent Handoff: ...'", /^#\s+🚀\s+Agent Handoff:\s+.+/m)
requireLine(md, "**Date:** line", /^\*\*Date:\*\*\s+\S.+$/m)
requireLine(md, "**Status:** line (top)", /^\*\*Status:\*\*\s+\S.+$/m)

// Required H2 sections (UPOS7VS template)
const requiredSections = [
  "## 📋 What Was Just Completed",
  "## 🎯 Current Project State",
  "## 🎯 Recommended Next Steps",
  "## 📊 Remaining Enhancements to Implement",
  "## 📝 Important Context",
  "## ⚠️ Known Issues / Considerations",
  "## 📞 Quick Reference",
  "## 🔧 Available Commands",
  "## 📚 Key Files to Review",
]

for (const heading of requiredSections) {
  if (!md.includes(heading)) fail(`Missing required section heading: ${heading}`)
}

// Required subsections inside Important Context
const requiredSubsections = ["### User Profile", "### Design Principles", "### Testing Standards", "### Git Workflow"]
for (const sub of requiredSubsections) {
  if (!md.includes(sub)) fail(`Missing required subsection: ${sub}`)
}

// Ensure major sections have content
for (const heading of [
  "## 📋 What Was Just Completed",
  "## 🎯 Recommended Next Steps",
  "## 📊 Remaining Enhancements to Implement",
  "## ⚠️ Known Issues / Considerations",
  "## 🔧 Available Commands",
  "## 📚 Key Files to Review",
]) {
  const body = findSectionBody(md, heading)
  if (!sectionHasMeaningfulContent(body)) {
    fail(`Section has no meaningful content: ${heading} (use '- No changes' if needed)`)
  }
}

// Current Project State should include some content in either "What's Working" or "Project Structure"
const cps = findSectionBody(md, "## 🎯 Current Project State")
if (!cps) fail("Unable to parse Current Project State section")
if (!sectionHasMeaningfulContent(cps)) {
  fail("Current Project State has no meaningful content (add bullets under 'What's Working' and/or 'Project Structure')")
}

// Quick Reference required fields
const qr = findSectionBody(md, "## 📞 Quick Reference")
if (!qr) fail("Unable to parse Quick Reference section")
for (const label of ["Project", "Branch", "Last Commit"]) {
  if (!new RegExp(`\\*\\*${label}:\\*\\*`, "m").test(qr)) fail(`Quick Reference missing field: **${label}:**`)
}

// Bottom summary
requireLine(md, "bottom **Status:**", /^\*\*Status:\*\*\s+\S.+$/m)
requireLine(md, "bottom **Recommendation:**", /^\*\*Recommendation:\*\*\s+\S.+$/m)
requireLine(md, "bottom **Confidence:**", /^\*\*Confidence:\*\*\s+\S.+$/m)

console.log("[handoff:check] OK")


