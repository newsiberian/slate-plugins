# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.0-alpha.2](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-gallery@1.0.0-alpha.0...@mercuriya/slate-gallery@0.8.0-alpha.2) (2023-12-27)

### Changes

use generic for `Editor` type and inject new methods via `Object.assign`, that help to extend Editor type naturally, w/o using `as`.

**Note:** Version bump only for package @mercuriya/slate-gallery





## [1.0.0-alpha.0](https://github.com/newsiberian/slate-plugins/compare/@mercuriya/slate-gallery@0.7.1...@mercuriya/slate-gallery@1.0.0-alpha.0) (2023-06-03)


### ⚠ BREAKING CHANGES

* **slate-gallery:** change function `withGallery` to hook `useGallery` in order to be able to get `readOnly` status from slate hooks. Improve typings

* **slate-gallery:** change function `withGallery` to hook `useGallery` in order to be able to get `readOnly` status from slate hooks. Improve typings ([3e83739](https://github.com/newsiberian/slate-plugins/commit/3e83739425eab5b681edbeccbd56ca2275aa3142))



## 0.8.0-alpha.0 (2023-06-03)


### ⚠ BREAKING CHANGES

* **slate-gallery:** change function `withGallery` to hook `useGallery` in order to be able to get `readOnly` status from slate hooks. Improve typings ([3e83739](https://github.com/newsiberian/slate-plugins/commit/3e83739425eab5b681edbeccbd56ca2275aa3142))



# Change Log

# [0.7.0] - 2021-09-03

## BREAKING CHANGE
- `slate`/`slate-react` dependencies version up to 0.65.x

### Misc
- check element type by `Element.isElementType`
- improve typings

# [0.6.2] - 2020-01-25

- added `sortableContainerProps` prop;

# [0.6.1] - 2020-01-25

- fixed bug in `insertImage` function

# [0.6.0] - 2020-01-17

- [BREAKING CHANGES]: refactored to fit slate@0.50.0

# [0.5.0] - 2019-03-20

- [BREAKING CHANGES]: renderEditModal function now has another set of arguments. It is no
more used `open` prop, so for your custom modal, please, set `open={true}`. `setOpen` changed
to `onClose` and it is not required any arguments now. Build-in modal changed to `window.prompt`
for reducing bundle size and make plugin simpler.

# [0.4.4] - 2019-03-19

- added license

# [0.4.3] - 2019-03-17

- moved some dependencies to peerDependencies
- improved README

# [0.4.0] - 2019-03-06

- added new option `renderExtra` which allows to place additional component near image grid

# [0.3.0] - 2019-03-06

- added new prop `gridClassName`

# [0.2.0] - 2019-02-20

- Gallery: dropped using state for holding images in editable mode. Use block's data instead.
