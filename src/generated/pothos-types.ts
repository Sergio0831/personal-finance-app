/* eslint-disable */
import type { Prisma, Post, Account, Session, VerificationToken, User, Transaction, Budget, Pot } from "./prisma/index.js";
export default interface PrismaTypes {
    Post: {
        Name: "Post";
        Shape: Post;
        Include: never;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
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
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
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
        RelationName: "accounts" | "sessions" | "transactions" | "budgets" | "pots";
        ListRelations: "accounts" | "sessions" | "transactions" | "budgets" | "pots";
        Relations: {
            accounts: {
                Shape: Account[];
                Name: "Account";
                Nullable: false;
            };
            sessions: {
                Shape: Session[];
                Name: "Session";
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