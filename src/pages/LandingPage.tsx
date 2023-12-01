import { Icon } from "@iconify/react";
import TeacherImage from "../assets/images/teacher.jpg";

export default function LandingPage() {
    return (
        <div className="h-screen">
            {/* Barre de navigation qui contient le logo et le lien vers la page de connexion */}
            <nav className="flex h-1 w-full items-center justify-between p-8">
                <a href="/" className="text-2xl font-bold text-zinc-200">
                    λ
                </a>
                <a
                    href="/login"
                    className="flex items-center gap-1 border-b border-b-zinc-200 pb-0 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer hover:border-b-brand-yellow hover:text-brand-yellow"
                >
                    SE CONNECTER
                    <Icon
                        icon="tabler:arrow-up-right"
                        fontSize={20}
                        className=""
                    />
                </a>
            </nav>
            <main className="flex w-full flex-1 flex-col gap-4 p-8 xl:flex-row xl:gap-0">
                {/* Left container */}
                <div className="flex h-full w-full flex-1 flex-col items-start justify-center gap-8">
                    <p className="font-jakarta text-5xl font-extrabold text-zinc-200 md:text-6xl lg:text-7xl xl:text-8xl">
                        Une meilleure manière de corriger
                    </p>
                    <p className="font-inter text-xs leading-normal text-zinc-200 md:text-base">
                        ARRETEZ ENFIN DE FOUILLER VOS CARTABLES ET ACCORDEZ VOUS
                        UN MEILLEUR SYSTEME DE CORRECTION POUR VOS EXAMENS.
                        LAMBDA VOUS PERMET DE GERER LES EPREUVES ET LES NOTES EN
                        QUELQUES CLICS ET EN TOUTE SERENITE.
                    </p>
                    <div className="flex w-full flex-col items-start justify-start gap-2">
                        <div className="flex w-full flex-1 items-center justify-start gap-2">
                            <button className="lg:text-md flex h-10 w-48 items-center justify-center gap-2 rounded-md bg-green-500 font-jakarta text-xs font-extrabold tracking-tight text-zinc-800 transition-all hover:brightness-95 active:scale-95 md:h-12 md:w-64 md:text-lg">
                                Gestion d'examens
                                <Icon
                                    icon="iconoir:eye-solid"
                                    fontSize={20}
                                    className="hidden md:block"
                                />
                            </button>
                            <button className="lg:text-md flex h-10 w-48 items-center justify-center gap-2 rounded-md bg-brand-yellow font-jakarta text-xs font-extrabold tracking-tight text-zinc-800 transition-all hover:brightness-95 active:scale-95 md:h-12 md:w-64 md:text-lg">
                                Correction anonyme
                                <Icon
                                    icon="icon-park-outline:notes"
                                    fontSize={20}
                                    className="hidden md:block"
                                />
                            </button>
                        </div>
                        <div className="flex w-full flex-1 items-center justify-start gap-2">
                            <button className="lg:text-md flex h-10 w-48 items-center justify-center gap-2 rounded-md bg-purple-500 font-jakarta text-xs font-extrabold tracking-tight text-zinc-800 transition-all hover:brightness-95 active:scale-95 md:h-12 md:w-64 md:text-lg">
                                Prise de notes
                                <Icon
                                    icon="iconamoon:pen-bold"
                                    fontSize={20}
                                    className="hidden md:block"
                                />
                            </button>
                            <button className="lg:text-md flex h-10 w-48 items-center justify-center gap-2 rounded-md bg-orange-500 font-jakarta text-xs font-extrabold tracking-tight text-zinc-800 transition-all hover:brightness-95 active:scale-95 md:h-12 md:w-64 md:text-lg">
                                Et bien plus...
                            </button>
                        </div>
                    </div>
                    <a
                        href="/login"
                        className="flex items-center gap-1 border-b border-b-zinc-200 pb-0 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer hover:border-b-brand-yellow hover:text-brand-yellow"
                    >
                        ACCEDER A LA DEMO
                        <Icon
                            icon="tabler:arrow-up-right"
                            fontSize={20}
                            className=""
                        />
                    </a>
                </div>
                {/* Right container */}
                <div className="relative flex h-[300px] w-full flex-1 flex-col items-end rounded-md xl:h-[600px]">
                    <img
                        src={TeacherImage}
                        alt="Teacher"
                        className="h-full w-full rounded-md object-cover xl:w-[600px]"
                    />
                </div>
            </main>
        </div>
    );
}
