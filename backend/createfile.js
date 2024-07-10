const fs = require('fs');
const path = require('path');

const data = {
    academics: {
        sem1: { id: ["7MA101", "7PH103", "7AM102", "7CM106", "7CS101", "7PH155", "7HS101", "7AM155", "7CM156", "7CS151", "7VS151"] },
        sem2: { id: ["7MA104", "7EE106", "7CS102", "7CS108", "7CH103", "7CH155", "7CS152", "7EE156", "7ME108", "7VS152"] },
        sem3: { id: ["6MA202", "6CS201", "6CS202", "6CS203", "6CS204", "6CS205", "6CS251", "6CS252", "6CS253"] },
        sem4: { id: ["6CS222", "6CS223", "6CS224", "6CS274", "6CS275", "6CS271", "6CS277"] },
        sem5: { id: ["6CS301", "6CS302", "6CS303", "6CS351", "6CS352", "6CS341", "6CS353", "6HS301"] },
        sem6: { id: ["6CS321", "6CS322", "6CS323", "6CS371", "6CS372", "6CS342", "6CS332", "6CS381", "6OE364", "6HS306", "6HS302"] },
        sem7: { id: ["5CS401", "5CS403", "5CS454", "5CS491", "5CS455", "5CS411", "5CS412", "5CS413", "5CS414", "5CS415", "5OE471", "5CS452", "5CS451", "5CS453"] },
        sem8: { id: ["5CS439", "5CS438", "5CS437", "5CS436", "5CS435", "5CS434", "5CS433", "5CS432", "5CS421", "5CS431"] }
    },
    skills: {
        webDev: { id: ["html", "css", "javascript", "react js", "node js", "mongo-db", "sql", "Express", "Angular", "Bootstrap", "Tailwind"] },
        appDev: { id: ["Java", "Kotlin", "Swift", "Flutter", "ReactNative"] },
        cp: { id: ["Bit-Manipulation", "DynamicProgramming", "PrefixSuffix", "recursion", "SlidingWindow", "twoPointers"] },
        dsa: { id: ["Arrays", "Graph", "Linked-Lists", "Stack", "Strings", "Bitwise", "Dynamic-Programming", "Greedy-Algorithms", "Recursion", "Sorting"] }
    }
};

const concatenatedIds = [
    ...data.academics.sem1.id,
    ...data.academics.sem2.id,
    ...data.academics.sem3.id,
    ...data.academics.sem4.id,
    ...data.academics.sem5.id,
    ...data.academics.sem6.id,
    ...data.academics.sem7.id,
    ...data.academics.sem8.id,
    ...data.skills.webDev.id,
    ...data.skills.appDev.id,
    ...data.skills.cp.id,
    ...data.skills.dsa.id
];

// Define the base directory where you want to create these directories
const baseDir = path.join("E:/PROGRAMING/webD/openSourceWceCse/frontend/public/data", 'directories');

// Create the base directory if it doesn't exist
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

// Create directories for each ID
concatenatedIds.forEach(id => {
    const dirPath = path.join(baseDir, id);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Directory created: ${dirPath}`);
    } else {
        console.log(`Directory already exists: ${dirPath}`);
    }
});
