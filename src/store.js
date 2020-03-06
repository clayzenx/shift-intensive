import { writable } from 'svelte/store';

export const uLogged = writable(true);
export const activDealList = writable([]);

export const user = writable({
    id: "55",
    login: "Eva",
    password: "12345",
    registrationDate: "01-02-2020",
    name: "Eva",
    balance: 50,
    avatar: "avatar1"
});

export const dealList = writable([
    {
        taskId: 1 ,
        ownerId: "22",
        performerId: "33",
        taskName: "Выгулять собаку",
        taskStatus: 0,
        taskDescription: "Нужно выгулять мою собаку." ,
        taskCost: 5,
        creationDate: "01-01-2000",
        completionDate: "01-01-2000",
        taskPicture: "taskPicture",
        descriptionVisible: false,
    },
    {
        taskId: 2 ,
        ownerId: "22",
        performerId: "33",
        taskName: "Сходить в магазин",
        taskStatus: 0,
        taskDescription: "Нужно сходить мне за минералочкой." ,
        taskCost: 7,
        creationDate: "01-01-2000",
        completionDate: "01-01-2000",
        taskPicture: "taskPicture",
        descriptionVisible: false,
    },
]);



