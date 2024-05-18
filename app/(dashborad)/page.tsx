"use client";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccounts } from "@/features/accounts/hooks/useNewAccounts";

export default function Home() {
  const { onOpen } = useNewAccounts();

  return (
    <div>
      <Button onClick={onOpen}>Add an Account</Button>
    </div>
  );
}
