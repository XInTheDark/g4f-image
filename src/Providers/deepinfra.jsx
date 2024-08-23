const api_url = "https://api.deepinfra.com/v1/inference";

const headers = {
    Accept: "text/event-stream",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US",
    "Content-Type": "application/json",
    Connection: "keep-alive",
    Origin: "https://deepinfra.com",
    Referer: "https://deepinfra.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "X-Deepinfra-Source": "web-embed",
    "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
};

export const getDeepInfraResponse = async (prompt, options, {fetch = global.fetch} = {}) => {
    if (!(typeof fetch === "function")) {
        throw new Error("Fetch is not defined globally. Please provide a polyfill.");
    }

    let url = `${api_url}/${options.model}`;

    let data = {prompt: prompt, data: options.data};

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`status: ${response.status}, error: ${await response.text()}`);
    }

    let result = await response.json();
    return result.images[0].split(';base64,').pop();
}


