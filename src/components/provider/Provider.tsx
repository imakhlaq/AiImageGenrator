"use client";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

//creating client object
const client = new QueryClient();

export default function Provider({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
