import { PluginConfigMap } from "./official-plugins";
import { KnownThirdPartyPlugins } from "./third-party-plugins";

export type OfficialPluginName = keyof PluginConfigMap;
export type ThirdPartyStandardPluginName = `vuepress-plugin-${string}`;
export type ThirdPartyScopedPluginName = `${string}/vuepress-plugin-${string}`;
export type ThirdPartyPluginName = ThirdPartyStandardPluginName | ThirdPartyScopedPluginName;

export type ShortcutName4OfficialPluginName<T extends string> = 
  T extends `@vuepress/plugin-${infer S}` 
    ? `@vuepress/${S}` 
    : false;

export type ShortcutName4ThirdPartyPluginName<T extends string> = 
  T extends `vuepress-plugin-${infer X}`
    ? X 
    : T extends `${infer S}/vuepress-plugin-${infer N}`
      ? `${S}/${N}` 
      : T;

export type AllowBoolean<T extends any> = T | boolean;

/**
 * Official plugin tuple
 */
export type OfficialPluginTuple = {
  [K in OfficialPluginName]?: [K | ShortcutName4OfficialPluginName<K>, AllowBoolean<PluginConfigMap[K]>?]
}[OfficialPluginName];

/**
 * Third-party plugin tuple, shortcut is NOT allowed.
 */
export type ThirdPartyPluginTuple = [
  ThirdPartyPluginName, 
  AllowBoolean<Record<string, any>>
]

/**
 * Known third-party plugin tuple, shortcut is allowed.
 */
export type KnownThirdPartyPluginTuple = {
  [K in KnownThirdPartyPlugins]?: [K | ShortcutName4ThirdPartyPluginName<K>, AllowBoolean<Record<string, any>>?]
}[KnownThirdPartyPlugins];

/**
 * Final plugin tuple
 */
export type PluginTuple = 
  | OfficialPluginName 
  | KnownThirdPartyPlugins
  | ShortcutName4ThirdPartyPluginName<KnownThirdPartyPlugins>
  | OfficialPluginTuple 
  | ThirdPartyPluginTuple 
  | KnownThirdPartyPluginTuple;

/**
 * Object config
 */
export type PluginObject = Partial<PluginConfigMap>
    & {
    [T in OfficialPluginName as ShortcutName4OfficialPluginName<T>]?: PluginConfigMap[T]
  } & {
    [k: string]: Record<string, any>;
  }

