export const getEndpointFetch = async (url) => await fetch(url).then(res => res.json()).then(data => data)
