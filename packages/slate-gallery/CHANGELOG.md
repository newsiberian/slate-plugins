# Change Log

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
