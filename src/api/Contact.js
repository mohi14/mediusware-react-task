const BASE_URL = "https://contact.mediusware.com"

export const getAllContact = async () => {
    const res = await fetch(`${BASE_URL}/api/contacts/`);
    return res.json()
}

export const getUsContact = async () => {
    const res = await fetch(`${BASE_URL}/api/country-contacts/United%20States/`);
    return res.json()
}