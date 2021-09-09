import { ValidateFunction } from "ajv";
import { JSONSchemaType } from "ajv";
import KoaRouter, { RouterContext } from "@koa/router";
import Application from "koa";

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
