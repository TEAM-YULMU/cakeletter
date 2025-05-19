import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React from "react";

type FooterLink = { label: string; href: string };

type Props = {
  title?: string;
  footer: {
    label?: string;
    links?: FooterLink[];
  };
  children: React.ReactNode;
};

export function FormCard({ title, footer, children }: Props) {
  const { label, links = [] } = footer;

  return (
    <Card className="flex w-[35rem] flex-col items-center border-none shadow-none">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>
      {(label || links.length > 0) && (
        <CardFooter className="flex w-[90%] items-center justify-between text-sm">
          {label && <span>{label}</span>}
          {links.length > 0 && (
            <div className="flex items-center gap-1">
              {links.map((link, i) => (
                <React.Fragment key={i}>
                  <Link href={link.href} className="text-sky-700 hover:underline">
                    {link.label}
                  </Link>
                  {i < links.length - 1 && <span>/</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
