type LangType = "ru" | "en" | "es";

const authControllerLoc = {
    errors: {
        "404": {
            ru: "Пользователь с данным логином и/или паролем не найден",
            en: "",
            es: ""
        }
    }
}

export { authControllerLoc, LangType };