# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.0-alpha.6](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-linkify@0.5.0-alpha.5...@mercuriya/slate-linkify@0.5.0-alpha.6) (2024-05-19)

**Note:** Version bump only for package @mercuriya/slate-linkify





## [0.5.0-alpha.5](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-linkify@0.5.0-alpha.4...@mercuriya/slate-linkify@0.5.0-alpha.5) (2024-05-19)

**Note:** Version bump only for package @mercuriya/slate-linkify





## [0.5.0-alpha.4](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-linkify@0.5.0-alpha.2...@mercuriya/slate-linkify@0.5.0-alpha.4) (2023-12-29)

**Note:** Version bump only for package @mercuriya/slate-linkify





## [0.5.0-alpha.3](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-linkify@0.5.0-alpha.2...@mercuriya/slate-linkify@0.5.0-alpha.3) (2023-12-29)

**Note:** Version bump only for package @mercuriya/slate-linkify





## [0.5.0-alpha.2](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-linkify@0.5.0-alpha.1...@mercuriya/slate-linkify@0.5.0-alpha.2) (2023-12-27)

### Changes

use generic for `Editor` type and inject new methods via `Object.assign`, that help to extend Editor type naturally, w/o using `as`.

**Note:** Version bump only for package @mercuriya/slate-linkify





## [0.5.0-alpha.1](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-linkify@0.4.1...@mercuriya/slate-linkify@0.5.0-alpha.1) (2023-06-03)


### Bug Fixes

* **slate-linkify:** bad import ([339396c](https://github.com/newsiberian/slate-plugins/commit/339396c58859da910b1d756559bc236af6aa0fcf))



## 0.5.0-alpha.0 (2023-06-03)

### ⚠ BREAKING CHANGES

`slate-linkify` logic adjusted to the latest Slate@0.94.1. It could not work as expected with earlier versions.

`onKeyDown` function has been renamed to `tryWrapLink` and it is not exposed anymore.

Introduced `getLinkUrl` function, which can return a URL if selected node is a link. ([e8aaff57](https://github.com/newsiberian/slate-plugins/commit/e8aaff57473197dbfa15a4986ecaa84344abce36))

### Bug Fixes

* **slate-linkify:** bad import ([339396c](https://github.com/newsiberian/slate-plugins/commit/339396c58859da910b1d756559bc236af6aa0fcf))


# [0.4.0] - 2021-09-03

## BREAKING CHANGE
- `slate`/`slate-react` dependencies version up to 0.65.x

### Misc

- check element type by `Element.isElementType`

# [0.3.1] - 2020-01-19

- exposed `unwrapLink` function

# [0.3.0] - 2020-01-19

- `linkElementType` now accept one object argument

# [0.2.0] - 2020-01-12

- [BREAKING CHANGES]: refactored to fit slate@0.50.0 and above

# [0.1.2] - 2019-03-22

- fixed a bug with inlines overlapping

# [0.1.1] - 2019-03-19

- added license
