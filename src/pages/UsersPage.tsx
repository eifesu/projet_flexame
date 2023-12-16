import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import useUsers from "../store/useUsers";
import Modal from "../components/ModalComponent";

export default function UsersPage() {
    const { createUser, getAllUsers, updateUser, deleteUser } = useUsers();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [type, setType] = useState<"admin" | "correcteur" | "surveillant">();

    async function getUsers() {
        const arr = await getAllUsers();
        console.log(arr);
        if (Array.isArray(arr)) {
            setUsers(arr);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="flex h-screen w-full flex-col">
            <nav className="flex w-full flex-col items-center justify-center gap-4 border-b border-b-zinc-800 p-8 py-4">
                <div className="flex w-full items-center justify-between">
                    <a href="/" className="text-2xl font-bold text-zinc-200">
                        λ
                    </a>
                    <a
                        href="/login"
                        className="flex items-center gap-1 border-b border-b-zinc-200 pb-0 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer hover:border-b-brand-yellow hover:text-brand-yellow"
                    >
                        SE DECONNECTER
                        <Icon
                            icon="tabler:arrow-up-right"
                            fontSize={20}
                            className=""
                        />
                    </a>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="/effectifs"
                            className="flex items-center justify-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 p-2 px-4 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer"
                        >
                            EFFECTIFS
                        </a>
                        <a
                            href="/utilisateurs"
                            className="flex items-center justify-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 p-2 px-4 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer"
                        >
                            UTILISATEURS
                        </a>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow font-inter text-lg font-bold text-zinc-900">
                            AA
                        </div>
                        <div className="mr-4 flex flex-col items-start justify-start font-jakarta font-bold text-zinc-200">
                            <p className="text-xs opacity-50">Nom complet</p>
                            <p>AKA Adingra</p>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-[10px] font-extrabold text-zinc-900">
                            Admin
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex w-full flex-1 select-none items-start justify-center gap-4 p-4">
                <div className="h-full w-[800px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                    <div className="flex w-full items-center justify-between p-4">
                        <p className="font-jakarta text-2xl font-bold text-zinc-200">
                            Utilisateurs
                        </p>
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={() => {
                                    setIsCreating(true);
                                    setSelectedUser(undefined);
                                }}
                                className="flex h-10 items-center justify-between gap-1 rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900"
                            >
                                Ajouter un compte
                                <svg
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.1667 8.6653H9.16671V12.6653H7.83337V8.6653H3.83337V7.33197H7.83337V3.33197H9.16671V7.33197H13.1667V8.6653Z"
                                        fill="black"
                                    />
                                </svg>
                            </button>
                            <div className="flex h-10 w-fit items-center justify-between gap-1 rounded-full bg-zinc-900 p-2 px-4 font-jakarta text-xs font-extrabold">
                                <input
                                    type="text"
                                    placeholder="Rechercher un utilisateur"
                                    className="bg-transparent text-zinc-200 outline-none placeholder:text-zinc-700"
                                />
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-zinc-500"
                                >
                                    <g opacity="0.5">
                                        <path
                                            d="M13.0667 14L8.86667 9.8C8.53333 10.0667 8.15 10.2778 7.71667 10.4333C7.28333 10.5889 6.82222 10.6667 6.33333 10.6667C5.12222 10.6667 4.09733 10.2471 3.25867 9.408C2.42 8.56889 2.00044 7.544 2 6.33333C2 5.12222 2.41956 4.09733 3.25867 3.25867C4.09778 2.42 5.12267 2.00044 6.33333 2C7.54444 2 8.56956 2.41956 9.40867 3.25867C10.2478 4.09778 10.6671 5.12267 10.6667 6.33333C10.6667 6.82222 10.5889 7.28333 10.4333 7.71667C10.2778 8.15 10.0667 8.53333 9.8 8.86667L14 13.0667L13.0667 14ZM6.33333 9.33333C7.16667 9.33333 7.87511 9.04178 8.45867 8.45867C9.04222 7.87556 9.33378 7.16711 9.33333 6.33333C9.33333 5.5 9.04178 4.79178 8.45867 4.20867C7.87556 3.62556 7.16711 3.33378 6.33333 3.33333C5.5 3.33333 4.79178 3.62511 4.20867 4.20867C3.62556 4.79222 3.33378 5.50044 3.33333 6.33333C3.33333 7.16667 3.62511 7.87511 4.20867 8.45867C4.79222 9.04222 5.50044 9.33378 6.33333 9.33333Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <table className="mt-2 w-full border-t border-t-zinc-700">
                        <tr className="">
                            <th className="p-4 py-3 text-start text-xs font-bold opacity-50">
                                Nom de famille
                                <Icon
                                    icon="ion:caret-down"
                                    fontSize={16}
                                    className="ml-1 inline"
                                />
                            </th>
                            <th className="p-4 py-3 text-start text-xs font-bold opacity-50">
                                Prénom
                                <Icon
                                    icon="ion:caret-down"
                                    fontSize={12}
                                    className="ml-1 inline"
                                />
                            </th>
                            <th className="p-4 py-3 text-start text-xs font-bold opacity-50">
                                Identifiant
                                <Icon
                                    icon="ion:caret-down"
                                    fontSize={12}
                                    className="ml-1 inline"
                                />
                            </th>
                            <th className="p-4 text-start text-xs font-bold opacity-50"></th>
                            <th className="p-4 text-start text-xs font-bold opacity-50"></th>
                        </tr>
                        {users.map((user) => {
                            return (
                                <tr
                                    onClick={() => {
                                        selectedUser?.id !== user.id
                                            ? setSelectedUser(user)
                                            : setSelectedUser(undefined);
                                        setIsCreating(false);
                                    }}
                                    className={
                                        "h-12 border-b border-t border-b-zinc-700 border-t-zinc-700 bg-zinc-800 px-4 transition-all hover:bg-zinc-900 " +
                                        `${
                                            selectedUser?.id == user.id &&
                                            "border-l-4 border-l-brand-yellow"
                                        }`
                                    }
                                >
                                    <td className="px-4 py-3 text-sm font-bold">
                                        <Icon
                                            icon="fluent-emoji:student-medium"
                                            fontSize={16}
                                            className="mr-2 inline"
                                        />
                                        {user.lastName}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold">
                                        {user.firstName}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold">
                                        {user.username}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold">
                                        {user.type == "admin" && (
                                            <div
                                                className={
                                                    "flex h-8 items-center border-2 transition-all justify-center rounded-full p-1 font-jakarta text-xs font-extrabold bg-brand-yellow text-zinc-900 border-transparent"
                                                }
                                            >
                                                Admin
                                            </div>
                                        )}
                                        {user.type == "surveillant" && (
                                            <div
                                                className={
                                                    "flex h-8 items-center border-2 transition-all justify-center rounded-full p-1 font-jakarta text-xs font-extrabold bg-purple-500 text-zinc-900 border-transparent"
                                                }
                                            >
                                                Surveillant
                                            </div>
                                        )}
                                        {user.type == "correcteur" && (
                                            <div
                                                className={
                                                    "flex h-8 items-center border-2 transition-all justify-center rounded-full p-1 font-jakarta text-xs font-extrabold bg-orange-500 text-zinc-900 border-transparent"
                                                }
                                            >
                                                Correcteur
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold">
                                        <div className="flex h-8 items-center justify-center gap-1 rounded-full bg-zinc-900 p-1 font-jakarta text-[10px] font-extrabold text-brand-yellow transition-all hover:cursor-pointer hover:bg-brand-yellow hover:text-zinc-800 hover:brightness-90">
                                            Modifier
                                            <Icon
                                                icon="ion:options"
                                                fontSize={12}
                                                className=""
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>

                <Modal
                    show={selectedUser !== undefined}
                    onClose={() => {
                        setSelectedUser(undefined);
                    }}
                >
                    {selectedUser && (
                        <div className="w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                            <div className="flex w-full items-center justify-between border-b border-b-zinc-700 p-4 pb-6">
                                <p className="font-jakarta text-2xl font-bold text-zinc-200">
                                    Modifier compte
                                </p>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        onClick={() => {
                                            deleteUser(selectedUser.id);
                                            setSelectedUser(undefined);
                                            getUsers();
                                        }}
                                        className="flex h-10 items-center justify-between gap-1 rounded-full bg-red-900 p-2 px-4 font-jakarta text-xs font-extrabold text-red-100"
                                    >
                                        Supprimer le compte
                                        <Icon
                                            icon="iconamoon:trash-fill"
                                            fontSize={16}
                                            className="ml-1 inline"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-start justify-start gap-6 p-4">
                                <input
                                    type="text"
                                    value={selectedUser.lastName ?? ""}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        // @ts-expect-error : Typescript is very cool
                                        setSelectedUser((prev) => ({
                                            ...prev,
                                            lastName: e.currentTarget.value,
                                        }));
                                    }}
                                    placeholder="Nom de famille"
                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                />
                                <input
                                    type="text"
                                    value={selectedUser.firstName ?? ""}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        // @ts-expect-error : Typescript is very cool
                                        setSelectedUser((prev) => ({
                                            ...prev,
                                            firstName: e.currentTarget.value,
                                        }));
                                    }}
                                    placeholder="Prénom"
                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                />
                                <input
                                    type="text"
                                    value={selectedUser.username ?? ""}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        // @ts-expect-error : Typescript is very cool
                                        setSelectedUser((prev) => ({
                                            ...prev,
                                            username: e.currentTarget.value,
                                        }));
                                    }}
                                    placeholder="Identifiant"
                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                />
                                <div className="flex items-center justify-start gap-4">
                                    <button
                                        onClick={() =>
                                            setSelectedUser((prev) =>
                                                prev
                                                    ? { ...prev, type: "admin" }
                                                    : undefined
                                            )
                                        }
                                        className={
                                            "flex h-8 items-center border-2 transition-all justify-center rounded-full p-2 px-4 font-jakarta text-xs font-extrabold " +
                                            `${
                                                selectedUser.type == "admin"
                                                    ? "bg-brand-yellow text-zinc-900 border-transparent"
                                                    : "bg-transparent border-brand-yellow"
                                            }`
                                        }
                                    >
                                        Admin
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedUser((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          type: "surveillant",
                                                      }
                                                    : undefined
                                            )
                                        }
                                        className={
                                            "flex h-8 items-center border-2 transition-all justify-center rounded-full p-2 px-4 font-jakarta text-xs font-extrabold " +
                                            `${
                                                selectedUser.type ==
                                                "surveillant"
                                                    ? "bg-purple-500 text-zinc-900 border-transparent"
                                                    : "bg-transparent border-purple-500"
                                            }`
                                        }
                                    >
                                        Surveillant
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedUser((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          type: "correcteur",
                                                      }
                                                    : undefined
                                            )
                                        }
                                        className={
                                            "flex h-8 items-center border-2 transition-all justify-center rounded-full p-2 px-4 font-jakarta text-xs font-extrabold " +
                                            `${
                                                selectedUser.type ==
                                                "correcteur"
                                                    ? "bg-orange-500 text-zinc-900 border-transparent"
                                                    : "bg-transparent border-orange-500"
                                            }`
                                        }
                                    >
                                        Correcteur
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        updateUser(
                                            selectedUser.id,
                                            selectedUser
                                        )
                                    }
                                    className="disabled flex h-10 items-center justify-between gap-1 self-end rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900"
                                >
                                    Enregistrer
                                    <Icon
                                        icon="ic:round-save"
                                        fontSize={16}
                                        className="ml-1 inline"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>

                <Modal show={isCreating} onClose={() => setIsCreating(false)}>
                    {isCreating && (
                        <div className="w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                            <div className="flex w-full items-center justify-between border-b border-b-zinc-700 p-4 pb-6">
                                <p className="font-jakarta text-2xl font-bold text-zinc-200">
                                    Nouveau compte
                                </p>
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className="flex h-10 items-center justify-between gap-1 rounded-full bg-red-900 p-2 px-4 font-jakarta text-xs font-extrabold text-red-100"
                                    >
                                        Annuler
                                        <Icon
                                            icon="iconamoon:trash-fill"
                                            fontSize={16}
                                            className="ml-1 inline"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-start justify-start gap-6 p-4">
                                <input
                                    type="text"
                                    value={lastName ?? ""}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        setLastName(e.currentTarget.value);
                                    }}
                                    placeholder="Nom de famille"
                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                />
                                <input
                                    type="text"
                                    value={firstName ?? ""}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        setFirstName(e.currentTarget.value);
                                    }}
                                    placeholder="Prénom"
                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                />
                                <input
                                    type="text"
                                    value={username ?? ""}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        setUsername(e.currentTarget.value);
                                    }}
                                    placeholder="Identifiant"
                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                />
                                <div className="flex items-center justify-start gap-4">
                                    <button
                                        onClick={() => setType("admin")}
                                        className={
                                            "flex h-8 items-center border-2 transition-all justify-center rounded-full p-2 px-4 font-jakarta text-xs font-extrabold " +
                                            `${
                                                type == "admin"
                                                    ? "bg-brand-yellow text-zinc-900 border-transparent"
                                                    : "bg-transparent border-brand-yellow"
                                            }`
                                        }
                                    >
                                        Admin
                                    </button>
                                    <button
                                        onClick={() => setType("surveillant")}
                                        className={
                                            "flex h-8 items-center border-2 transition-all justify-center rounded-full p-2 px-4 font-jakarta text-xs font-extrabold " +
                                            `${
                                                type == "surveillant"
                                                    ? "bg-purple-500 text-zinc-900 border-transparent"
                                                    : "bg-transparent border-purple-500"
                                            }`
                                        }
                                    >
                                        Surveillant
                                    </button>
                                    <button
                                        onClick={() => setType("correcteur")}
                                        className={
                                            "flex h-8 items-center border-2 transition-all justify-center rounded-full p-2 px-4 font-jakarta text-xs font-extrabold " +
                                            `${
                                                type == "correcteur"
                                                    ? "bg-orange-500 text-zinc-900 border-transparent"
                                                    : "bg-transparent border-orange-500"
                                            }`
                                        }
                                    >
                                        Correcteur
                                    </button>
                                </div>
                                <button
                                    disabled={
                                        !firstName ||
                                        !lastName ||
                                        !type ||
                                        !username
                                    }
                                    onClick={() => {
                                        if (
                                            !(
                                                !firstName ||
                                                !lastName ||
                                                !type ||
                                                !username
                                            )
                                        ) {
                                            createUser({
                                                firstName,
                                                lastName,
                                                password: "password",
                                                type,
                                                username,
                                            });
                                            setIsCreating(false);
                                            getUsers();
                                        }
                                    }}
                                    className="flex h-10 items-center justify-between gap-1 self-end rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900 disabled:bg-zinc-900 disabled:text-zinc-700"
                                >
                                    Enregistrer
                                    <Icon
                                        icon="ic:round-save"
                                        fontSize={16}
                                        className="ml-1 inline"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </main>
        </div>
    );
}
