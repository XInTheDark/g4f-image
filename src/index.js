import {getNexraResponse} from "./Providers/nexra";
import {getDeepInfraResponse} from "./Providers/deepinfra";

export const provider = {
    Nexra: "Nexra",
    DeepInfra: "DeepInfra",
};

export const default_provider = provider.Nexra;

export const generate = async (prompt = "", _provider = default_provider, options = {}, {fetch = global.fetch} = {}) => {
    if (_provider === provider.Nexra) {
        return await getNexraResponse(prompt, options, {fetch: fetch});
    } else if (_provider === provider.DeepInfra) {
        return await getDeepInfraResponse(prompt, options, {fetch: fetch});
    } else {
        throw new Error("Provider not found.");
    }
};
