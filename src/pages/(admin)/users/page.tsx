import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import useUsers from "../../../store/useUsers";
import Modal from "../../../components/ui/Modal";
import Navigation from "../../../components/ui/Navigation";
import Button from "../../../components/ui/Button";
import { SearchGroup, SearchInput } from "../../../components/ui/Search";
import { useUsersPageStore } from "./_store";

type FormType = "create" | "update" | undefined;

function User({
    user,
    setFormIsOpen,
}: {
    user: User;
    setFormIsOpen: React.Dispatch<React.SetStateAction<FormType>>;
}) {
    const { selectedUser, setSelectedUser } = useUsersPageStore();
    return (
        <tr
            onClick={() => {
                selectedUser?.id !== user.id
                    ? setSelectedUser(user)
                    : setSelectedUser(undefined);
                setFormIsOpen("update");
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
            <td className="px-4 py-3 text-sm font-bold">{user.firstName}</td>
            <td className="px-4 py-3 text-sm font-bold">{user.username}</td>
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
                    <Icon icon="ion:options" fontSize={12} className="" />
                </div>
            </td>
        </tr>
    );
}

function UserForm({
    formIsOpen,
    setFormIsOpen,
}: {
    formIsOpen: FormType;
    setFormIsOpen: React.Dispatch<React.SetStateAction<FormType>>;
}) {
    const { createUser, updateUser, deleteUser } = useUsers();
    const { selectedUser, setSelectedUser } = useUsersPageStore();

    const [firstName, setFirstName] = useState<string>(
        selectedUser?.firstName ?? ""
    );
    const [lastName, setLastName] = useState<string>(
        selectedUser?.lastName ?? ""
    );
    const [username, setUsername] = useState<string>(
        selectedUser?.username ?? ""
    );
    const [type, setType] = useState<"admin" | "correcteur" | "surveillant">(
        selectedUser?.type ?? "surveillant"
    );

    return (
        <div className="w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
            <div className="flex w-full items-center justify-between border-b border-b-zinc-700 p-4 pb-6">
                {/* Form Title */}
                {formIsOpen == "create" && (
                    <p className="font-jakarta text-2xl font-bold text-zinc-200">
                        Nouveau compte
                    </p>
                )}
                {formIsOpen == "update" && selectedUser && (
                    <p className="font-jakarta text-2xl font-bold text-zinc-200">
                        Modifier compte
                    </p>
                )}
                {/* Form Delete / Cancel */}
                <div className="flex items-center justify-between gap-4">
                    {formIsOpen == "update" && selectedUser && (
                        <button
                            onClick={() => {
                                deleteUser(selectedUser.id);
                                setSelectedUser(undefined);
                            }}
                            className="flex h-10 items-center justify-between gap-1 rounded-full bg-red-900 p-2 px-4 font-jakarta text-xs font-extrabold text-red-100 transition-all hover:brightness-90 active:scale-95"
                        >
                            Supprimer le compte
                            <Icon
                                icon="iconamoon:trash-fill"
                                fontSize={16}
                                className="ml-1 inline"
                            />
                        </button>
                    )}

                    {formIsOpen == "create" && (
                        <button
                            onClick={() => setFormIsOpen(undefined)}
                            className="flex h-10 items-center justify-between gap-1 rounded-full bg-red-900 p-2 px-4 font-jakarta text-xs font-extrabold text-red-100"
                        >
                            Annuler
                            <Icon
                                icon="iconamoon:trash-fill"
                                fontSize={16}
                                className="ml-1 inline"
                            />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-6 p-4">
                <input
                    type="text"
                    value={lastName}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setLastName(e.currentTarget.value);
                    }}
                    placeholder="Nom de famille"
                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setFirstName(e.currentTarget.value);
                    }}
                    placeholder="Prénom"
                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setUsername(e.currentTarget.value);
                    }}
                    placeholder="Identifiant"
                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                />
                <div className="flex items-center justify-start gap-4">
                    <button
                        onClick={() => {
                            setType("admin");
                        }}
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
                        onClick={() => {
                            setType("surveillant");
                        }}
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
                        onClick={() => {
                            setType("correcteur");
                        }}
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

                {formIsOpen == "update" && selectedUser && (
                    <button
                        onClick={() =>
                            updateUser(selectedUser.id, {
                                firstName,
                                lastName,
                                type,
                                username,
                            })
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
                )}

                {formIsOpen == "create" && (
                    <button
                        disabled={!firstName || !lastName || !type || !username}
                        onClick={() => {
                            if (
                                !(!firstName || !lastName || !type || !username)
                            ) {
                                createUser({
                                    firstName,
                                    lastName,
                                    password: "password",
                                    type,
                                    username,
                                });
                                setFormIsOpen(undefined);
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
                )}
            </div>
        </div>
    );
}

export default function UsersPage() {
    const { getAllUsers } = useUsers();
    const { users, setSelectedUser } = useUsersPageStore();

    const [formIsOpen, setFormIsOpen] = useState<FormType>();

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex h-screen w-full flex-col">
            <Navigation />
            <main className="flex w-full flex-1 select-none items-start justify-center gap-4 p-4">
                <div className="h-full w-[800px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                    <div className="flex w-full items-center justify-between p-4">
                        <p className="font-jakarta text-2xl font-bold text-zinc-200">
                            Utilisateurs
                        </p>
                        <div className="flex items-center justify-between gap-4">
                            <Button
                                onClick={() => {
                                    setFormIsOpen("create");
                                    setSelectedUser(undefined);
                                }}
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
                                        fill="currentColor"
                                    />
                                </svg>
                            </Button>
                            <SearchGroup>
                                <SearchInput
                                    type="text"
                                    placeholder="Rechercher un utilisateur"
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
                            </SearchGroup>
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
                                <User
                                    user={user}
                                    key={user.id}
                                    setFormIsOpen={setFormIsOpen}
                                />
                            );
                        })}
                    </table>
                </div>

                <Modal
                    show={formIsOpen !== undefined}
                    onClose={() => {
                        setFormIsOpen(undefined);
                    }}
                >
                    <UserForm
                        formIsOpen={formIsOpen}
                        setFormIsOpen={setFormIsOpen}
                    />
                </Modal>
            </main>
        </div>
    );
}
