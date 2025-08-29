/// <reference types="vitest" />
import dsv from "@rollup/plugin-dsv";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import tsconfigPaths from "vite-tsconfig-paths";

/* eslint-disable @typescript-eslint/ban-ts-comment */

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		dsv({
			processRow: row => Object
				.keys(row)
				.forEach(key => {
					const value = row[key];
					switch(true) {
						// @ts-ignore
						case value === "": row[key] = undefined; break;
						// @ts-ignore
						case /^\d+(\.\d+)?$/.test(value): row[key] = +value; break;
						default: row[key] = value.trim();
					}
				}),
		}),
		analyzer(),
		react(),
	],
	test: {
		diff: {
			expand: true,
		},
	},
});
