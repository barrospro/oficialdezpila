import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cartão")({
  beforeLoad: ({ location }) => {
    throw redirect({
      to: "/cartao",
      search: location.search,
    });
  },
  component: () => null,
});

