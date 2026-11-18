import i18n from "@developer-overheid-nl/don-register-components/i18n";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  getFromDate,
  getStatus,
  getStatusColor,
  type LifeCycle,
  type Status,
} from "./lifecycleHelpers";

// Fixed "now", so future dates stay in the future and "today" is stable.
const NOW = new Date("2026-06-15T12:00:00Z");
const TODAY = "2026-06-15";

interface LifeCycleCase {
  lifecycle: LifeCycle;
  previous: Status | undefined;
  color: string;
  /** Badge text as rendered by the overview and detail pages. */
  text: string;
}

// The API sends `deprecated` and `sunset` dates (it used to send a single `from`).
// active/deprecated use the `deprecated` date, sunset/retired use the `sunset` date.
const testLifeCycles: LifeCycleCase[] = [
  {
    lifecycle: { status: "active", version: "v-active" },
    previous: undefined,
    color: "groen",
    text: "Active",
  },
  {
    lifecycle: {
      status: "active",
      version: "v-active-deprecated-null",
      deprecated: null as unknown as undefined,
    },
    previous: undefined,
    color: "groen",
    text: "Active",
  },
  {
    lifecycle: {
      status: "active",
      version: "v-active-deprecated-future",
      deprecated: "2030-04-01",
    },
    previous: undefined,
    color: "mosgroen",
    text: "Active, wordt Deprecated per 1 april 2030",
  },
  {
    // Inconsistent data (should have been "deprecated"): show the status only.
    lifecycle: {
      status: "active",
      version: "v-active-deprecated-past",
      deprecated: "2020-02-02",
    },
    previous: undefined,
    color: "groen",
    text: "Active",
  },
  {
    lifecycle: {
      status: "deprecated",
      version: "v-deprecated-future",
      deprecated: "2030-04-01",
    },
    previous: "active",
    color: "mosgroen",
    text: "Deprecated per 1 april 2030",
  },
  {
    lifecycle: {
      status: "deprecated",
      version: "v-deprecated-past",
      deprecated: "2020-02-02",
    },
    previous: undefined,
    color: "donkergeel",
    text: "Deprecated sinds 2 februari 2020",
  },
  {
    lifecycle: { status: "deprecated", version: "v-deprecated-no-date" },
    previous: undefined,
    color: "donkergeel",
    text: "Deprecated",
  },
  {
    lifecycle: {
      status: "deprecated",
      version: "v-deprecated-today",
      deprecated: TODAY,
    },
    previous: undefined,
    color: "donkergeel",
    text: "Deprecated sinds 15 juni 2026",
  },
  {
    lifecycle: {
      status: "sunset",
      version: "v-sunset-future",
      deprecated: "2020-02-02",
      sunset: "2030-04-01",
    },
    previous: "deprecated",
    color: "oranje",
    text: "Sunset per 1 april 2030",
  },
  {
    lifecycle: {
      status: "sunset",
      version: "v-sunset-past",
      sunset: "2020-02-02",
    },
    previous: undefined,
    color: "robijnrood",
    text: "Sunset sinds 2 februari 2020",
  },
  {
    lifecycle: {
      status: "sunset",
      version: "v-sunset-unparsable",
      sunset:
        "Seventeenth Day of September in the Year of our Lord one thousand seven hundred and Eighty seven",
    },
    previous: undefined,
    color: "robijnrood",
    text: "Sunset",
  },
  {
    lifecycle: {
      status: "retired",
      version: "v-retired-future",
      sunset: "2030-04-01",
    },
    previous: "sunset",
    color: "rood",
    text: "Retired per 1 april 2030",
  },
  {
    lifecycle: {
      status: "retired",
      version: "v-retired-past",
      sunset: "2020-02-02",
    },
    previous: undefined,
    color: "coolgrey",
    text: "Retired sinds 2 februari 2020",
  },
  {
    lifecycle: {
      status: "retired",
      version: "v-retired-long-past",
      sunset: "1787-09-17",
    },
    previous: undefined,
    color: "coolgrey",
    text: "Retired sinds 17 september 1787",
  },
];

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe.each(testLifeCycles)(
  "$lifecycle.version",
  ({ lifecycle, previous, color, text }) => {
    test("getStatus returns the current and previous status", () => {
      expect(getStatus(lifecycle)).toEqual({
        current: lifecycle.status,
        previous,
      });
    });

    test(`getStatusColor returns ${color}`, () => {
      expect(getStatusColor(lifecycle)).toBe(color);
    });

    test(`badge text is "${text}"`, () => {
      expect(
        i18n.t(`components.lifecycle-status-${lifecycle.status}`, {
          ...getFromDate(lifecycle),
        }),
      ).toBe(text);
    });
  },
);
