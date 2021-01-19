drop database if exists `websiteDB`;
create database `websiteDB`;
use `websiteDB`;

DROP TABLE IF EXISTS `HeaderCategory`;
create table `HeaderCategory`(
	Id int unsigned auto_increment primary key,
    HeaderNameCategory varchar(100) NOT NULL,
    isDeleted boolean not null default false
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `User_profile`;
create table `User_profile`(
IdUser int unsigned auto_increment primary key,
FullName varchar(100),
Email text,
isTeacher int unsigned default 1,/*Valid 1= not teacher, 2;teacher*/
Permission varchar(100) default "student",
UserName varchar(50) not null,
`password` varchar(225) not null,
createdTime datetime not null default now(),
updatedTime datetime not null default now(),
isBlocked boolean not null default false
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Category`;
create table `Category`(
	Id int unsigned auto_increment primary key,
    HeaderCategoryID int unsigned not null,
    NameCategory varchar(50) not null,
    isDeleted boolean not null default false,
    CONSTRAINT FK_FromCategory FOREIGN KEY (HeaderCategoryID)
    REFERENCES HeaderCategory(Id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `course`;
create table `course`(
	IdCourse int unsigned auto_increment primary key,
    nameCourse varchar(100) not null,
    title varchar(100) not null,
    Description text not null,
    Price float unsigned not null,
    SaleCost float unsigned default '0.00',
    nOViews int unsigned default '0',
    avgRate float(2) default '2.49',
	subscribe int unsigned default '0',
    status varchar(50) default "unfinished",/*has change to finished*/
    IdCategory int unsigned not null,
    IdTeacher int unsigned not null,
    createdTime datetime not null default now(),
    updatedTime datetime not null default now(),
    isDeleted boolean not null default false,
    CONSTRAINT FK_Category FOREIGN KEY (IdCategory)
    REFERENCES Category(Id),
    CONSTRAINT FK_Teacher FOREIGN KEY (IdTeacher)
    REFERENCES User_profile(IdUser)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Teach_profile`;
create table `Teach_profile`(
    IdUser int unsigned not null primary key,
    Biography text not null,
    status varchar(20) default "Processing",/*has change to "Accept"*/
    CONSTRAINT FK_UserisTeacher FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `WishList`;
create table `WishList`(
	Id int unsigned auto_increment primary key,
    IdUser int unsigned not null,
    IdCourse int unsigned not null,
    CONSTRAINT FK_WishListUser FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser),
    CONSTRAINT FK_WishListCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `EnrolledCourse`;
create table `EnrolledCourse`(
	Id int unsigned auto_increment primary key,
    IdUser int unsigned not null,
    IdCourse int unsigned not null,
    EnrollDate datetime not null default now(),
    rateStar int unsigned,
    Comments text,
    commentDate datetime not null default now(),
    status varchar(50) default "unfinished",/*has change to finished*/
    CONSTRAINT FK_UserEnroll FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser),
    CONSTRAINT FK_EnrolledCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Chapter`;
create table `Chapter`(
	IdChapter int unsigned auto_increment primary key,
    NameChapter varchar(50) not null,
    idCourse int unsigned not null,
    CONSTRAINT FK_ChapterCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Lesson`;
create table `Lesson`(
	idLesson int unsigned auto_increment primary key,
    NameLesson varchar(100) not null,
    Video text not null,
    idChapter int unsigned not null,
    CONSTRAINT FK_ChapterLesson FOREIGN KEY (IdChapter)
    REFERENCES Chapter(IdChapter)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `verification`;
create table `verification`(
    email varchar(100) not null,
    otp varchar(100) not null,
    CONSTRAINT FK_UserisTeacher FOREIGN KEY (email)
    REFERENCES User_profile(IdUser)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE course
ADD FULLTEXT(nameCourse);
ALTER TABLE category
ADD FULLTEXT(nameCategory);
/*---------Data Demo*/
insert into HeaderCategory(HeaderNameCategory) values('Development');
insert into HeaderCategory(HeaderNameCategory) values('Business');
insert into HeaderCategory(HeaderNameCategory) values('Finance & Accounting');
insert into HeaderCategory(HeaderNameCategory) values('IT & Software');
insert into HeaderCategory(HeaderNameCategory) values('Music');

insert into Category(NameCategory,HeaderCategoryID) values('Web Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Mobile Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Game Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Programming Languages',1);
insert into Category(NameCategory,HeaderCategoryID) values('Management',2);
insert into Category(NameCategory,HeaderCategoryID) values('Sales',2);
insert into Category(NameCategory,HeaderCategoryID) values('Accounting & Bookkeeping',3);
insert into Category(NameCategory,HeaderCategoryID) values('Finance',3);
insert into Category(NameCategory,HeaderCategoryID) values('Investing & Trading',3);
insert into Category(NameCategory,HeaderCategoryID) values('IT Certification',4);
insert into Category(NameCategory,HeaderCategoryID) values('Network & Security',4);
insert into Category(NameCategory,HeaderCategoryID) values('Handware',4);
insert into Category(NameCategory,HeaderCategoryID) values('Music Production',5);
insert into Category(NameCategory,HeaderCategoryID) values('Vocal',5);
insert into Category(NameCategory,HeaderCategoryID) values('Music Techniques',5);

/*user-password: admin-admin; andie-123456; john-123456; van-123456; aswift-123456; alegend-123456*/
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('admin','@admin.xyz',0,'admin','admin','$2a$10$W0tZwAWKAqbYE21SoELjmejFV1x5tThAE43q1YoxE7wO45UyFkAxO');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Andie Lee','teacher1@gmail.com',0,'teacher','andie','$2a$10$u4Npfd1W/VVZ4kyABP6RzuuLa0LWH61DVJKaDbMFwIekzV2/Qxg2G');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('John Lee','teacher2@gmail.com',1,'teacher','john','$2a$10$pMbkmm/htNKNlqEcfHDfS.ZSMe7KNIIdmVjYHeEsPkmLB/choKjhW');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Van Lee','teacher3@gmail.com',1,'teacher','van','$2a$10$34RS3ZpIgYrc.rhDSxclVuiBcFtYch1s57AUPALGFXxF3bQ01yIM2');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Andie Swift','teacher4@gmail.com',0,'teacher','aswift','$2a$10$qoIwjMiJxmYfcX/Nu238KedMxpV54xPvPBRVwLVZZiEtxKb1xg/Zu');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Andie legend','teacher5@gmail.com',0,'teacher','alegend','$2a$10$6.H6Kp.DtEtghkFH9UkOP.p8Y27HxnvC/hG5SmxvGvv3Ix.NHZgx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Maria','student1@gmail.com',0,'student','maria','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('San','San@gmail.com',0,'student','san','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Juky','Juky@gmail.com',0,'student','juky','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('San Maria','sanmaria@gmail.com',0,'student','sanmaria','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('John Juky','johnjuky@gmail.com',0,'student','johnjuky','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Amee Sam','ameesam@gmail.com',0,'student','ameesam','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Kim Soo Hyun','KimSooHyun@gmail.com',0,'student','soohuyn','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('john legend','johnlegend@gmail.com',1,'teacher','johnlegend','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('david taylor','davidtaylor@gmail.com',0,'student','davidtaylor','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Ji yeon','jiyeon@gmail.com',1,'teacher','jiyeon','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('juky san','jukysan@gmail.com',0,'student','jukysan','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Vo Minh Hien','hien@gmail.com',0,'student','minhhien','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');


insert into teach_profile(IdUser,Biography,status) values(2,'Teaching Web development','Accept');
insert into teach_profile(IdUser,Biography,status) values(3,'Teaching App development','Accept');
insert into teach_profile(IdUser,Biography,status) values(4,'Teaching something maybe you interested in it','Accept');
insert into teach_profile(IdUser,Biography,status) values(5,'Teaching Vocal cousre','Accept');
insert into teach_profile(IdUser,Biography,status) values(6,'Teaching Business course','Accept');
insert into teach_profile(IdUser,Biography) values(14,'Iam a teacher for 5 years');
insert into teach_profile(IdUser,Biography) values(16,'Im a idol. I can teach about dacing.');

insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, etc','<p><strong>Jewelry Information</strong></p> <ul>     <li>The only course you need to learn web development - HTML, CSS, JS, Node, and More!</li> </ul>',99.99,69.97,430688,"finished",1,2,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Angular - The Complete Guide (2021 Edition)','Master Angular 10 (formerly "Angular 2")','<p><strong>Andie Information</strong></p> <ul>     <li>Master Angular 10 (formerly "Angular 2") and build awesome, reactive web apps with the successor of Angular.js</li> </ul>',99.99,19.97,430688,"unfinished",1,3,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, Nodejs','<p><strong>The Information</strong></p> <ul>     <li>This course teaching about web development - HTML, CSS, JS, Node, and More!</li> </ul>',99.99,69.97,430688,"finished",1,4,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete JavaScript Course 2021','The modern JavaScript course for everyone','<p><strong>Cousre Information</strong></p> <ul>     <li>The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!</li> </ul>',299.99,169.97,386157,"unfinished",1,5,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, etc','<p><strong>Jewelry Information</strong></p> <ul>     <li>The only course you need to learn web development - HTML, CSS, JS, Node, and More!</li> </ul>',399.99,369.97,430688,"unfinished",1,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('iOS & Swift - The Complete iOS App Development Bootcamp','Learning about iOS','<p><strong>Information</strong></p> <ul>     <li><p><strong>Information</strong></p> <ul>     <li>From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul></li> </ul>',99.99,69.97,430688,"unfinished",2,2,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete Android N Developer Course','Learn Android App Development','<p><strong>Information</strong></p> <ul>     <li>Learn Android App Development with Android 7 Nougat by building real apps including Uber, Whatsapp and Instagram</li> </ul>',499.99,169.97,430688,"finished",2,3,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete React Native + Hooks Course','Understand React Native v0.62.2 with Hooks, Context, and React Navigation','<p><strong>Information</strong></p> <ul>     <li><p><strong>Information</strong></p> <ul>     <li>If you are tired of spinning your wheels learning Swift or Android, this is the course for you.Authentication? You will learn it.  Hooks? Included.  Navigation? Of course!This course will get you up and running with React Native quickly, and teach you the core knowledge you need to deeply understand and build React components for mobile devices.</li> </ul></li> </ul>',129.99,99.97,430688,"unfinished",2,4,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('iOS 11 & Swift 4 - The Complete iOS App Development Bootcamp','Learn iOS 11 App Development From Beginning to End.','<p><strong>Information</strong></p> <ul>     <li>Learn iOS 11 App Development From Beginning to End. Using Xcode 9 and Swift 4. Includes Full ARKit and CoreML Modules!</li> </ul>',169.99,100,148083,"unfinished",2,5,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Flutter & Dart - The Complete Guide','Guide to the Flutter SDK & Flutter Framework','<p><strong>Information</strong></p> <ul>     <li>A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps</li> </ul>',11.99,6.96,138872,"unfinished",2,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Complete C# Unity Game Developer 2D','Learning about Android','<p><strong>Information</strong></p> <ul>     <li>Learn C#, a powerful modern language, from scratch. No prior programming experience is necessary</li> </ul>',199,129.99,116732,"unfinished",3,2,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Unreal Engine C++ Developer: Learn C++ and Make Video Games','Created in collaboration with Epic Games.','<p><strong>Information</strong></p> <ul>     <li>Created in collaboration with Epic Games. Learn C++ from basics while making your first 4 video games in Unreal</li> </ul>',60.99,30.34,112677,"unfinished",3,3,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Complete C# Unity Game Developer 3D','Design & Develop Video Games.','<p><strong>Information</strong></p> <ul>     <li>Design & Develop Video Games. Learn C# in Unity Engine. Code Your first 3D Unity games for web, Mac & PC.</li> </ul>',150,129.99,375524,"unfinished",3,4,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('RPG Core Combat Creator: Learn Intermediate Unity C# Coding','Build Combat for Role Playing Game (RPG) in Unity.','<p><strong>Information</strong></p> <ul>     <li>Build Combat for Role Playing Game (RPG) in Unity. Tutorials Cover Code Architecture & Video Game Design.</li> </ul>',199,80,430688,"finished",3,5,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Ultimate Guide to Game Development with Unity 2019','learn C# by developing 2D & 3D games','<p><strong>Information</strong></p> <ul>     <li>Created in partnership with Unity Technologies: learn C# by developing 2D & 3D games with this comprehensive guide</li> </ul>',209,11,430688,"unfinished",3,6,5);

insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('2020 Complete Python Bootcamp From Zero to Hero in Python','Learn Python like a Professional','<p><strong>Information</strong></p> <ul>     <li>Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games</li> </ul>',150,129.99,1181699,"unfinished",4,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Java Programming Masterclass for Software Developers','Learn Java In This Course And Become a Computer Programmer.','<p><strong>Information</strong></p> <ul>     <li>Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills And Java Certification</li> </ul>',113,89,530164,"unfinished",4,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Python Mega Course: Build 10 Real World Applications','A complete practical Python course for both beginners & intermediates','<p><strong>Information</strong></p> <ul>     <li>A complete practical Python course for both beginners & intermediates! Master Python 3 by making 10 amazing Python apps.</li> </ul>',127.99,99.99,207440,"unfinished",4,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('React - The Complete Guide (incl Hooks, React Router, Redux)','Dive in and learn React.js from scratch','<p><strong>Information</strong></p> <ul>     <li>Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!</li> </ul>',19.99,12.99,250307,"unfinished",4,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Learn Python Programming Masterclass','This Python For Beginners Course Teaches You The Python Language Fast','<p><strong>Information</strong></p> <ul>     <li>This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3</li> </ul>',209,129.99,267876,"unfinished",4,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Become a Product Manager | Learn the Skills & Get the Job','The most complete course available on Product Management.','<p><strong>Information</strong></p> <ul>     <li>The most complete course available on Product Management. 13+ hours of videos, activities, interviews, & more</li> </ul>',129.99,99.99,122579,"unfinished",5,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete Management Skills Certification Course','Used at Amazon, Unilever, Walmart','<p><strong>Information</strong></p> <ul>     <li>Used at Amazon, Unilever, Walmart, and other top firms. Learn leadership, productivity, communication skills & more!</li> </ul>',199.99,99.99,30174,"unfinished",5,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete Product Management Course','Learn the skills, tools, and processes needed to become an irreplaceable PM.','<p><strong>Information</strong></p> <ul>     <li>Learn the skills, tools, and processes needed to become an irreplaceable PM. Examples from NASA, Google, Zappos, Apple</li> </ul>',19.99,9.99,17363,"unfinished",5,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Leadership: Practical Leadership Skills','Master leadership skills and leadership techniques with this highly practical advice and training','<p><strong>Information</strong></p> <ul>     <li>Chris Croft is an international speaker, and widely published author, who is been teaching Leadership Skills to companies for over 20 years. He is taught all over the world, as well as online, and has an entertaining and practical teaching style. This course is guaranteed to keep you engaged and amused, and teach you life changing skills for home and work</li> </ul>',99.99,69.99,79434,"unfinished",5,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Management Skills - Team Leadership Skills Masterclass 2020','Leadership & Business Skills','<p><strong>Information</strong></p> <ul>     <li>Leadership & Management Skills - Change Management- Lean BPM Management Skills - Team Management - Team Building</li> </ul>',129.69,60.99,29563,"unfinished",5,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Sales Training: Practical Sales Techniques','Sales Hacking!','<p><strong>Information</strong></p> <ul>     <li>Sales Hacking: Essential sales skills, sales strategies and sales techniques to sell just about anything!</li> </ul>',129.99,99.99,42541,"unfinished",6,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Business Development For Startups and Tech Companies','Unlock massive growth using the business development channel.','<p><strong>Information</strong></p> <ul>     <li>Unlock massive growth using the business development channel. Learn pitching, BD strategy, cold emailing, & deal closing</li> </ul>',159.99,129.99,32344,"unfinished",6,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Business Development & B2B Sales for Startups- Sales Valley','The Complete Startup Playbook','<p><strong>Information</strong></p> <ul>     <li>The Complete Startup Playbook for Business Development & B2B Sales to learn Lead Generation, Pitching, & Closing Deals.</li> </ul>',169.96,149.99,18905,"unfinished",6,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Learn to Sell Anything by Grant Cardone','Sell anything in your hands','<p><strong>Information</strong></p> <ul>     <li>Learn sales basics, techniques, and strategies that will give you the skills to sell anything.</li> </ul>',50,49.99,15750,"unfinished",6,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('LinkedIn Marketing, Lead Generation & B2B Sales for LinkedIn','LinkedIn Machine: The LinkedIn MasterClass','<p><strong>Information</strong></p> <ul>     <li>LinkedIn Machine: The LinkedIn MasterClass to learn LinkedIn Marketing, Lead Generation, Business Development, B2B Sales</li> </ul>',130,119.99,16184,"unfinished",6,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Bookkeeping Basics #1: Understand the Fundamentals','Learn bookkeeping terms','<p><strong>Information</strong></p> <ul>     <li>Learn bookkeeping terms and concepts to make owners, employees & students more confident and successful!</li> </ul>',99.99,74.99,12443,"unfinished",7,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Introduction to Finance, Accounting, Modeling and Valuation','Learn Finance & Accounting','<p><strong>Information</strong></p> <ul>     <li>Learn Finance & Accounting from Scratch by an Award Winning MBA Professor, Ivy Grad, worked @ Goldman & VC</li> </ul>',130,109.9,15159,"unfinished",7,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Financial Accounting - #1 Ranked University: Course 1 of 5','Honored by the President of the United States.','<p><strong>Information</strong></p> <ul>     <li>Learn accounting from the self-made millionaire Norm Nemrow and the recipient of a famed teaching award from the President of the United States. This course is produced by the #1 accounting university in the world</li> </ul>',199.99,99.99,21219,"unfinished",7,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Accounting & Financial Statement Analysis: Complete Training','Accounting & Financial Ratio Analysis made easy','<p><strong>Information</strong></p> <ul>     <li>Learn important accounting skills that will get your foot in the door!</li> </ul>',209,129.99,41092,"unfinished",7,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Accounting: From Beginner to Advanced!','#1 accounting course online.','<p><strong>Information</strong></p> <ul>     <li>Learn accounting like never before. Learn easy and fast. Easy to understand Accounting. #1 accounting course online.</li> </ul>',209.99,119.99,179,"unfinished",7,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete Investment Banking Course 2020','The #1 Course to Land a Job in Investment Banking.','<p><strong>Information</strong></p> <ul>     <li>The #1 Course to Land a Job in Investment Banking. IPOs, Bonds, M&A, Trading, LBOs, Valuation: Everything is included!</li> </ul>',139.99,49.99,94618,"unfinished",8,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Financial Management A Complete Study for CA/CMA/CS/CFA/ACCA','500+ lectures & case studies for CA IPCC,etc','<p><strong>Information</strong></p> <ul>     <li>500+ lectures & case studies for CA IPCC / CFA / CS Final / CMA Inter / MBA Finance / B. Com Final Exams & Professionals</li> </ul>',289,149.63,11691,"unfinished",8,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('The Complete Financial Analyst Training & Investing Course','Succeed as a Financial Analyst &Investor','<p><strong>Information</strong></p> <ul>     <li>The  Succeed as a Financial Analyst &Investor course by Award Winning MBA Prof who worked @Goldman, in Hedge Funds & Venture Capital</li> </ul>',209,199.99,19364,"unfinished",9,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('CCNA 2020 200-125 Video Boot Camp With Chris Bryant','Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!','<p><strong>Information</strong></p> <ul>     <li>My latest and greatest CCNA Video Boot Camp, specifically designed for the new 200-301 exam, is now live on Udemy.   Udemy doesnt allow me to link to it from here for some reason, but it is available now.</li> </ul>',29,19.99,102653,"unfinished",10,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('AWS Certified Solutions Architect - Associate 2020','AWS Solutions Architect - Associate Exam?','<p><strong>Information</strong></p> <ul>     <li>Want to pass the AWS Solutions Architect - Associate Exam? Want to become Amazon Web Services Certified? Do this course!</li> </ul>',12,9.99,8134,"unfinished",10,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Ultimate AWS Certified Developer Associate 2021 - NEW!','Become an AWS Certified Developer!','<p><strong>Information</strong></p> <ul>     <li>Become an AWS Certified Developer! Learn all Amazon Web Services Developer topics. PASS the AWS Certified Developer Exam</li> </ul>',154,129.99,165634,"unfinished",10,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('AWS Certified Developer - Associate 2020','Do you want AWS certification?','<p><strong>Information</strong></p> <ul>     <li>Do you want AWS certification? Do you want to be an AWS Certified Developer Associate? This AWS online course is for you</li> </ul>',98.99,64,198565,"unfinished",10,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Ultimate AWS Certified Solutions Architect Associate 2021','the AWS Certified Solutions Architect Associate Certification SAA-C02.','<p><strong>Information</strong></p> <ul>     <li>Pass the AWS Certified Solutions Architect Associate Certification SAA-C02. Complete Amazon Web Services Cloud training!</li> </ul>',129.99,119.99,23465,"unfinished",10,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Learn Ethical Hacking From Scratch','Become an ethical hacker','<p><strong>Information</strong></p> <ul>     <li>Become an ethical hacker that can hack computer systems like black hat hackers and secure them like security experts.</li> </ul>',129,99.99,401976,"unfinished",11,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('PLC Programming From Scratch','give a person with no prior experience the basic tools','<p><strong>Information</strong></p> <ul>     <li>This course will give a person with no prior experience the basic tools necessary to create a PLC program from scratch.</li> </ul>',29.99,19.99,4963,"unfinished",12,6,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Pianoforall - Incredible New Way To Learn Piano & Keyboard','Learn Piano in WEEKS not years.','<p><strong>Information</strong></p> <ul>     <li>Play-By-Ear & learn to Read Music. Pop, Blues, Jazz, Ballads, Improvisation, Classical</li> </ul>',150.15,50.05,1999999,"unfinished",13,6,1);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Ultimate Beginner Guitar Masterclass','Beginner guitar lessons.','<p><strong>Information</strong></p> <ul>     <li>Beginner guitar lessons. Go from knowing nothing about the guitar and learn to play songs everbody loves in just weeks</li> </ul>',9.99,6.96,43068,"unfinished",13,6,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Complete Guitar System - Beginner to Advanced','All-in-one Guitar Course With a Proven Step-by-step Learning System.','<p><strong>Information</strong></p> <ul>     <li>I have learned soooo much from Erichs lessons! I have had my guitar for less than 5 months and I have such a firm foundation and core understanding of the principles and techniques I need. The sky is the limit, If my fingers can catch up to my brain</li> </ul>',19,3.69,430688,"unfinished",13,6,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('BECOME A GREAT SINGER: Your Complete Vocal Training System','Any Level, Any Style','<p><strong>Information</strong></p> <ul>     <li>Immediately Improve Your Singing</li> </ul>',199.99,36.99,4688,"unfinished",14,6,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher,avgRate) values('Read Music FAST!','Learn to read music using my unique method','<p><strong>Information</strong></p> <ul>     <li>using my unique method: just see a note on a piano score and play it on the keyboard straight away</li> </ul>',209,11,430688,"unfinished",15,6,5);

insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 3: About The Course',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 3: About The Course',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',3);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',3);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',4);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',4);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',5);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',5);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',6);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',7);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',8);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',9);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',10);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',11);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',12);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',13);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',14);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',15);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',16);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',17);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',18);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',19);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',20);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',21);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',22);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',23);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',24);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',25);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',26);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',27);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',28);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',27);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',28);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',29);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',30);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',31);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',32);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',33);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',34);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',35);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',36);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',37);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',38);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',39);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',40);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',41);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',42);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',43);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',44);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',45);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',46);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',47);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',48);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',49);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',50);


insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: Learning HTML_1','what you learning in this course',1);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 2: Learning HTML_2','what you learning in this course',1);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 3: Learning HTML_3','what you learning in this course',1);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: Learning CSS_1','what you learning in this course',2);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 2: Learning CSS_2','what you learning in this course',2);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course_1','what you learning in this course',3);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 2: About The Course_2','what you learning in this course',3);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: Learning HTML_1','what you learning in this course',4);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 2: Learning HTML_2','what you learning in this course',4);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: Learning CSS_1','what you learning in this course',5);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 2: Learning CSS_2','what you learning in this course',5);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',6);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',7);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',8);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',9);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',10);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',11);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',12);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',13);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',14);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',15);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',16);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',17);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',18);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',19);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',20);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',21);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',22);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',23);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',24);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',25);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',26);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',27);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',28);

insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments,status) values(7,1,'2020-12-28 09:14:31',5,'Great Course <3','finished');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,2,'2020-12-28 09:14:31',3,'Watching videos is time consuming <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,3,'2020-12-28 09:14:31',1,'Bad Course, too boring');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(8,1,'2020-12-28 09:14:31',5,'wow, I love this course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(8,6,'2020-12-28 09:14:31',4,'Good course<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(8,11,'2020-12-28 09:14:31',2,'Bad Course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(9,6,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(9,7,'2020-12-28 09:14:31',3,'Watching videos is time consuming<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(9,11,'2020-12-28 09:14:31',2,'So boring');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(10,6,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(10,11,'2020-12-28 09:14:31',3,'video is very laggy<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(10,12,'2020-12-28 09:14:31',1,'Bad Course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(11,21,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(11,22,'2020-12-28 09:14:31',3,'video is very laggy<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(11,26,'2020-12-28 09:14:31',1,'Bad Course!');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(12,21,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(12,26,'2020-12-28 09:14:31',3,'video is very laggy<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(12,31,'2020-12-28 09:14:31',1,'Bad Course @@@');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(13,31,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(13,36,'2020-12-28 09:14:31',3,'a beautiful life<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(13,39,'2020-12-28 09:14:31',1,'Bad Course!!!');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(14,31,'2020-12-28 09:14:31',5,'<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(14,36,'2020-12-28 09:14:31',3,'yeah, good course but video is so lag :D');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(14,39,'2020-12-28 09:14:31',1,'Bad Course =))');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(15,39,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(15,40,'2020-12-28 09:14:31',3,'hi every guys :D');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(15,44,'2020-12-28 09:14:31',1,'Bad Course :(');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(16,39,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(16,44,'2020-12-28 09:14:31',3,'alala');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(16,46,'2020-12-28 09:14:31',1,'I didnt like this course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(17,1,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(17,40,'2020-12-28 09:14:31',3,'this voice in video is so sweet');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(17,46,'2020-12-28 09:14:31',1,'Bad Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(18,1,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(18,5,'2020-12-28 09:14:31',0,null);
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(18,3,'2020-12-28 09:14:31',0,null);
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(18,6,'2020-12-28 09:14:31',4,'hi every guys :D');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(18,10,'2020-12-28 09:14:31',1,'I didnt like this course');

insert into WishList(IdUser,IdCourse) values(7,1);
insert into WishList(IdUser,IdCourse) values(8,1);
insert into WishList(IdUser,IdCourse) values(9,1);
insert into WishList(IdUser,IdCourse) values(10,1);
insert into WishList(IdUser,IdCourse) values(11,1);
insert into WishList(IdUser,IdCourse) values(8,2);
insert into WishList(IdUser,IdCourse) values(9,2);
insert into WishList(IdUser,IdCourse) values(10,2);
insert into WishList(IdUser,IdCourse) values(9,3);
insert into WishList(IdUser,IdCourse) values(10,3);
insert into WishList(IdUser,IdCourse) values(11,3);
insert into WishList(IdUser,IdCourse) values(10,4);
insert into WishList(IdUser,IdCourse) values(11,4);
insert into WishList(IdUser,IdCourse) values(12,4);
insert into WishList(IdUser,IdCourse) values(11,5);
insert into WishList(IdUser,IdCourse) values(12,5);
insert into WishList(IdUser,IdCourse) values(13,5);
insert into WishList(IdUser,IdCourse) values(12,6);
insert into WishList(IdUser,IdCourse) values(13,6);
insert into WishList(IdUser,IdCourse) values(13,7);
insert into WishList(IdUser,IdCourse) values(14,7);
insert into WishList(IdUser,IdCourse) values(14,8);
insert into WishList(IdUser,IdCourse) values(15,9);
insert into WishList(IdUser,IdCourse) values(16,10);
insert into WishList(IdUser,IdCourse) values(17,11);
insert into WishList(IdUser,IdCourse) values(7,12);
insert into WishList(IdUser,IdCourse) values(8,13);
insert into WishList(IdUser,IdCourse) values(9,14);
insert into WishList(IdUser,IdCourse) values(10,15);
insert into WishList(IdUser,IdCourse) values(11,16);
insert into WishList(IdUser,IdCourse) values(12,17);
insert into WishList(IdUser,IdCourse) values(13,18);
insert into WishList(IdUser,IdCourse) values(14,19);
insert into WishList(IdUser,IdCourse) values(15,20);
insert into WishList(IdUser,IdCourse) values(16,21);
insert into WishList(IdUser,IdCourse) values(17,22);
insert into WishList(IdUser,IdCourse) values(7,23);
insert into WishList(IdUser,IdCourse) values(8,24);
insert into WishList(IdUser,IdCourse) values(9,25);
insert into WishList(IdUser,IdCourse) values(10,26);
insert into WishList(IdUser,IdCourse) values(11,27);
insert into WishList(IdUser,IdCourse) values(12,28);
insert into WishList(IdUser,IdCourse) values(13,29);
insert into WishList(IdUser,IdCourse) values(14,30);
insert into WishList(IdUser,IdCourse) values(15,31);
insert into WishList(IdUser,IdCourse) values(16,32);
insert into WishList(IdUser,IdCourse) values(17,33);
insert into WishList(IdUser,IdCourse) values(7,23);
insert into WishList(IdUser,IdCourse) values(8,24);
insert into WishList(IdUser,IdCourse) values(9,25);
insert into WishList(IdUser,IdCourse) values(10,26);
insert into WishList(IdUser,IdCourse) values(11,27);
insert into WishList(IdUser,IdCourse) values(12,28);
insert into WishList(IdUser,IdCourse) values(13,29);
insert into WishList(IdUser,IdCourse) values(14,30);
insert into WishList(IdUser,IdCourse) values(15,31);
insert into WishList(IdUser,IdCourse) values(16,32);
insert into WishList(IdUser,IdCourse) values(17,33);
insert into WishList(IdUser,IdCourse) values(7,34);
insert into WishList(IdUser,IdCourse) values(8,35);
insert into WishList(IdUser,IdCourse) values(9,36);
insert into WishList(IdUser,IdCourse) values(10,36);
insert into WishList(IdUser,IdCourse) values(11,37);
insert into WishList(IdUser,IdCourse) values(12,38);
insert into WishList(IdUser,IdCourse) values(13,39);
insert into WishList(IdUser,IdCourse) values(14,40);
insert into WishList(IdUser,IdCourse) values(15,41);
insert into WishList(IdUser,IdCourse) values(16,42);
insert into WishList(IdUser,IdCourse) values(17,43);
insert into WishList(IdUser,IdCourse) values(8,44);
insert into WishList(IdUser,IdCourse) values(9,45);
insert into WishList(IdUser,IdCourse) values(10,46);
insert into WishList(IdUser,IdCourse) values(11,47);
insert into WishList(IdUser,IdCourse) values(12,48);
insert into WishList(IdUser,IdCourse) values(13,49);
insert into WishList(IdUser,IdCourse) values(14,50);
insert into WishList(IdUser,IdCourse) values(15,47);
insert into WishList(IdUser,IdCourse) values(16,45);
insert into WishList(IdUser,IdCourse) values(17,33);
