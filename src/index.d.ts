import type { AstroIntegration } from "astro";

interface Config {
  native: boolean;
  markdown: boolean;
  summary: boolean;
  exclude: string[];
  outDir: string;
}

export declare const main: ({
  native,
  markdown,
  summary,
  exclude,
  outDir,
}: Config) => Promise<void>;

type PluginConfig = Partial<Omit<Config, "outDir">>;
export default function (config?: PluginConfig): AstroIntegration;

type CLIConfig = Partial<Config>;
export function distAnalyzerCli(config?: CLIConfig): Promise<void>;
