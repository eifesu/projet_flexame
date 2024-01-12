import { Icon } from "@iconify/react/dist/iconify.js";

function Navigation() {
    return (
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
                    <div className="flex items-center justify-center rounded-full bg-purple-500 p-2 px-4 font-jakarta text-[10px] font-extrabold text-zinc-900">
                        Correcteur
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
