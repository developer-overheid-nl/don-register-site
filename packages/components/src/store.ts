import { atom, map } from "nanostores";

export const test = atom('Test from store (initial)');

export const envStore = map({ API_URL: undefined, API_ENDPOINT: undefined, API_VERSION: undefined });

export const configStore = map({});

export const dataStore = map({});
