import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../app/modules/middlewares/globalErrorHandler";

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TErrorSources;
};
export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const error: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Zod Error",
    error,
  };
};
