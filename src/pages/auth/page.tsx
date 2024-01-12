import { useState } from "react";
import { redirect } from "react-router-dom";

export default function AuthPage() {
    const [id, setId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    async function onSubmit() {
        if (id && password) {
            setLoading(true);
            setTimeout(() => {
                if (id === "correcteur" && password === "correcteur") {
                    redirect("/");
                }
                setLoading(false);
            }, 2000);
        }
    }

    return (
        <div className="flex h-screen w-full flex-col">
            <nav className="flex h-1 w-full items-center justify-center p-8">
                <a href="/" className="text-2xl font-bold text-zinc-200">
                    λ
                </a>
            </nav>
            <main className="flex w-full flex-1 flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-start gap-16">
                    <p className="font-jakarta text-2xl font-extrabold text-zinc-200 md:text-3xl lg:text-4xl xl:text-5xl">
                        {loading}
                    </p>
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col items-center justify-center gap-8"
                    >
                        <input
                            type="text"
                            value={id}
                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                setId(e.currentTarget.value)
                            }
                            placeholder="IDENTIFIANT"
                            className="w-[400px] border-b border-b-zinc-200 bg-transparent pb-1 font-inter text-sm text-zinc-200 outline-none placeholder:text-zinc-300"
                        />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                setPassword(e.currentTarget.value)
                            }
                            className="w-[400px] border-b border-b-zinc-200 bg-transparent pb-1 font-inter text-sm text-zinc-200 outline-none placeholder:text-zinc-300"
                        />
                        <div className="flex flex-col gap-2 text-center">
                            <a
                                href="/grades"
                                className="tracking-tightest rounded-full text-xs bg-brand-yellow p-3 px-6 font-jakarta font-extrabold active:bg-zinc-800 active:text-brand-yellow"
                            >
                                Se connecter en tant qu'administrateur
                            </a>
                            <a
                                href="/examens"
                                className="tracking-tightest rounded-full text-xs bg-orange-500 p-3 px-6 font-jakarta font-extrabold active:bg-zinc-800 active:text-brand-yellow"
                            >
                                Se connecter en tant que surveillant
                            </a>
                            <a
                                href="/grades"
                                className="tracking-tightest rounded-full text-xs bg-purple-500 p-3 px-6 font-jakarta font-extrabold active:bg-zinc-800 active:text-brand-yellow"
                            >
                                Se connecter en tant que correcteur
                            </a>
                        </div>
                        {/* <a
                            href="/login"
                            className="-mt-2 flex items-center gap-1 border-b border-b-zinc-200 pb-0 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer hover:border-b-brand-yellow hover:text-brand-yellow"
                        >
                            MOT DE PASSE OUBLIE
                            <Icon
                                icon="tabler:arrow-up-right"
                                fontSize={20}
                                className=""
                            />
                        </a> */}
                    </form>
                </div>
            </main>
        </div>
    );
}
