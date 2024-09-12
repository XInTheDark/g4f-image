const api_url = "https://api.airforce/imagine";

const headers = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    Authorization: "Bearer missing api key",
    Origin: "https://llmplayground.net",
    Referer: "https://llmplayground.net/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    "Content-Type": "application/json", // important as we are sending a JSON payload
};

export const getRocksResponse = async (prompt, options, { fetch = global.fetch } = {}) => {
    if (!(typeof fetch === "function")) {
        throw new Error("Fetch is not defined globally. Please provide a polyfill.");
    }

    const model = options.model || "flux";
    const data = {
        prompt: prompt,
        model: model,
    };
    const params = new URLSearchParams(data);
    const url = `${api_url}?${params.toString()}`;

    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        throw new Error(`status: ${response.status}, error: ${await response.text()}`);
    }

    // get raw binary image data
    const binaryImage = await (await response.blob()).arrayBuffer();

    // convert to base64
    function _arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    return _arrayBufferToBase64(binaryImage);
}