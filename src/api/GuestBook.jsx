import {api} from "./Http"

export const guestbookList = () =>
    api.get("/guestbook/list")