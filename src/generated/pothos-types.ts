/* eslint-disable */
import type { Prisma, User, Session, Account, Verification, Transaction, Budget, Pot } from "./prisma/index.js";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "sessions" | "accounts" | "transactions" | "budgets" | "pots";
        ListRelations: "sessions" | "accounts" | "transactions" | "budgets" | "pots";
        Relations: {
            sessions: {
                Shape: Session[];
                Name: "Session";
                Nullable: false;
            };
            accounts: {
                Shape: Account[];
                Name: "Account";
                Nullable: false;
            };
            transactions: {
                Shape: Transaction[];
                Name: "Transaction";
                Nullable: false;
            };
            budgets: {
                Shape: Budget[];
                Name: "Budget";
                Nullable: false;
            };
            pots: {
                Shape: Pot[];
                Name: "Pot";
                Nullable: false;
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Verification: {
        Name: "Verification";
        Shape: Verification;
        Include: never;
        Select: Prisma.VerificationSelect;
        OrderBy: Prisma.VerificationOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationWhereUniqueInput;
        Where: Prisma.VerificationWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Transaction: {
        Name: "Transaction";
        Shape: Transaction;
        Include: Prisma.TransactionInclude;
        Select: Prisma.TransactionSelect;
        OrderBy: Prisma.TransactionOrderByWithRelationInput;
        WhereUnique: Prisma.TransactionWhereUniqueInput;
        Where: Prisma.TransactionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Budget: {
        Name: "Budget";
        Shape: Budget;
        Include: Prisma.BudgetInclude;
        Select: Prisma.BudgetSelect;
        OrderBy: Prisma.BudgetOrderByWithRelationInput;
        WhereUnique: Prisma.BudgetWhereUniqueInput;
        Where: Prisma.BudgetWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Pot: {
        Name: "Pot";
        Shape: Pot;
        Include: Prisma.PotInclude;
        Select: Prisma.PotSelect;
        OrderBy: Prisma.PotOrderByWithRelationInput;
        WhereUnique: Prisma.PotWhereUniqueInput;
        Where: Prisma.PotWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
}