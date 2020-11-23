declare module 'react-native-simple-store' {
  function del(key: string): Promise<any>;

  export function get(key: string): Promise<any>;
  export function save(key: string, value: any): Promise<any>;
  export { del as delete };
}
