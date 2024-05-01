export default function isTokenExpired(expires: string): boolean {
  const expirationDate = new Date(expires);
  const currentDate = new Date();
  return expirationDate < currentDate;
}
