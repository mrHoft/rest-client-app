export const base64Encode = (value: string) => btoa(encodeURIComponent(value));

export const base64Decode = (value: string) => decodeURIComponent(atob(decodeURIComponent(value)));
