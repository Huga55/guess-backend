export type LangType = "ru" | "en" | "es";

export const authControllerLoc = {
    errors: {
        "404": {
            ru: "Пользователь с данным логином и/или паролем не найден",
            en: "",
            es: ""
        },
        "409": {
            ru: "Пользователь с данным email/именем уже существует",
            en: "",
            es: ""
        },
        "409-remember": {
            ru: "Пользователь с данным email не найден",
            en: "",
            es: ""
        }
    },
    validate: {
        email: {
            ru: "Неверный формат email",
            en: "",
            es: ""
        },
        password: {
            ru: "Пароль должен содержать не менее 6ти символов",
            en: "",
            es: ""
        },
        name: {
            ru: "Поле имя не должно быть пустым",
            en: "",
            es: ""
        }
    },
    success: {
        remember: {
            ru: "На Ваш email был выслан сгенерированный пароль",
            en: "",
            es: ""
        }
    },
    mail: {
        title: {
            ru: "ВОССТАНОВЛЕНИЕ ПАРОЛЯ",
            en: "",
            es: ""
        },
        message: {
            ru: (password: string): string => `Ваше новый пароль: ${password}. С данного момента старый пароль больше не действителен. По возникшим вопросам можете воспользоваться формой обратной связи
                на сайте https://wimdev.com`,
            en: (password: string): string => "",
            es: (password: string): string => ""
        }
    }
}

export const authMiddlewareLoc = {
    errors: {
        "401": {
            ru: "Неверный токен",
            en: "",
            es: ""
        }
    }
}