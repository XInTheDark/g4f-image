import { sleep } from "../helper";

const api_url = "https://nexra.aryahcr.cc/api/image/complements";

export const getNexraResponse = async (prompt, options, { fetch = global.fetch, debug = false } = {}) => {
    if (!(typeof fetch === "function")) {
        throw new Error("Fetch is not defined globally. Please provide a polyfill.");
    }

    let headers = { 'Content-Type': 'application/json' };
    let model = options.model || "prodia";
    let data = { prompt: prompt, model: model, response: "base64", data: options.data };
    if (debug) console.log(data);

    const response = await fetch(api_url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`status: ${response.status}, error: ${await response.text()}`);
    }

    const result = await response.json();
    const id = result.id;
    if (!id) {
        throw new Error(`No ID returned: ${result}`);
    }

    let url = `${api_url}/${encodeURIComponent(id)}`;
    let ready = false;
    let data2 = null;
    if (debug) console.log(url);

    while (!ready) {
        const response2 = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        const result2 = await response2.json();
        data2 = result2.data;
        if (debug) console.log(data2?.status);

        switch (data2?.status) {
            case "pending":
                await sleep(500);
                break;
            case "error":
                throw new Error(`Error: ${data2}`);
            case "not_found":
                throw new Error(`Error: Not found: ${data2}`);
            case "completed":
                ready = true;
                break;
        }
    }

    const image = data2.images[0];
    return handleResponse(image);
}

const handleResponse = (text) => {
    text = text.substring(text.indexOf('{'), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(';base64,').pop();
    return img;
}