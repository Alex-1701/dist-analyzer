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

export default function distAnalyzer(config?: PluginConfig): {
  name: string;
  hooks: {
    "astro:build:done": () => Promise<void>;
  };
};
export {};
