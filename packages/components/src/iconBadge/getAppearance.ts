/* biome-ignore-all lint: is deprecated and refactored */
type status = "active" | "deprecated" | "sunset" | "retired";

/**
 * @deprecated API Register specific function (moved and refactored to `apps/api-register/src/components/`)
 */
export function getDate(object?: Partial<Record<"status" | status, any>>) {
  if (!object) return;

  const keys = Object.keys(object);
  const statuses: status[] = ["deprecated", "sunset"];
  let date;

  statuses.forEach((status) => {
    if (keys.includes(status) && object[status]) {
      date = object[status];
    }
  });

  return (
    date &&
    new Date(date).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
}

/**
 * @deprecated API Register specific function (moved and refactored to `apps/api-register/src/components/`)
 */
export default function getAppearance(
  object?: Partial<Record<"status" | status, any>>,
) {
  if (!object) return;

  const keys = Object.keys(object);
  const statuses: status[] = ["active", "deprecated", "sunset", "retired"];
  let appearance;

  statuses.forEach((status) => {
    if (keys.includes(status) && object[status]) {
      // If upcoming status is more serious than current status, use that one
      appearance =
        statuses.indexOf(status) > statuses.indexOf(object.status)
          ? status
          : object.status;
    }
  });

  return appearance;
}
