import { jwtDecode, JwtPayload } from "jwt-decode";

export interface AppJwtPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const decodeToken = (token: string): AppJwtPayload => {
  return jwtDecode<AppJwtPayload>(token);
};


export const assignId = (token: string): any => {
  const decodedToken = decodeToken(token);

  localStorage.setItem("userId", JSON.stringify(decodedToken.id));
}
