import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../components/ui/Button";
import { QrReader } from "react-qr-reader";
// import Modal from "../../../components/ui/Modal";
import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "../../../lib/firebase";
import {
    Document,
    PDFDownloadLink,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 16,
        padding: 16,
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
});

const GradeForm = ({
    gradeId,
    setData,
}: {
    gradeId: string;
    setData: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    const [grade, setGrade] = useState<number>();
    const g = collection(db, "grades");

    async function submitGrade() {
        const exam = gradeId.split("-")[0];
        const student = gradeId.split("-")[1];
        console.log(gradeId);
        if (exam && student) {
            await setDoc(doc(g), {
                id: gradeId,
                examId: exam,
                studentId: student,
                grade: grade,
            });

            setData(undefined);
        }
    }

    return (
        <div className="w-[500px] flex-col items-start justify-start rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
            <div className="flex w-full items-center justify-between border-b border-b-zinc-700 p-4 pb-6">
                {/* Form Title */}
                <p className="font-jakarta text-2xl font-bold text-zinc-200">
                    Ajouter une note
                </p>
                {/* Form Delete / Cancel */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() => setData(undefined)}
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
                    type="number"
                    value={grade}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setGrade(parseInt(e.currentTarget.value));
                    }}
                    placeholder="Note de l'étudiant"
                    className="w-full border-b border-b-zinc-600 bg-transparent pb-1 font-inter text-sm font-bold text-zinc-200 outline-none placeholder:text-zinc-300"
                />

                <button
                    disabled={!grade}
                    onClick={() => {
                        submitGrade();
                    }}
                    className="flex h-10 items-center justify-between gap-1 self-end rounded-full bg-brand-yellow p-2 px-4 font-jakarta text-xs font-extrabold text-zinc-900 disabled:bg-zinc-900 disabled:text-zinc-700"
                >
                    Ajouter
                    <Icon
                        icon="ic:round-save"
                        fontSize={16}
                        className="ml-1 inline"
                    />
                </button>
            </div>
        </div>
    );
};

export default function GradesPage() {
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [isPrinting, setIsPrinting] = useState<boolean>(false);
    const [data, setData] = useState<string>();
    const [document, setDocument] = useState<JSX.Element>();

    const c = collection(db, "classes");
    const s = collection(db, "students");
    const e = collection(db, "exams");
    const g = collection(db, "grades");

    async function generateReport(gradeId: string) {
        const examId = gradeId.split("-")[0];

        const studentSnapshot = await getDocs(s);
        const studentsData = studentSnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Student),
        }));
        const classSnapshot = await getDocs(c);
        const classesData = classSnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Classe),
        }));
        const examSnapshot = await getDocs(e);
        const examsData = examSnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Exam),
        }));
        const gradeSnapshot = await getDocs(g);
        const gradesData = gradeSnapshot.docs.map((doc) => ({
            // @ts-expect-error API type requirements
            id: doc.id,
            ...(doc.data() as Grade),
        }));

        const grades = gradesData.filter((grades) => grades.examId == examId);
        const exam = examsData.find((exam) => exam.id == examId);
        const classe = classesData.find((classe) => classe.id == exam?.classId);
        const students = studentsData.filter(
            (student) => student.classId == classe?.id
        );

        if (grades && exam && classe && students) {
            return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View>
                            <View
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text>{classe.name}</Text>
                                <Text>{exam.name}</Text>
                            </View>
                            {students.map((taker, index) => {
                                return (
                                    <View style={styles.section}>
                                        <Text>{index}</Text>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 4,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {taker.lastName}
                                            </Text>
                                            <Text style={{ fontSize: 10 }}>
                                                {taker.firstName}
                                            </Text>
                                        </View>

                                        <Text>
                                            {
                                                grades.find(
                                                    (grade) =>
                                                        grade.id.split(
                                                            "-"
                                                        )[1] == taker.id
                                                )?.grade
                                            }
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </Page>
                </Document>
            );
        }
    }

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
                            href="/grades"
                            className="flex items-center justify-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 p-2 px-4 font-inter text-sm font-bold text-zinc-200 transition-all hover:scale-105 hover:cursor-pointer"
                        >
                            CORRECTION
                        </a>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4">
                        <div className="flex items-center justify-center rounded-full bg-purple-500 p-2 px-4 font-jakarta text-[10px] font-extrabold text-zinc-900">
                            Correcteur
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex w-full flex-1 select-none items-center justify-center gap-4 p-4">
                <div className="h-[300px] w-[300px] flex flex-col gap-4 p-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 font-jakarta text-zinc-200">
                    <p className="font-jakarta text-2xl font-bold text-zinc-200">
                        Gestion des notes
                    </p>

                    {data && data.length > 0 && (
                        <Modal show={!!data} onClose={() => setData(undefined)}>
                            <GradeForm gradeId={data} setData={setData} />
                        </Modal>
                    )}

                    {isScanning ? (
                        <Modal
                            show={isScanning}
                            onClose={() => setIsScanning(false)}
                        >
                            <QrReader
                                constraints={{ facingMode: "user" }}
                                onResult={(result, error) => {
                                    if (result) {
                                        setData(result.getText());
                                        setIsScanning(false);
                                    }

                                    if (error) {
                                        console.info(error);
                                    }
                                }}
                                className="w-64 h-64"
                            />
                        </Modal>
                    ) : (
                        <Button
                            onClick={() => {
                                setIsScanning(true);
                            }}
                        >
                            Scanner un code QR
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
                    )}

                    {isPrinting && (
                        <Modal
                            show={isPrinting}
                            onClose={() => setIsPrinting(false)}
                        >
                            <QrReader
                                constraints={{ facingMode: "user" }}
                                onResult={async (result, error) => {
                                    if (result) {
                                        const doc = await generateReport(
                                            result.getText()
                                        );
                                        if (doc) {
                                            setDocument(doc);
                                            setIsPrinting(false);
                                        }
                                    }

                                    if (error) {
                                        console.info(error);
                                    }
                                }}
                                className="w-64 h-64"
                            />
                        </Modal>
                    )}

                    {document ? (
                        <PDFDownloadLink
                            className="flex h-8 items-center justify-center gap-1 rounded-full bg-brand-yellow p-1 px-3 font-jakarta text-[10px] font-extrabold text-zinc-900 transition-all hover:cursor-pointer hover:bg-zinc-900 hover:text-brand-yellow hover:brightness-90"
                            document={document}
                            fileName={`NOTES.pdf`}
                        >
                            {({ loading }) =>
                                loading ? (
                                    <>
                                        Loading
                                        <Icon
                                            icon="ph:lightning-fill"
                                            fontSize={12}
                                            className=""
                                        />
                                    </>
                                ) : (
                                    <>
                                        Imprimer la liste de notes
                                        <Icon
                                            icon="ph:lightning-fill"
                                            fontSize={12}
                                            className=""
                                        />
                                    </>
                                )
                            }
                        </PDFDownloadLink>
                    ) : (
                        <Button
                            onClick={() => {
                                setIsPrinting(true);
                            }}
                        >
                            Génerer liste de notes
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M336 336h80v80h-80zm-64-64h64v64h-64zm144 144h64v64h-64zm16-144h48v48h-48zM272 432h48v48h-48zm64-336h80v80h-80z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M480 240H272V32h208Zm-164-44h120V76H316ZM96 96h80v80H96z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M240 240H32V32h208ZM76 196h120V76H76Zm20 140h80v80H96z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M240 480H32V272h208ZM76 436h120V316H76Z"
                                />
                            </svg>
                        </Button>
                    )}
                </div>

                {/* 
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
                </Modal> */}
            </main>
        </div>
    );
}
