import { Icon } from "@iconify/react/dist/iconify.js";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import db from "../../../lib/firebase";
import Modal from "../../../components/ui/Modal";
import {
    Page,
    View,
    Document,
    StyleSheet,
    Image,
    PDFDownloadLink,
    Text,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
});

export default function ExamPage() {
    const [classes, setClasses] = useState<Classe[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>();
    const [selectedClass, setSelectedClass] = useState<Classe>();

    const [isEditingExam, setIsEditingExam] = useState<boolean>(false);
    const [isCreatingExam, setIsCreatingExam] = useState<boolean>(false);
    const [selectedExam, setSelectedExam] = useState<Exam>();
    const [examName, setExamName] = useState<string>("");
    const [students, setStudents] = useState<Student[]>([]);

    const q = collection(db, "classes");
    const s = collection(db, "students");
    const e = collection(db, "exams");

    function generateCodes(exam: Exam) {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        {students
                            .filter(
                                (student) =>
                                    student.classId == selectedClass?.id
                            )
                            .map((taker) => {
                                if (taker.id)
                                    return (
                                        <View style={styles.section}>
                                            <Image
                                                source={QRCode.toDataURL(
                                                    exam.id + "-" + taker.id
                                                )}
                                                style={{
                                                    height: 128,
                                                    width: 128,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 4,
                                                }}
                                            >
                                                <Text style={{ fontSize: 24 }}>
                                                    {taker.lastName}{" "}
                                                    {taker.firstName}
                                                </Text>
                                                <Text style={{ fontSize: 16 }}>
                                                    {selectedClass?.name}
                                                </Text>
                                                <Text style={{ fontSize: 12 }}>
                                                    {exam.name}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                            })}
                    </View>
                </Page>
            </Document>
        );
    }

    async function getStudents() {
        const querySnapshot = await getDocs(s);
        const arr = querySnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Student),
        }));
        console.log(arr);
        setStudents(arr);
    }

    async function updateExam(
        id: string,
        updatedData: Partial<Exam>
    ): Promise<void | Error> {
        try {
            const examDoc = doc(db, "exams", id);
            await updateDoc(examDoc, updatedData);
        } catch (error) {
            return new Error("Error updating document: " + error);
        }
    }

    async function createExam(examData: Omit<Exam, "id">) {
        await addDoc(e, examData);
    }

    async function getClasses() {
        const querySnapshot = await getDocs(q);
        const arr = querySnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Classe),
        }));
        setClasses(arr);
    }

    async function getExams() {
        const querySnapshot = await getDocs(e);
        const arr = querySnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Exam),
        }));
        console.log(arr);
        setExams(arr);
    }

    useEffect(() => {
        getClasses();
        getExams();
        getStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            href="/examens"
                            className="flex items-center justify-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 p-2 px-4 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer"
                        >
                            EXAMENS
                        </a>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4">
                        <div className="flex items-center justify-center rounded-full bg-orange-500 p-2 px-4 font-jakarta text-[10px] font-extrabold text-zinc-900">
                            Surveillant
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex w-full flex-1 select-none items-start justify-center gap-4 p-4">
                {/* Navigateur filières */}
                <div className="h-full w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                    <div className="flex w-full items-center justify-between p-4">
                        <p className="font-jakarta text-2xl font-bold text-zinc-200">
                            Filières
                        </p>
                        <div className="flex items-center justify-between gap-4"></div>
                    </div>
                    <table className="mt-2 w-full overflow-y-scroll border-t border-t-zinc-700">
                        <tr className="">
                            <th className="p-4 py-3 text-start text-xs font-bold opacity-50">
                                Nom de la filière
                                <Icon
                                    icon="ion:caret-down"
                                    fontSize={16}
                                    className="ml-1 inline"
                                />
                            </th>
                            <th className="p-4 py-3 text-start text-xs font-bold opacity-50">
                                Classes
                                <Icon
                                    icon="ion:caret-down"
                                    fontSize={12}
                                    className="ml-1 inline"
                                />
                            </th>
                        </tr>
                        <tr
                            onClick={() => {
                                selectedBranch !== "MIAGE"
                                    ? setSelectedBranch("MIAGE")
                                    : setSelectedBranch(undefined);
                            }}
                            className={
                                "h-12 border-b border-t border-b-zinc-700 border-t-zinc-700 w-full bg-zinc-800 px-4 transition-all hover:bg-zinc-850 "
                            }
                        >
                            <td className="px-4 py-3 text-sm font-bold">
                                <Icon
                                    icon="fluent-emoji:file-folder"
                                    fontSize={16}
                                    className="mr-2 inline"
                                />
                                MIAGE
                            </td>
                            <td className="px-4 py-3 text-sm font-bold">
                                {
                                    classes.filter(
                                        (obj) => obj.major == "MIAGE"
                                    ).length
                                }{" "}
                                classe(s)
                            </td>
                        </tr>
                        {classes
                            .filter((obj) => obj.major == "MIAGE")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((obj) => (
                                <tr
                                    onClick={() => {
                                        selectedClass?.id !== obj.id
                                            ? setSelectedClass(obj)
                                            : setSelectedClass(undefined);
                                    }}
                                    className={
                                        "h-10 border-b border-t border-b-zinc-700 border-t-zinc-700 w-full px-4 transition-all " +
                                        `${
                                            selectedClass?.id == obj.id
                                                ? "bg-brand-yellow text-zinc-800"
                                                : "text-zinc-200 bg-zinc-900"
                                        }`
                                    }
                                >
                                    <td className="px-8 py-2 text-sm font-bold">
                                        <Icon
                                            icon="fluent-emoji:newspaper"
                                            fontSize={16}
                                            className="mr-2 inline"
                                        />
                                        {obj.name}
                                    </td>
                                    <td className="px-8 py-2 text-sm font-bold">
                                        {
                                            exams.filter(
                                                (exam) => exam.classId == obj.id
                                            ).length
                                        }{" "}
                                        examens(s)
                                    </td>
                                </tr>
                            ))}
                        <tr
                            onClick={() => {
                                selectedBranch !== "ASSRI"
                                    ? setSelectedBranch("ASSRI")
                                    : setSelectedBranch(undefined);
                            }}
                            className={
                                "h-12 border-b border-t border-b-zinc-700 border-t-zinc-700 w-full bg-zinc-800 px-4 transition-all hover:bg-zinc-850 "
                            }
                        >
                            <td className="px-4 py-3 text-sm font-bold">
                                <Icon
                                    icon="fluent-emoji:file-folder"
                                    fontSize={16}
                                    className="mr-2 inline"
                                />
                                ASSRI
                            </td>
                            <td className="px-4 py-3 text-sm font-bold">
                                {
                                    classes.filter(
                                        (obj) => obj.major == "ASSRI"
                                    ).length
                                }{" "}
                                classe(s)
                            </td>
                        </tr>
                        {classes
                            .filter((obj) => obj.major == "ASSRI")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((obj) => (
                                <tr
                                    onClick={() => {
                                        selectedClass?.id !== obj.id
                                            ? setSelectedClass(obj)
                                            : setSelectedClass(undefined);
                                    }}
                                    className={
                                        "h-10 border-b border-t border-b-zinc-700 border-t-zinc-700 w-full px-4 transition-all " +
                                        `${
                                            selectedClass?.id == obj.id
                                                ? "bg-brand-yellow text-zinc-800"
                                                : "text-zinc-200 bg-zinc-900"
                                        }`
                                    }
                                >
                                    <td className="px-8 py-2 text-sm font-bold">
                                        <Icon
                                            icon="fluent-emoji:newspaper"
                                            fontSize={16}
                                            className="mr-2 inline"
                                        />
                                        {obj.name}
                                    </td>
                                    <td className="px-8 py-2 text-sm font-bold">
                                        {
                                            exams.filter(
                                                (exam) => exam.classId == obj.id
                                            ).length
                                        }{" "}
                                        examens(s)
                                    </td>
                                </tr>
                            ))}
                        <tr
                            onClick={() => {
                                selectedBranch !== "SEA"
                                    ? setSelectedBranch("SEA")
                                    : setSelectedBranch(undefined);
                            }}
                            className={
                                "h-12 border-b border-t border-b-zinc-700 border-t-zinc-700 w-full bg-zinc-800 px-4 transition-all hover:bg-zinc-850 "
                            }
                        >
                            <td className="px-4 py-3 text-sm font-bold">
                                <Icon
                                    icon="fluent-emoji:file-folder"
                                    fontSize={16}
                                    className="mr-2 inline"
                                />
                                SEA
                            </td>
                            <td className="px-4 py-3 text-sm font-bold">
                                {
                                    classes.filter((obj) => obj.major == "SEA")
                                        .length
                                }{" "}
                                classe(s)
                            </td>
                        </tr>
                        {classes
                            .filter((obj) => obj.major == "SEA")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((obj) => (
                                <tr
                                    onClick={() => {
                                        selectedClass?.id !== obj.id
                                            ? setSelectedClass(obj)
                                            : setSelectedClass(undefined);
                                    }}
                                    className={
                                        "h-10 border-b border-t border-b-zinc-700 border-t-zinc-700 w-full px-4 transition-all " +
                                        `${
                                            selectedClass?.id == obj.id
                                                ? "bg-brand-yellow text-zinc-800"
                                                : "text-zinc-200 bg-zinc-900"
                                        }`
                                    }
                                >
                                    <td className="px-8 py-2 text-sm font-bold">
                                        <Icon
                                            icon="fluent-emoji:newspaper"
                                            fontSize={16}
                                            className="mr-2 inline"
                                        />
                                        {obj.name}
                                    </td>
                                    <td className="px-8 py-2 text-sm font-bold">
                                        {
                                            exams.filter(
                                                (exam) => exam.id == obj.id
                                            ).length
                                        }{" "}
                                        examen(s)
                                    </td>
                                </tr>
                            ))}
                    </table>
                </div>

                {/* Navigateur examens */}
                {selectedClass && (
                    <div className="h-full w-[600px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                        <div className="flex w-full items-center justify-between p-4">
                            <p className="font-jakarta text-2xl font-bold text-zinc-200">
                                {selectedClass.name}
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <button
                                    onClick={() => {
                                        setIsCreatingExam(true);
                                        setSelectedExam(undefined);
                                    }}
                                    className="flex h-10 items-center justify-between gap-1 rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900"
                                >
                                    Ajouter un examen
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
                                <Modal
                                    show={isCreatingExam}
                                    onClose={() => setIsCreatingExam(false)}
                                >
                                    {isCreatingExam && (
                                        <div className="w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                                            <div className="flex w-full items-center justify-between border-b border-b-zinc-700 p-4 pb-6">
                                                <p className="font-jakarta text-2xl font-bold text-zinc-200">
                                                    Nouvel examen
                                                </p>
                                                <div className="flex items-center justify-between gap-4">
                                                    <button
                                                        onClick={() =>
                                                            setIsCreatingExam(
                                                                false
                                                            )
                                                        }
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
                                                    value={examName ?? ""}
                                                    onChange={(
                                                        e: React.FormEvent<HTMLInputElement>
                                                    ) => {
                                                        setExamName(
                                                            e.currentTarget
                                                                .value
                                                        );
                                                    }}
                                                    placeholder="Entrer le nom de l'examen"
                                                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                                />

                                                <button
                                                    disabled={!examName}
                                                    onClick={() => {
                                                        if (examName) {
                                                            createExam({
                                                                name: examName,
                                                                classId:
                                                                    selectedClass.id,
                                                            });
                                                            setIsCreatingExam(
                                                                false
                                                            );
                                                            getExams();
                                                        }
                                                    }}
                                                    className="flex h-10 items-center justify-between gap-1 self-end rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900 disabled:bg-zinc-900 disabled:text-zinc-700"
                                                >
                                                    Créer
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
                                <div className="flex h-10 w-fit items-center justify-between gap-1 rounded-full bg-zinc-900 p-2 px-4 font-jakarta text-xs font-extrabold">
                                    <input
                                        type="text"
                                        placeholder="Rechercher un examen"
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
                                    Nom de l'examen
                                    <Icon
                                        icon="ion:caret-down"
                                        fontSize={16}
                                        className="ml-1 inline"
                                    />
                                </th>
                                <th className="p-4 py-3 text-start text-xs font-bold opacity-50">
                                    ID de l'examen
                                    <Icon
                                        icon="ion:caret-down"
                                        fontSize={12}
                                        className="ml-1 inline"
                                    />
                                </th>
                                <th className="p-4 text-start text-xs font-bold opacity-50"></th>
                                <th className="p-4 text-start text-xs font-bold opacity-50"></th>
                            </tr>
                            {selectedClass ? (
                                exams
                                    .filter(
                                        (exam) =>
                                            exam.classId == selectedClass.id
                                    )
                                    .map((e) => {
                                        return (
                                            <tr
                                                className={
                                                    "h-12 border-b border-t border-b-zinc-700 border-t-zinc-700 bg-zinc-800 px-4 transition-all hover:bg-zinc-850 " +
                                                    `${
                                                        selectedExam?.id ==
                                                            e.id &&
                                                        "border-l-4 border-l-brand-yellow"
                                                    }`
                                                }
                                            >
                                                <td className="px-4 py-2 text-sm font-bold">
                                                    <Icon
                                                        icon="fluent-emoji:student-medium"
                                                        fontSize={16}
                                                        className="mr-2 inline"
                                                    />
                                                    {e.name}
                                                </td>
                                                <td className="px-4 py-2 text-sm font-bold">
                                                    {e.id.substring(0, 4)}...
                                                </td>
                                                <td className="px-4 py-2 text-sm font-bold">
                                                    <button
                                                        onClick={() => {
                                                            selectedExam?.id !==
                                                            e.id
                                                                ? setSelectedExam(
                                                                      e
                                                                  )
                                                                : setSelectedExam(
                                                                      undefined
                                                                  );
                                                            setIsEditingExam(
                                                                true
                                                            );
                                                        }}
                                                        className="flex h-8 items-center justify-center gap-1 rounded-full bg-zinc-900 p-1 px-3 font-jakarta text-[10px] font-extrabold text-brand-yellow transition-all hover:cursor-pointer hover:bg-brand-yellow hover:text-zinc-800 hover:brightness-90"
                                                    >
                                                        Modifier
                                                        <Icon
                                                            icon="ion:options"
                                                            fontSize={12}
                                                            className=""
                                                        />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-2 text-sm font-bold">
                                                    {/* <button
                                                    onClick={() => {
                                                        generateCodes(e.id);
                                                    }}
                                                    className="flex h-8 items-center justify-center gap-1 rounded-full bg-brand-yellow p-1 px-3 font-jakarta text-[10px] font-extrabold text-zinc-900 transition-all hover:cursor-pointer hover:bg-zinc-900 hover:text-brand-yellow hover:brightness-90"
                                                >
                                                    Générer
                                                </button> */}
                                                    <PDFDownloadLink
                                                        className="flex h-8 items-center justify-center gap-1 rounded-full bg-brand-yellow p-1 px-3 font-jakarta text-[10px] font-extrabold text-zinc-900 transition-all hover:cursor-pointer hover:bg-zinc-900 hover:text-brand-yellow hover:brightness-90"
                                                        document={generateCodes(
                                                            e
                                                        )}
                                                        fileName={`${selectedClass.name}-${e.name}.pdf`}
                                                    >
                                                        {({ loading }) =>
                                                            loading ? (
                                                                <>
                                                                    Loading
                                                                    <Icon
                                                                        icon="ph:lightning-fill"
                                                                        fontSize={
                                                                            12
                                                                        }
                                                                        className=""
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Génerer
                                                                    codes QR
                                                                    <Icon
                                                                        icon="ph:lightning-fill"
                                                                        fontSize={
                                                                            12
                                                                        }
                                                                        className=""
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                    </PDFDownloadLink>
                                                </td>
                                                <Modal
                                                    show={
                                                        isEditingExam &&
                                                        selectedExam !==
                                                            undefined
                                                    }
                                                    onClose={() => {
                                                        setIsEditingExam(false);
                                                        setSelectedExam(
                                                            undefined
                                                        );
                                                    }}
                                                >
                                                    {isEditingExam &&
                                                        selectedExam && (
                                                            <div className="w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                                                                <div className="flex w-full items-center justify-between border-b border-b-zinc-700 p-4 pb-6">
                                                                    <p className="font-jakarta text-2xl font-bold text-zinc-200">
                                                                        Modifier
                                                                        examen
                                                                    </p>
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <button
                                                                            onClick={() =>
                                                                                setIsEditingExam(
                                                                                    false
                                                                                )
                                                                            }
                                                                            className="flex h-10 items-center justify-between gap-1 rounded-full bg-red-900 p-2 px-4 font-jakarta text-xs font-extrabold text-red-100"
                                                                        >
                                                                            Annuler
                                                                            <Icon
                                                                                icon="iconamoon:trash-fill"
                                                                                fontSize={
                                                                                    16
                                                                                }
                                                                                className="ml-1 inline"
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="flex w-full flex-col items-start justify-start gap-6 p-4">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            selectedExam.name
                                                                        }
                                                                        onChange={(
                                                                            e: React.FormEvent<HTMLInputElement>
                                                                        ) => {
                                                                            setSelectedExam(
                                                                                // @ts-expect-error : Typescript is very cool
                                                                                (
                                                                                    prev
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    name: e
                                                                                        .currentTarget
                                                                                        .value,
                                                                                })
                                                                            );
                                                                        }}
                                                                        placeholder="Entrer le nom de l'examen"
                                                                        className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                                                                    />

                                                                    <button
                                                                        disabled={
                                                                            !selectedExam?.name
                                                                        }
                                                                        onClick={() => {
                                                                            if (
                                                                                selectedExam?.name
                                                                            ) {
                                                                                setIsEditingExam(
                                                                                    false
                                                                                );
                                                                                updateExam(
                                                                                    selectedExam.id,
                                                                                    {
                                                                                        name: selectedExam.name,
                                                                                    }
                                                                                );
                                                                                getExams();
                                                                            }
                                                                        }}
                                                                        className="flex h-10 items-center justify-between gap-1 self-end rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900 disabled:bg-zinc-900 disabled:text-zinc-700"
                                                                    >
                                                                        Enregistrer
                                                                        <Icon
                                                                            icon="ic:round-save"
                                                                            fontSize={
                                                                                16
                                                                            }
                                                                            className="ml-1 inline"
                                                                        />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                </Modal>
                                            </tr>
                                        );
                                    })
                            ) : (
                                <tr
                                    className={
                                        "h-12 border-b border-t border-b-zinc-700 border-t-zinc-700 bg-zinc-800 px-4 transition-all hover:bg-zinc-850 " +
                                        `${
                                            selectedExam?.id == e.id &&
                                            "border-l-4 border-l-brand-yellow"
                                        }`
                                    }
                                >
                                    <td className="px-4 py-2 text-sm font-bold"></td>
                                </tr>
                            )}
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
