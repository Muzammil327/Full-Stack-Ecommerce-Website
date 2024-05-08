import React from "react";
import Processing from "../Loading/Processing";
interface ButtonProps {
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
export default function LoadingBtn({
  loading,
  onClick,
  children,
}: ButtonProps) {
  return <>{loading ? <Processing /> : children}</>;
}
