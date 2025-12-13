import fs from "node:fs"
import path from "node:path"

const cwd = process.cwd()
const handoffPath = path.join(cwd, "HANDOFF.md")
const templatePath = path.join(cwd, "scripts", "handoff", "template.md")

function fail(message) {
  console.error(`\n[handoff:init] ${message}\n`)
  process.exit(1)
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (err) {
    return null
  }
}

if (fs.existsSync(handoffPath)) {
  fail("HANDOFF.md already exists. Refusing to overwrite.")
}

const template = readText(templatePath)
if (!template) {
  fail(`Missing template at ${templatePath}`)
}

fs.mkdirSync(path.dirname(handoffPath), { recursive: true })
fs.writeFileSync(handoffPath, template, "utf8")

console.log("[handoff:init] Created HANDOFF.md from template.")


