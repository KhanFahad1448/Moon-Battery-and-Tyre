const styles = {
  Requested: "border-steel/40 text-steel bg-steel/10",
  Placed: "border-steel/40 text-steel bg-steel/10",
  Confirmed: "border-sky-500/40 text-sky-500 bg-sky-500/10",
  Fitted: "border-ember/40 text-ember bg-ember/10",
  Completed: "border-emerald-500/40 text-emerald-500 bg-emerald-500/10",
  Cancelled: "border-destructive/40 text-destructive bg-destructive/10",
};

function StatusBadge({ status }) {
  return (
    <span
      className={
        "inline-block shrink-0 rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest " +
        (styles[status] || styles.Placed)
      }
    >
      {status}
    </span>
  );
}

export default StatusBadge;