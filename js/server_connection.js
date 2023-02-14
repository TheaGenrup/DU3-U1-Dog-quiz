"use strict"

async function fetch_resource(url, body) {

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const resource = await fetch(request);
    console.log(resource);
    const response = await resource.json();
    console.log(response);

    /*     if (resource.status === "200") {
            return resource.json();
        } */
}