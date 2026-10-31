import { statusClass } from '../../utils/status';

export default function StatusBadge({ status }) {
  return <span className={`status status-${statusClass(status)}`}>{status}</span>;
}
