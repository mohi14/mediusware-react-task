const BASE_URL = "https://contact.mediusware.com"

export const getAllContact = async (searchParams) => {
    const res = await fetch(`${BASE_URL}/api/contacts/${searchParams ? searchParams : ""}`);
    return res.json()
}

export const getUsContact = async (searchParams) => {
    const res = await fetch(`${BASE_URL}/api/country-contacts/United%20States/${searchParams ? searchParams : ""}`);
    return res.json()
}