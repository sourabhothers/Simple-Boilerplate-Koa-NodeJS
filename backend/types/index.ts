import { ValidateFunction } from "ajv";
import { JSONSchemaType } from "ajv";
import KoaRouter, { RouterContext } from "@koa/router";
import Application from "koa";

// Basics

// MainApplication
export type IKoa = typeof Application;
// export type IApplication<State, Ctx > = IKoa;
export type IApplication = Application<
  Application.DefaultState,
  Application.DefaultContext
>;

// Router
export type IRouter = KoaRouter;

// Context
export type IRouterContext = RouterContext;

export type validatorSchemaType<IValidationData> =
  JSONSchemaType<IValidationData>;

export type IValidatorFactoryReturnFn<IValidationData> = (
  validationData: IValidationData
) => {
  validator: ValidateFunction<IValidationData>;
  error: string | null;
};

// Error handler

export interface ICustomError {
  name?: string;
  message: string;
  statusCode: number;
  code?: string;
  isCustom: Boolean;
  description?: string;
}

export type IErrorOptions = {
  name?: string;
  message: string;
  stack?: string;
  statusCode?: number;
  code?: string;
  description?: string;
  isCustom?: boolean;
};

export type IBuildApiError = (errorOptions: IErrorOptions) => ICustomError;
