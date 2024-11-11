import {getNexraResponse} from "./Providers/nexra";
import {getDeepInfraResponse} from "./Providers/deepinfra";
import {getRocksResponse} from "./Providers/rocks";

export const provider = {
    Nexra: "Nexra",
    DeepInfra: "DeepInfra",
    Rocks: "Rocks",
};

export const default_provider = provider.Nexra;

export const generate = async (prompt = "", _provider = default_provider, options = {}, {fetch = global.fetch, debug = false} = {}) => {
    if (_provider === provider.Nexra) {
        return await getNexraResponse(prompt, options, {fetch: fetch, debug: debug});
    } else if (_provider === provider.DeepInfra) {
        return await getDeepInfraResponse(prompt, options, {fetch: fetch, debug: debug});
    } else if (_provider === provider.Rocks) {
        return await getRocksResponse(prompt, options, {fetch: fetch, debug: debug});
    } else {
        throw new Error("Provider not found.");
    }
};
