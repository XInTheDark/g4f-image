const api_url = "https://nexra.aryahcr.cc/api/image/complements";

export const getNexraResponse = async (prompt, options, {fetch = global.fetch} = {}) => {
    if (!(typeof fetch === "function")) {
        throw new Error("Fetch is not defined globally. Please provide a polyfill.");
    }

    let headers = { 'Content-Type': 'application/json' };
    let model = options.model || "prodia";
    let data = { prompt: prompt, model: model, data: options.data };

    const response = await fetch(api_url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`status: ${response.status}, error: ${await response.text()}`);
    }

    const result = await response.text();
    return handleResponse(result);
}

const handleResponse = (text) => {
    text = text.substring(text.indexOf('{'), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(';base64,').pop();
    return img;
}