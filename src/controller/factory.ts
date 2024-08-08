import { wrapper } from "./wrapper";
import { Constructor, ReqHandler } from "../interfaces";

// Factory function to create controller handlers.
export const controllerFactory = <T>(cls: Constructor<T>) => {
  let tsyringe: any = null;

  try {
    tsyringe = require("tsyringe");
  } catch (error) {
    console.log("tsyringe is not installed");
    process.exit(1);
  }

  const instance: InstanceType<typeof cls> = tsyringe.container.resolve(cls);

  // Get a controller method as a handler.
  const getMethod = <K extends keyof T>(key: K): ReqHandler => {
    const handler = instance[key];
    if (typeof handler !== "function")
      throw new Error(`Handler ${key as string} is not a function`);
    return wrapper(handler.bind(instance));
  };

  return { getMethod };
};
