import type { operations } from "../types/api-schema";

export type LifeCycle =
  operations["retreiveApi"]["responses"]["200"]["content"]["application/json"]["lifecycle"];

export type Status = LifeCycle["status"];

export const getStatus = (lifecycle: LifeCycle) => {
  if (!lifecycle) return;

  const statuses: Status[] = ["active", "deprecated", "sunset", "retired"];

  const { context } = getFromDate(lifecycle) || {};
  const isFuture = context === "future";

  const current: Status = lifecycle.status;
  const previous: Status | undefined = isFuture
    ? statuses[statuses.indexOf(current) - 1]
    : undefined;

  return { current, previous };
};

export const getStatusColor = (lifecycle: LifeCycle) => {
  if (!lifecycle) return;

  const { current, previous } = getStatus(lifecycle) || {};

  switch (current) {
    case "active":
      // Upcoming deprecation: same colour as a deprecation that hasn't started yet.
      return getFromDate(lifecycle)?.context === "future"
        ? "mosgroen"
        : "groen";
    case "deprecated":
      return previous ? "mosgroen" : "donkergeel";
    case "sunset":
      return previous ? "oranje" : "robijnrood";
    case "retired":
      return previous ? "rood" : "coolgrey";
    default:
      return "coolgrey";
  }
};

export const getFromDate = (lifecycle: LifeCycle) => {
  if (!lifecycle) return;

  // The date that belongs to the current status: deprecation date for active/deprecated, sunset date for sunset/retired.
  const dateString =
    lifecycle.status === "sunset" || lifecycle.status === "retired"
      ? lifecycle.sunset
      : lifecycle.deprecated;
  const fromDate = dateString && new Date(dateString);
  const isFuture =
    // biome-ignore lint/suspicious/noGlobalIsNan: isNan casts it to a number, that's what we want
    fromDate && !isNaN(fromDate as unknown as number)
      ? fromDate > new Date()
      : "";

  return {
    date: fromDate?.toLocaleString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    context:
      typeof isFuture !== "boolean" ? isFuture : isFuture ? "future" : "past",
  };
};
