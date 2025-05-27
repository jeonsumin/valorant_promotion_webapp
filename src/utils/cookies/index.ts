import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export function getCookie(name: string) {
  return cookies.get(name);
}

export const setCookie = (name: string, value: any, options?: any) => {
  const expires = new Date();
  expires.setHours(expires.getHours() + 12);
  const option = {
    path:"/",
    expires: expires,
    secure: true,
    sameSite: 'lax',
    ...options
  }
  return  cookies.set(name, value, { ...option });
};
