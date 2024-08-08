import { wrapper } from "./wrapper";
import { container } from "tsyringe";
import { Constructor, ReqHandler } from "../interfaces";

// Factory function to create controller handlers.
export const controllerFactory = <T>(cls: Constructor<T>) => {
  const instance: InstanceType<typeof cls> = container.resolve(cls);

  // Get a controller method as a handler.
  const getMethod = <K extends keyof T>(key: K): ReqHandler => {
    const handler = instance[key];
    if (typeof handler !== "function")
      throw new Error(`Handler ${key as string} is not a function`);
    return wrapper(handler.bind(instance));
  };

  return { getMethod };
};
