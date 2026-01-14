---
name: Changelog Instructions
description: Guidelines for writing and maintaining the changelog.
applyTo: **/CHANGELOG.md
---

# Changelog instructions

The changelog can be found at the root of the project, [CHANGELOG.md](../../CHANGELOG.md).

## Guiding Principles

These principles should be followed when writing and maintaining the changelog:

- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each version is displayed.
- Mention whether you follow Semantic Versioning.

## Types of changes

Each change or new functionality must be categorized into one of the following types and the commit message must be prefixed accordingly:

| Title            | Description                                       | Prefix      |
| ---------------- | ------------------------------------------------- | ----------- |
| ✨ Added         | New features                                      | `feat:`     |
| 🐛 Fixed         | Bug fixes                                         | `fix:`      |
| 🔄 Changed       | Changes in existing functionality                 | `refactor:` |
| 🔒 Security      | Vulnerability fixes                               | `security:` |
| 📝 Documentation | Documentation-only changes                        | `docs:`     |
| 🎨 Style         | Code style changes (formatting, whitespace, etc.) | `style:`    |
| ⚡ Performance   | Performance improvements                          | `perf:`     |
| 🧪 Tests         | Adding or correcting tests                        | `test:`     |
| 🤖 CI            | CI configuration or script changes                | `ci:`       |
| 📦 Dependencies  | Dependency upgrades                               | `deps:`     |

## Format

Each version section should start with a header that includes the version number and release date in the following format:

```markdown
## [x.y.z] - DD.MM.YYYY
```

Changes should be listed under their respective categories using bullet points. The titles for each category can be found in the table above. For example:

```markdown
### ✨ Added

- New feature description.

### 🐛 Fixed

- Bug fix description.

### 🔄 Changed

- Change description.

### 🔒 Security

- Security fix description.

### 📝 Documentation

- Documentation change description.

### 🎨 Style

- Style change description.

### ⚡ Performance

- Performance improvement description.

### 🧪 Tests

- Test addition or correction description.

### 🤖 CI

- CI configuration change description.

### 📦 Dependencies

- Dependency upgrade description.
```

## Example

```markdown
## [1.2.0] - 15.06.2024

### ✨ Added

- Implemented user profile feature.

### 🐛 Fixed

- Fixed login issue on mobile devices.
```

## Maintenance

The changelog should be updated with every release. Ensure that all changes since the last version are documented accurately and categorized correctly. Regularly review the changelog for consistency and clarity.
