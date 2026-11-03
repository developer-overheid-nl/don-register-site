---
"@developer-overheid-nl/don-register-components": patch
---

Switch: fix screen reader names. In `explicit` mode the "on" radio is now named "Aan" and the "off" radio "Uit"
(they were swapped). The default switch now has `role="switch"` and no longer puts a static "Aan"/"Uit" text in its
name, which went stale after toggling. The `checked` prop is now passed to the default switch input. In `explicit`
mode with neither option selected, the switch now shows an indeterminate state (thumb in the middle) and the first
click selects "on"; before, it looked "off" and the first click selected "off", so nothing seemed to change.

FormFieldSwitch: the switch (or, in `explicit` mode, the radio group) is now named by the description plus the amount,
e.g. "… publiccode.yml bestand. (9)". Before, the group name ended with the first radio's name and the amount only
belonged to the "on" radio. `AmountLabel` accepts an optional `id` for this.
