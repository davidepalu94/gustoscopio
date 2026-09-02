import { usePlate } from '../PlateContext';

export default function Toast() {
  const { toast } = usePlate();
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}
