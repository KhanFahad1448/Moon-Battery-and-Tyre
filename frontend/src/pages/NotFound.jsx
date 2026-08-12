import { Link } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";

function NotFound() {
  useMeta({ title: "Page not found — Moon Battery and Tyre" });

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl text-gradient-ember">404</h1>
        <h2 className="mt-4 text-2xl">This road leads nowhere</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has been moved or never existed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-gradient-ember px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
