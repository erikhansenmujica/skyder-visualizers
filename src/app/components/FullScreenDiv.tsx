interface FullScreenDivProps {
  children?: React.ReactNode;
}

export const FullScreenDiv = ({ children }: FullScreenDivProps) => (
  <div className="h-screen">{children}</div>
);
