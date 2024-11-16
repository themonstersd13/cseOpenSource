const data={
    academics:{
        sem1:{
            images:["maths1.png","physics.jpg","mechanics.jpeg","cme.jpeg","cne.jpg","physicslab.jpg","cg.png","mechanicslab.jpeg","cnelab.jpeg","cmelab.jpeg","shit.jpeg"],
            id:["7MA101","7PH103","7AM102","7CM106","7CS101","7PH155","7HS101","7AM155","7CM156","7CS151","7VS151"],
            Name:["Engineering Mathematics - I","Engineering Physics","Engineering Mechanics","Civil & Mechanical Engineering","Computer and Networking Essentials","Engineering Physics Lab","Communication & Generic Skills","Engineering Mechanics lab","Civil & mechanical Engineering Lab","Computer and Networking Essential Lab","Engineering Skills - I"]
        },
        sem2:{
            images:["maths2.png","elx.jfif","bwt.jfif","cp.jfif","chem.jfif","chem lab.jfif","bwt lab.png","elx lab.jfif","graphics.jfif","es 2.jfif"],
            id:["7MA104","7EE106","7CS102","7CS108","7CH103","7CH155","7CS152","7EE156","7ME108","7VS152"],
            Name:["Engineering Mathematics- II","Electrical & Electronics Engineering", "Basics of Web Technology","Computer Programming (C Programming)","Engineering Chemistry" ,"Engineering Chemistry Lab","Basics of Web Technology Lab","Electrical and Electronics Engineering Lab","Engineering Graphics Lab","Engineering Skills-II"]
        },
        sem3:{
            images:["p&s.jpg","dm.jpeg","ds.png","dc.png","coa.jpeg","se.png","prog.jpg","ds_lab.jpg","Coa-lab.jpg"],
            id:["6MA202","6CS201","6CS202","6CS203","6CS204","6CS205","6CS251","6CS252","6CS253"],
            Name:["Probability and Statistics","Discrete Mathematics","Data Structures","Data Communication","Computer Organization and Architecture","Software Engineering","Programming Lab 1","Data Structures Lab","Computer Organization and Architecture Lab"]
        },
        sem4:{
            images:["OS.jpg","DB.jpeg","CN.jpg","DBlab.jpeg","CNlab.jpg","PLlab.webp","PNR.jpeg"],
            id:["6CS222","6CS223","6CS224","6CS274","6CS275 ","6CS271 ","6CS277"],
            Name:["Operating Systems","Database Engineering","Computer Network","Database Engineering Lab ","Computer Network Lab ","Programming Lab 2 ","Presentation and Report Writing "]
        },
        sem5:{
            images:["compilerD.avif","AlgorithmD.png","AI.jpg","AlgorithmDlab.jpg","ProgrammingLab3.jpeg","miniProject.jpeg","humanities.jpg","ES.webp"],
            id:["6CS301","6CS302","6CS303","6CS351","6CS352","6CS341","6CS353","6HS301"],
            Name:["Compiler Design ","Design and Analysis of Algorithms ","Artificial Intelligence","Design and Analysis of Algorithms Laboratory ","Programming Laboratory III ","Mini-Project  I ","Humanities I-Project Management and Ethics ","Integrated/Employability skills I"]
        },
        sem6:{
            images:["cc.jpg","ads.jpeg","ml.jpg","ads_lab.png","ml_lab.jpg","mp_2.png","sc.png","ios _lab.jpeg","cps.jpeg","entrship.jpg","es.jpg"],
            id:["6CS321","6CS322","6CS323","6CS371","6CS372","6CS342","6CS332","6CS381","6OE364","6HS306","6HS302"],
            Name:["Cloud Computing","Advanced Database System","Machine Learning","Advanced Database System Lab","Machine Learning Lab","Mini-Project-II","Soft Computing","iOS_Lab","Cyber Physical Systems","Humanities-1 Introduction to Entrepreneurship","	Integrated/ Employability Skills-2"]
        },
        sem7:{
            images:["cns.jfif","ipr.jfif","tsa.jfif","project 1.png","hpm 3.jfif","hpc.png","data mining.jfif","sdn.jfif","comp v.jfif","ai ml.jfif","cyber sec.jfif","data mining lab.jfif","hpc lab.jfif","cns lab.png"],
            id:["5CS401","5CS403","5CS454","5CS491","5CS455","5CS411","5CS412","5CS413","5CS414","5CS415","5OE471","5CS452" ,"5CS451","5CS453"],
            Name:["Cryptography and Network Security","Humanities 4-Legal, IPR, Safety","Techno-Socio Activity","Project-1 ","Humanities 3-Project Management","Elective-5: High Performance Computing","Elective-5 : Data Mining","Elective 6: Software Defined Network","Elective- 6: Computer Vision","Elective-6: MOOC on AI ML: Reinforcement Learning","Open Elective 5: Cyber Security","Elective 5 lab- Data Mining Lab","Elective 5 Lab-High Performance Computing Lab","Cryptography and Network Security Lab"]                
        },
        sem8:{
            images:["bda.jpeg","aml.jpeg","pp.png","bc.png","vr.jpeg","cm.jpeg","hci.jpeg","cf.jpeg","one.png","seo.png"],
            id:["5CS439","5CS438","5CS437","5CS436","5CS435","5CS434","5CS433","5CS432","5CS421","5CS431"],
            Name:["Big Data Computing","Advanced Machine Learning","MOOC Course on Computing: Introduction to parallelprogramming with OpenMP and MPI","MOOC Course on Blockchain and Its applications","MOOC Course on Virtual Reality","MOOC Course on Social Networks","Human Computer Interaction","Computer Forensic","Data Management, Protection and Governance","Search Engine Design and Optimization"]
        }
    },
    skills:{
        webDev:{
            images:["html.png","css.png","js.png","react.png","node.png","mdb.png","sql.png","ex.png","angular.png","boot.png","tailwind.png"],
            id:["html","css","javascript","react js","node js","mongo-db","sql","Express","Angular","Bootstrap","Tailwind"],
            Name:["html","css","javascript","react js","node js","mongo-db","sql","Express","Angular","Bootstrap","Tailwind"]    
        },
        appDev:{
             images:["java.jfif","kotlin.png","swift.jfif","flutter.jfif","react native.png"],
             id:["Java","Kotlin","Swift","Flutter","ReactNative"],
             Name:["Java","Kotlin","Swift","Flutter","React native"]
        },
        cp:{
            images:["Bit-Manipulation.png","DP.jpg","prefixSuffix.jpg","recursion.png","slidingWindow.gif","twoPointers.webp"],
            id:["Bit-Manipulation","DynamicProgramming","PrefixSuffix","recursion","SlidingWindow","twoPointers"],
            Name:["Bit-Manipulation","Dynamic Programming","Prefix Suffix","recursion","Sliding window","two pointers"]    
        },
        dsa:{
            images:["arr.jpeg","graph.jpeg","ll.jpeg","stack.jpeg","strings.jpeg","bit.jpeg","dp.jpeg","gre_al.jpeg","rec.png","sort.jpeg"],
            id:["Arrays","Graph","Linked-Lists","Stack","Strings","Bitwise","Dynamic-Programming","Greedy-Algorithms","Recursion","Sorting"],
            Name:["Arrays","Graph","Linked-Lists","Stack","Strings","Bitwise","Dynamic-Programming","Greedy-Algorithms","Recursion","Sorting"]    
        }
    }
}
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
export default data;
export {concatenatedIds};