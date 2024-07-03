import { getNexraResponse } from "./Providers/nexra";

export const provider = {
    Nexra: "Nexra",
};

export const default_provider = provider.Nexra;

export const generate = async (prompt="", {provider = default_provider, options} = {}) => {
    if (provider === provider.Nexra) {
        return await getNexraResponse(prompt, options);
    }
    else {
        throw new Error("Provider not found.");
    }
};
