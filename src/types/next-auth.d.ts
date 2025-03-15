import "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
      companyId: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    companyId: string | null;
  }
} 