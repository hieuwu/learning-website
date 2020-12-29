drop database if exists `websiteDB`;
create database `websiteDB`;
use `websiteDB`;

DROP TABLE IF EXISTS `HeaderCategory`;
create table `HeaderCategory`(
	Id int unsigned auto_increment primary key,
    HeaderNameCategory varchar(100) NOT NULL
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
updatedTime datetime not null default now()
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Category`;
create table `Category`(
	Id int unsigned auto_increment primary key,
    HeaderCategoryID int unsigned not null,
    NameCategory varchar(50) not null,
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
    status varchar(50) default "unfinished",/*has change to finished*/
    IdCategory int unsigned not null,
    IdTeacher int unsigned not null,
    createdTime datetime not null default now(),
    updatedTime datetime not null default now(),
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
DROP TABLE IF EXISTS `WatchList`;
create table `WatchList`(
	Id int unsigned auto_increment primary key,
    IdUser int unsigned not null,
    IdCourse int unsigned not null,
    CONSTRAINT FK_WatchListUser FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser),
    CONSTRAINT FK_WatchListCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `EnrolledCourse`;
create table `EnrolledCourse`(
	Id int unsigned auto_increment primary key,
    IdUser int unsigned not null,
    IdCourse int unsigned not null,
    EnrollDate datetime not null,
    rateStar int unsigned,
    Comments text,
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
insert into Category(NameCategory,HeaderCategoryID) values('Data Design & Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Management',2);
insert into Category(NameCategory,HeaderCategoryID) values('Sales',2);
insert into Category(NameCategory,HeaderCategoryID) values('Accounting & Bookkeeping',3);
insert into Category(NameCategory,HeaderCategoryID) values('Finance',3);
insert into Category(NameCategory,HeaderCategoryID) values('Investing & Trading',3);
insert into Category(NameCategory,HeaderCategoryID) values('IT Certification',4);
insert into Category(NameCategory,HeaderCategoryID) values('Network & Security',4);
insert into Category(NameCategory,HeaderCategoryID) values('Handware',4);
insert into Category(NameCategory,HeaderCategoryID) values('Instruments',5);
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


insert into teach_profile(IdUser,Biography) values(2,'Teaching Web development');
insert into teach_profile(IdUser,Biography) values(3,'Teaching App development');
insert into teach_profile(IdUser,Biography,status) values(4,'Teaching something maybe you interested in it','Accept');
insert into teach_profile(IdUser,Biography) values(5,'Teaching Vocal cousre');
insert into teach_profile(IdUser,Biography) values(6,'Teaching Business course');
insert into teach_profile(IdUser,Biography) values(14,'Iam a teacher for 5 years');
insert into teach_profile(IdUser,Biography) values(16,'Im a idol. I can teach about dacing.');

insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, etc','<p><strong>Jewelry Information</strong></p> <ul>     <li>The only course you need to learn web development - HTML, CSS, JS, Node, and More!</li> </ul>',99.99,69.97,430688,"finished",1,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, Angular','<p><strong>Andie Information</strong></p> <ul>     <li>The only course you need to learn web development - HTML, CSS, Angular, Node, and More!</li> </ul>',199.99,19.97,430688,"unfinished",1,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, Nodejs','<p><strong>The Information</strong></p> <ul>     <li>This course teaching about web development - HTML, CSS, JS, Node, and More!</li> </ul>',99.99,69.97,430688,"finished",1,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, ReactJS','<p><strong>Cousre Information</strong></p> <ul>     <li>The only course you need to learn web development - HTML, CSS, JS, ReactJS, and More!</li> </ul>',299.99,169.97,430688,"unfinished",1,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Web Developer Bootcamp 2020','Learning about HTML,CSS, etc','<p><strong>Jewelry Information</strong></p> <ul>     <li>The only course you need to learn web development - HTML, CSS, JS, Node, and More!</li> </ul>',399.99,369.97,430688,"unfinished",1,6);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('iOS & Swift - The Complete iOS App Development Bootcamp','Learning about iOS','<p><strong>Information</strong></p> <ul>     <li><p><strong>Information</strong></p> <ul>     <li>From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul></li> </ul>',499.99,169.97,430688,"unfinished",1,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('iOS & Swift - The Complete iOS App Development Bootcamp','Learning about iOS','<p><strong>Information</strong></p> <ul>     <li>From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('iOS & Swift - The Complete iOS App Development Bootcamp','Learning about iOS','<p><strong>Information</strong></p> <ul>     <li><p><strong>Information</strong></p> <ul>     <li>From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul></li> </ul>',499.99,169.97,430688,"unfinished",1,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('iOS & Swift - The Complete iOS App Development Bootcamp','Learning about iOS','<p><strong>Information</strong></p> <ul>     <li>From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('iOS & Swift - The Complete iOS App Development Bootcamp','Learning about iOS','<p><strong>Information</strong></p> <ul>     <li>From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,6);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Android & Swift - The Complete Android App Development Bootcamp','Learning about Android','<p><strong>Information</strong></p> <ul>     <li>From Beginner to Android App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Android & Swift - The Complete Android App Development Bootcamp','Learning about Android','<p><strong>Information</strong></p> <ul>     <li>From Beginner to Android App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Android & Swift - The Complete Android App Development Bootcamp','Learning about Android','<p><strong>Information</strong></p> <ul>     <li>From Beginner to Android App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Android & Swift - The Complete Android App Development Bootcamp','Learning about Android','<p><strong>Information</strong></p> <ul>     <li>From Beginner to Android App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"finished",1,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Android & Swift - The Complete Android App Development Bootcamp','Learning about Android','<p><strong>Information</strong></p> <ul>     <li>From Beginner to Android App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI</li> </ul>',499.99,169.97,430688,"unfinished",1,6);

insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Become a Product Manager',' Learn the Skills & Get the Job','<p><strong>Information</strong></p> <ul>     <li>The most complete course available on Product Management. 13+ hours of videos, activities, interviews, & more</li> </ul>',499.99,169.97,430688,"unfinished",7,6);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Complete Product Management Course','Learn the skills, tools, and processes needed to become an irreplaceable PM.','<p><strong>Information</strong></p> <ul>     <li>The most complete course available on Product Management. 13+ hours of videos, activities, interviews, & more</li> </ul>',499.99,169.97,430688,"unfinished",7,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Become a Product Manager',' Learn the Skills & Get the Job','<p><strong>Information</strong></p> <ul>     <li>The most complete course available on Product Management. 13+ hours of videos, activities, interviews, & more</li> </ul>',499.99,169.97,430688,"unfinished",7,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('The Complete Product Management Course','Learn the skills, tools, and processes needed to become an irreplaceable PM','<p><strong>Information</strong></p> <ul>     <li>The most complete course available on Product Management. 13+ hours of videos, activities, interviews, & more</li> </ul>',499.99,169.97,430688,"unfinished",7,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Become a Product Manager',' Learn the Skills & Get the Job','<p><strong>Information</strong></p> <ul>     <li>The most complete course available on Product Management. 13+ hours of videos, activities, interviews, & more</li> </ul>',499.99,169.97,430688,"unfinished",7,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Cryptocurrency Financial Crime Compliance Bootcamp','Blockchain/Crypto | Financial Crime | Money Laundering Tools','<p><strong>Information</strong></p> <ul>     <li>Blockchain/Crypto | Financial Crime | Money Laundering | Terrorist Financing | AML & CTF | Regulation | Compliance Tools</li> </ul>',499.99,169.97,430688,"unfinished",9,6);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Cryptocurrency Financial Crime Compliance Bootcamp','Blockchain/Crypto | Financial Crime | Money Laundering Tools','<p><strong>Information</strong></p> <ul>     <li>Blockchain/Crypto | Financial Crime | Money Laundering | Terrorist Financing | AML & CTF | Regulation | Compliance Tools</li> </ul>',499.99,169.97,430688,"unfinished",9,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('Cryptocurrency Financial Crime Compliance Bootcamp','Blockchain/Crypto | Financial Crime | Money Laundering Tools','<p><strong>Information</strong></p> <ul>     <li>Blockchain/Crypto | Financial Crime | Money Laundering | Terrorist Financing | AML & CTF | Regulation | Compliance Tools</li> </ul>',499.99,169.97,430688,"unfinished",9,2);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('AWS Certified Developer - Associate 2020',' being an AWS Certified Developer Associate?','<p><strong>Information</strong></p> <ul>     <li>Pass the AWS Certified Developer - Associate 2020 Exam</li><li>Become intimately familiar with the AWS platform from a developer perspective.</li> </ul>',499.99,169.97,430688,"unfinished",11,6);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('AWS Certified Developer - Associate 2020',' being an AWS Certified Developer Associate?','<p><strong>Information</strong></p> <ul>     <li>Pass the AWS Certified Developer - Associate 2020 Exam</li><li>Become intimately familiar with the AWS platform from a developer perspective.</li> </ul>',499.99,169.97,430688,"unfinished",11,5);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('AWS Certified Developer - Associate 2020',' being an AWS Certified Developer Associate?','<p><strong>Information</strong></p> <ul>     <li>Pass the AWS Certified Developer - Associate 2020 Exam</li><li>Become intimately familiar with the AWS platform from a developer perspective.</li> </ul>',499.99,169.97,430688,"unfinished",11,4);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('AWS Certified Developer - Associate 2020',' being an AWS Certified Developer Associate?','<p><strong>Information</strong></p> <ul>     <li>Pass the AWS Certified Developer - Associate 2020 Exam</li><li>Become intimately familiar with the AWS platform from a developer perspective.</li> </ul>',499.99,169.97,430688,"unfinished",11,3);
insert into course(nameCourse,title,Description,Price,SaleCost,nOViews,status,IdCategory,IdTeacher) values('AWS Certified Developer - Associate 2020',' being an AWS Certified Developer Associate?','<p><strong>Information</strong></p> <ul>     <li>Pass the AWS Certified Developer - Associate 2020 Exam</li><li>Become intimately familiar with the AWS platform from a developer perspective.</li> </ul>',499.99,169.97,430688,"unfinished",11,2);


insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',3);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',4);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',5);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',3);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',4);
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


insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',1);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',2);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',3);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',4);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',5);
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

insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,1,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,2,'2020-12-28 09:14:31',3,'watching video to learning spen <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,3,'2020-12-28 09:14:31',1,'Bad Course <3');

insert into watchlist(IdUser,IdCourse) values(7,4);
insert into watchlist(IdUser,IdCourse) values(7,5);
insert into watchlist(IdUser,IdCourse) values(7,12);
insert into watchlist(IdUser,IdCourse) values(7,23);

