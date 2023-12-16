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

interface Student {
    id: string;
    classId: string;
    firstName: string;
    lastName: string;
    matricule: number;
}
