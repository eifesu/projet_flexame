interface User {
    id: string;
    lastName: string;
    firstName: string;
    username: string;
    password: string;
    type: "correcteur" | "admin" | "surveillant";
}

interface Classe {
    id: string;
    name: string;
    major: string;
}

interface Exam {
    id: string;
    name: string;
    classId: string;
}

interface Student {
    id: string;
    classId: string;
    firstName: string;
    lastName: string;
    matricule: string;
}

interface Grade {
    id: string;
    classId: string;
    examId: string;
    grade: number;
}
