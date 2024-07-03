import {getNexraResponse} from "./Providers/nexra";

export const provider = {
    Nexra: "Nexra",
};

export const default_provider = provider.Nexra;

export const generate = async (prompt = "", _provider = default_provider, options = {}, {fetch = global.fetch} = {}) => {
    if (_provider === provider.Nexra) {
        return await getNexraResponse(prompt, options, {fetch: fetch});
    } else {
        throw new Error("Provider not found.");
    }
};
